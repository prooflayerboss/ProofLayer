(function(blocks, element, blockEditor, components) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('prooflayer/testimonials', {
        title: 'ProofLayer Testimonials',
        icon: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', {
                fill: '#3b82f6',
                d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
            })
        ),
        category: 'widgets',
        description: 'Display your ProofLayer testimonials.',
        keywords: ['testimonials', 'reviews', 'social proof', 'prooflayer'],
        attributes: {
            layout: { type: 'string', default: 'grid' },
            theme: { type: 'string', default: 'light' },
            animation: { type: 'string', default: 'fade' }
        },
        edit: function(props) {
            var attributes = props.attributes;
            return el('div', { className: props.className },
                el(InspectorControls, {},
                    el(PanelBody, { title: 'Widget Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Layout',
                            value: attributes.layout,
                            options: [
                                { label: 'Grid', value: 'grid' },
                                { label: 'List', value: 'list' },
                                { label: 'Carousel', value: 'carousel' },
                                { label: 'Masonry', value: 'masonry' },
                                { label: 'Marquee', value: 'marquee' },
                                { label: 'Spotlight', value: 'spotlight' }
                            ],
                            onChange: function(value) { props.setAttributes({ layout: value }); }
                        }),
                        el(SelectControl, {
                            label: 'Theme',
                            value: attributes.theme,
                            options: [
                                { label: 'Light', value: 'light' },
                                { label: 'Dark', value: 'dark' }
                            ],
                            onChange: function(value) { props.setAttributes({ theme: value }); }
                        }),
                        el(SelectControl, {
                            label: 'Animation',
                            value: attributes.animation,
                            options: [
                                { label: 'None', value: 'none' },
                                { label: 'Fade In', value: 'fade' },
                                { label: 'Slide Up', value: 'slide' },
                                { label: 'Floating Hearts', value: 'hearts' }
                            ],
                            onChange: function(value) { props.setAttributes({ animation: value }); }
                        })
                    )
                ),
                el('div', {
                    style: {
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }
                },
                    el('div', { style: { fontSize: '32px', marginBottom: '10px' } }, '\u2B50'),
                    el('h3', { style: { margin: '0 0 10px 0', color: 'white', fontSize: '18px' } }, 'ProofLayer Testimonials'),
                    el('p', { style: { margin: '0', opacity: '0.9', fontSize: '14px' } }, 'Layout: ' + attributes.layout + ' | Theme: ' + attributes.theme),
                    el('p', { style: { margin: '10px 0 0 0', opacity: '0.7', fontSize: '12px' } }, 'Your testimonials will display here on the frontend.')
                )
            );
        },
        save: function() { return null; }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
