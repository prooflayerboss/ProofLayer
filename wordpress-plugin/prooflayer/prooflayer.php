<?php
/**
 * Plugin Name: ProofLayer - Testimonials & Social Proof
 * Plugin URI: https://www.prooflayer.app/integrations/wordpress
 * Description: Display beautiful testimonials and social proof on your WordPress site. Collect video and text testimonials with customizable widgets.
 * Version: 1.0.0
 * Author: ProofLayer
 * Author URI: https://www.prooflayer.app
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: prooflayer
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('PROOFLAYER_VERSION', '1.0.0');
define('PROOFLAYER_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PROOFLAYER_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main ProofLayer Plugin Class
 */
class ProofLayer {

    /**
     * Instance of this class
     */
    private static $instance = null;

    /**
     * Plugin options
     */
    private $options;

    /**
     * Get instance of this class
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->options = get_option('prooflayer_options', array());

        // Initialize hooks
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('init', array($this, 'register_shortcode'));
        add_action('widgets_init', array($this, 'register_widget'));
        add_action('init', array($this, 'register_gutenberg_block'));

        // Add settings link to plugins page
        add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'add_settings_link'));
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            __('ProofLayer Settings', 'prooflayer'),
            __('ProofLayer', 'prooflayer'),
            'manage_options',
            'prooflayer',
            array($this, 'render_settings_page')
        );
    }

    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('prooflayer_options', 'prooflayer_options', array($this, 'sanitize_options'));

        add_settings_section(
            'prooflayer_main',
            __('Main Settings', 'prooflayer'),
            array($this, 'render_section_info'),
            'prooflayer'
        );

        add_settings_field(
            'workspace_id',
            __('Workspace ID', 'prooflayer'),
            array($this, 'render_workspace_id_field'),
            'prooflayer',
            'prooflayer_main'
        );

        add_settings_field(
            'default_layout',
            __('Default Layout', 'prooflayer'),
            array($this, 'render_layout_field'),
            'prooflayer',
            'prooflayer_main'
        );

        add_settings_field(
            'default_theme',
            __('Default Theme', 'prooflayer'),
            array($this, 'render_theme_field'),
            'prooflayer',
            'prooflayer_main'
        );

        add_settings_field(
            'default_animation',
            __('Default Animation', 'prooflayer'),
            array($this, 'render_animation_field'),
            'prooflayer',
            'prooflayer_main'
        );
    }

    /**
     * Sanitize options
     */
    public function sanitize_options($input) {
        $sanitized = array();

        if (isset($input['workspace_id'])) {
            $sanitized['workspace_id'] = sanitize_text_field($input['workspace_id']);
        }

        if (isset($input['default_layout'])) {
            $sanitized['default_layout'] = sanitize_text_field($input['default_layout']);
        }

        if (isset($input['default_theme'])) {
            $sanitized['default_theme'] = sanitize_text_field($input['default_theme']);
        }

        if (isset($input['default_animation'])) {
            $sanitized['default_animation'] = sanitize_text_field($input['default_animation']);
        }

        return $sanitized;
    }

    /**
     * Render section info
     */
    public function render_section_info() {
        echo '<p>' . esc_html__('Configure your ProofLayer widget settings below. Find your Workspace ID in your ProofLayer dashboard under Widgets.', 'prooflayer') . '</p>';
    }

    /**
     * Render workspace ID field
     */
    public function render_workspace_id_field() {
        $value = isset($this->options['workspace_id']) ? $this->options['workspace_id'] : '';
        echo '<input type="text" name="prooflayer_options[workspace_id]" value="' . esc_attr($value) . '" class="regular-text" placeholder="e.g., clx1234567890" />';
        echo '<p class="description">' . esc_html__('Find this in your ProofLayer dashboard under Widgets → Embed Code', 'prooflayer') . '</p>';
    }

    /**
     * Render layout field
     */
    public function render_layout_field() {
        $value = isset($this->options['default_layout']) ? $this->options['default_layout'] : 'grid';
        $layouts = array(
            'grid' => __('Grid', 'prooflayer'),
            'list' => __('List', 'prooflayer'),
            'carousel' => __('Carousel', 'prooflayer'),
            'masonry' => __('Masonry', 'prooflayer'),
            'marquee' => __('Marquee', 'prooflayer'),
            'spotlight' => __('Spotlight', 'prooflayer'),
        );

        echo '<select name="prooflayer_options[default_layout]">';
        foreach ($layouts as $key => $label) {
            echo '<option value="' . esc_attr($key) . '"' . selected($value, $key, false) . '>' . esc_html($label) . '</option>';
        }
        echo '</select>';
    }

    /**
     * Render theme field
     */
    public function render_theme_field() {
        $value = isset($this->options['default_theme']) ? $this->options['default_theme'] : 'light';
        echo '<select name="prooflayer_options[default_theme]">';
        echo '<option value="light"' . selected($value, 'light', false) . '>' . esc_html__('Light', 'prooflayer') . '</option>';
        echo '<option value="dark"' . selected($value, 'dark', false) . '>' . esc_html__('Dark', 'prooflayer') . '</option>';
        echo '</select>';
    }

    /**
     * Render animation field
     */
    public function render_animation_field() {
        $value = isset($this->options['default_animation']) ? $this->options['default_animation'] : 'fade';
        $animations = array(
            'none' => __('None', 'prooflayer'),
            'fade' => __('Fade In', 'prooflayer'),
            'slide' => __('Slide Up', 'prooflayer'),
            'hearts' => __('Floating Hearts', 'prooflayer'),
        );

        echo '<select name="prooflayer_options[default_animation]">';
        foreach ($animations as $key => $label) {
            echo '<option value="' . esc_attr($key) . '"' . selected($value, $key, false) . '>' . esc_html($label) . '</option>';
        }
        echo '</select>';
    }

    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: white; margin-top: 0;">Welcome to ProofLayer!</h2>
                <p style="margin-bottom: 0;">Display beautiful testimonials and social proof on your WordPress site. Need help? Visit <a href="https://www.prooflayer.app/integrations/wordpress" target="_blank" style="color: white; text-decoration: underline;">our documentation</a>.</p>
            </div>

            <form action="options.php" method="post">
                <?php
                settings_fields('prooflayer_options');
                do_settings_sections('prooflayer');
                submit_button(__('Save Settings', 'prooflayer'));
                ?>
            </form>

            <hr style="margin: 30px 0;" />

            <h2><?php esc_html_e('How to Use', 'prooflayer'); ?></h2>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-top: 0;">Shortcode</h3>
                <p>Add testimonials anywhere using the shortcode:</p>
                <code style="background: #1f2937; color: #10b981; padding: 10px 15px; display: block; border-radius: 4px;">[prooflayer]</code>
                <p style="margin-top: 10px;">With custom options:</p>
                <code style="background: #1f2937; color: #10b981; padding: 10px 15px; display: block; border-radius: 4px;">[prooflayer layout="masonry" theme="dark" animation="slide"]</code>
            </div>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-top: 0;">Gutenberg Block</h3>
                <p>Search for "ProofLayer" in the block inserter to add testimonials to any page or post.</p>
            </div>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
                <h3 style="margin-top: 0;">Widget</h3>
                <p>Go to <strong>Appearance → Widgets</strong> and add the ProofLayer widget to any sidebar or footer area.</p>
            </div>
        </div>
        <?php
    }

    /**
     * Add settings link to plugins page
     */
    public function add_settings_link($links) {
        $settings_link = '<a href="options-general.php?page=prooflayer">' . __('Settings', 'prooflayer') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }

    /**
     * Enqueue scripts
     */
    public function enqueue_scripts() {
        // Only enqueue if we have a workspace ID
        if (empty($this->options['workspace_id'])) {
            return;
        }

        wp_enqueue_script(
            'prooflayer-widget',
            'https://www.prooflayer.app/widget.js',
            array(),
            PROOFLAYER_VERSION,
            true
        );
    }

    /**
     * Register shortcode
     */
    public function register_shortcode() {
        add_shortcode('prooflayer', array($this, 'render_shortcode'));
    }

    /**
     * Render shortcode
     */
    public function render_shortcode($atts) {
        $atts = shortcode_atts(array(
            'layout' => isset($this->options['default_layout']) ? $this->options['default_layout'] : 'grid',
            'theme' => isset($this->options['default_theme']) ? $this->options['default_theme'] : 'light',
            'animation' => isset($this->options['default_animation']) ? $this->options['default_animation'] : 'fade',
            'hover' => 'true',
        ), $atts, 'prooflayer');

        $workspace_id = isset($this->options['workspace_id']) ? $this->options['workspace_id'] : '';

        if (empty($workspace_id)) {
            if (current_user_can('manage_options')) {
                return '<p style="color: #dc2626; padding: 20px; background: #fef2f2; border-radius: 8px;">' .
                    __('ProofLayer: Please configure your Workspace ID in Settings → ProofLayer', 'prooflayer') .
                    '</p>';
            }
            return '';
        }

        // Generate unique ID for multiple widgets on same page
        $widget_id = 'prooflayer-widget-' . wp_rand(1000, 9999);

        $output = '<div id="' . esc_attr($widget_id) . '"></div>';
        $output .= '<script>';
        $output .= '(function() {';
        $output .= 'var container = document.getElementById("' . esc_js($widget_id) . '");';
        $output .= 'if (!container) return;';
        $output .= 'var script = document.createElement("script");';
        $output .= 'script.src = "https://www.prooflayer.app/widget.js";';
        $output .= 'script.setAttribute("data-workspace", "' . esc_js($workspace_id) . '");';
        $output .= 'script.setAttribute("data-layout", "' . esc_js($atts['layout']) . '");';
        $output .= 'script.setAttribute("data-theme", "' . esc_js($atts['theme']) . '");';
        $output .= 'script.setAttribute("data-animation", "' . esc_js($atts['animation']) . '");';
        $output .= 'script.setAttribute("data-hover", "' . esc_js($atts['hover']) . '");';
        $output .= 'container.id = "prooflayer-widget";';
        $output .= 'container.appendChild(script);';
        $output .= '})();';
        $output .= '</script>';

        return $output;
    }

    /**
     * Register widget
     */
    public function register_widget() {
        register_widget('ProofLayer_Widget');
    }

    /**
     * Register Gutenberg block
     */
    public function register_gutenberg_block() {
        if (!function_exists('register_block_type')) {
            return;
        }

        wp_register_script(
            'prooflayer-block-editor',
            PROOFLAYER_PLUGIN_URL . 'block.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
            PROOFLAYER_VERSION
        );

        register_block_type('prooflayer/testimonials', array(
            'editor_script' => 'prooflayer-block-editor',
            'render_callback' => array($this, 'render_block'),
            'attributes' => array(
                'layout' => array(
                    'type' => 'string',
                    'default' => 'grid',
                ),
                'theme' => array(
                    'type' => 'string',
                    'default' => 'light',
                ),
                'animation' => array(
                    'type' => 'string',
                    'default' => 'fade',
                ),
            ),
        ));
    }

    /**
     * Render Gutenberg block
     */
    public function render_block($attributes) {
        return $this->render_shortcode($attributes);
    }
}

/**
 * ProofLayer Widget Class
 */
class ProofLayer_Widget extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'prooflayer_widget',
            __('ProofLayer Testimonials', 'prooflayer'),
            array(
                'description' => __('Display ProofLayer testimonials in a widget area.', 'prooflayer'),
            )
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];

        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }

        $shortcode_atts = array(
            'layout' => isset($instance['layout']) ? $instance['layout'] : 'grid',
            'theme' => isset($instance['theme']) ? $instance['theme'] : 'light',
            'animation' => isset($instance['animation']) ? $instance['animation'] : 'fade',
        );

        echo ProofLayer::get_instance()->render_shortcode($shortcode_atts);

        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : '';
        $layout = !empty($instance['layout']) ? $instance['layout'] : 'grid';
        $theme = !empty($instance['theme']) ? $instance['theme'] : 'light';
        $animation = !empty($instance['animation']) ? $instance['animation'] : 'fade';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e('Title:', 'prooflayer'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('layout')); ?>"><?php esc_html_e('Layout:', 'prooflayer'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('layout')); ?>" name="<?php echo esc_attr($this->get_field_name('layout')); ?>">
                <option value="grid" <?php selected($layout, 'grid'); ?>><?php esc_html_e('Grid', 'prooflayer'); ?></option>
                <option value="list" <?php selected($layout, 'list'); ?>><?php esc_html_e('List', 'prooflayer'); ?></option>
                <option value="carousel" <?php selected($layout, 'carousel'); ?>><?php esc_html_e('Carousel', 'prooflayer'); ?></option>
                <option value="masonry" <?php selected($layout, 'masonry'); ?>><?php esc_html_e('Masonry', 'prooflayer'); ?></option>
                <option value="spotlight" <?php selected($layout, 'spotlight'); ?>><?php esc_html_e('Spotlight', 'prooflayer'); ?></option>
            </select>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('theme')); ?>"><?php esc_html_e('Theme:', 'prooflayer'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('theme')); ?>" name="<?php echo esc_attr($this->get_field_name('theme')); ?>">
                <option value="light" <?php selected($theme, 'light'); ?>><?php esc_html_e('Light', 'prooflayer'); ?></option>
                <option value="dark" <?php selected($theme, 'dark'); ?>><?php esc_html_e('Dark', 'prooflayer'); ?></option>
            </select>
        </p>
        <?php
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['layout'] = (!empty($new_instance['layout'])) ? sanitize_text_field($new_instance['layout']) : 'grid';
        $instance['theme'] = (!empty($new_instance['theme'])) ? sanitize_text_field($new_instance['theme']) : 'light';
        $instance['animation'] = (!empty($new_instance['animation'])) ? sanitize_text_field($new_instance['animation']) : 'fade';
        return $instance;
    }
}

// Initialize plugin
ProofLayer::get_instance();
