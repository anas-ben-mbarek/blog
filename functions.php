<?php
/**
 * MyBlog Theme Functions
 */

// Theme Setup
function myblog_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
    ));
    
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'myblog'),
        'footer' => __('Footer Menu', 'myblog')
    ));
}
add_action('after_setup_theme', 'myblog_setup');

// Enqueue Scripts and Styles
function myblog_scripts() {
    // Get the theme directory URI
    $theme_uri = get_template_directory_uri();
    
    // Enqueue the React build files
    $build_files = glob(get_template_directory() . '/build/static/css/*.css');
    if (!empty($build_files)) {
        foreach ($build_files as $file) {
            $filename = basename($file);
            wp_enqueue_style('myblog-main-css', $theme_uri . '/build/static/css/' . $filename, array(), '1.0.0');
        }
    }
    
    $js_files = glob(get_template_directory() . '/build/static/js/*.js');
    if (!empty($js_files)) {
        foreach ($js_files as $file) {
            $filename = basename($file);
            if (strpos($filename, 'main') !== false) {
                wp_enqueue_script('myblog-main-js', $theme_uri . '/build/static/js/' . $filename, array(), '1.0.0', true);
            }
        }
    }
    
    // Pass WordPress data to React
    wp_localize_script('myblog-main-js', 'wpData', array(
        'apiUrl' => home_url('/wp-json/wp/v2/'),
        'nonce' => wp_create_nonce('wp_rest'),
        'siteUrl' => home_url(),
        'siteName' => get_bloginfo('name'),
        'siteDescription' => get_bloginfo('description')
    ));
}
add_action('wp_enqueue_scripts', 'myblog_scripts');

// REST API Support
function myblog_rest_support() {
    add_post_type_support('post', 'author');
    add_post_type_support('post', 'thumbnail');
    add_post_type_support('post', 'excerpt');
}
add_action('init', 'myblog_rest_support');

// Custom REST API endpoint for contact form
function myblog_register_contact_endpoint() {
    register_rest_route('myblog/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'myblog_handle_contact_form',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'myblog_register_contact_endpoint');

function myblog_handle_contact_form($request) {
    $params = $request->get_params();
    
    $to = get_option('admin_email');
    $subject = 'New Contact Form Submission from ' . $params['name'];
    $message = "Name: " . $params['name'] . "\n";
    $message .= "Email: " . $params['email'] . "\n\n";
    $message .= "Message:\n" . $params['message'];
    
    $headers = array('From: ' . $params['email']);
    
    if (wp_mail($to, $subject, $message, $headers)) {
        return new WP_REST_Response(array('success' => true, 'message' => 'Message sent successfully!'), 200);
    } else {
        return new WP_REST_Response(array('success' => false, 'message' => 'Failed to send message.'), 500);
    }
}
?>