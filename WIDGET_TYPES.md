# ProofLayer Widget Types Guide

ProofLayer offers three different widget types to display testimonials on your website:

## 1. Embed Widget (Traditional)

The classic embedded widget that appears inline within your page content.

### Usage
```html
<div id="prooflayer-widget"></div>
<script src="https://www.prooflayer.app/widget.js?v=5"
        data-workspace="YOUR_WORKSPACE_ID"
        data-layout="grid"
        data-theme="light"></script>
```

### Attributes
- `data-workspace` (required): Your workspace ID
- `data-layout`: `grid` | `carousel` | `marquee` | `masonry` | `spotlight` (default: `grid`)
- `data-theme`: `light` | `dark` (default: `light`)
- `data-marquee-speed`: Speed in px/sec for marquee layout (default: `50`)
- `data-auto-rotate`: Interval in ms for spotlight rotation (default: `5000`)

### Best For
- Dedicated testimonials page
- Landing page sections
- Product pages

---

## 2. Popup Widget (Modal)

A modal popup that appears based on specific triggers.

### Usage
```html
<script src="https://www.prooflayer.app/widget-popup.js?v=5"
        data-workspace="YOUR_WORKSPACE_ID"
        data-layout="grid"
        data-theme="light"
        data-trigger="time"
        data-delay="5000"
        data-show-once="true"></script>
```

### Attributes
- `data-workspace` (required): Your workspace ID
- `data-layout`: Same options as embed widget
- `data-theme`: `light` | `dark`
- `data-trigger`: `time` | `exit_intent` | `scroll` (default: `time`)
- `data-delay`: Delay in milliseconds (for time trigger, default: `5000`)
- `data-scroll-percent`: Scroll percentage to trigger (for scroll trigger, default: `50`)
- `data-show-once`: `true` | `false` - Show only once per session (default: `true`)

### Trigger Types

#### Time Trigger
Shows popup after a specified delay:
```html
data-trigger="time" data-delay="5000"
```

#### Exit Intent Trigger
Shows when user moves mouse toward browser close button:
```html
data-trigger="exit_intent"
```

#### Scroll Trigger
Shows after user scrolls a certain percentage:
```html
data-trigger="scroll" data-scroll-percent="50"
```

### Best For
- Homepage engagement
- Capturing attention before exit
- Special promotions
- High-value conversions

---

## 3. Floating Badge Widget

A fixed-position button that expands into a testimonials panel.

### Usage
```html
<script src="https://www.prooflayer.app/widget-floating.js?v=5"
        data-workspace="YOUR_WORKSPACE_ID"
        data-layout="grid"
        data-theme="light"
        data-position="bottom-right"
        data-text="See what our customers say"
        data-icon="star"></script>
```

### Attributes
- `data-workspace` (required): Your workspace ID
- `data-layout`: Same options as embed widget
- `data-theme`: `light` | `dark`
- `data-position`: `bottom-right` | `bottom-left` | `top-right` | `top-left` (default: `bottom-right`)
- `data-text`: Button text (default: `"See what our customers say"`)
- `data-icon`: `star` | `chat` | `heart` (default: `star`)

### Best For
- Site-wide testimonials access
- Non-intrusive presence
- Mobile-friendly option
- Consistent brand presence

---

## Layout Options (All Widget Types)

All three widget types support the same layout options for displaying testimonials:

### Grid
Traditional card grid layout:
```html
data-layout="grid"
```

### Carousel
Horizontal scrollable carousel:
```html
data-layout="carousel"
```

### Marquee
Infinite auto-scrolling horizontal display:
```html
data-layout="marquee" data-marquee-speed="50"
```

### Masonry
Pinterest-style variable height columns:
```html
data-layout="masonry"
```

### Spotlight
Single rotating testimonial:
```html
data-layout="spotlight" data-auto-rotate="5000"
```

---

## Theme Options

Both light and dark themes are supported:

```html
<!-- Light theme (default) -->
data-theme="light"

<!-- Dark theme -->
data-theme="dark"
```

---

## Advanced Examples

### High-Converting Landing Page Setup
Combine multiple widget types for maximum impact:

```html
<!-- Embedded testimonials section -->
<section id="testimonials">
  <h2>What Our Customers Say</h2>
  <div id="prooflayer-widget"></div>
  <script src="https://www.prooflayer.app/widget.js?v=5"
          data-workspace="YOUR_ID"
          data-layout="marquee"
          data-theme="light"></script>
</section>

<!-- Exit-intent popup for abandoning visitors -->
<script src="https://www.prooflayer.app/widget-popup.js?v=5"
        data-workspace="YOUR_ID"
        data-layout="spotlight"
        data-theme="light"
        data-trigger="exit_intent"></script>

<!-- Floating badge for easy access throughout site -->
<script src="https://www.prooflayer.app/widget-floating.js?v=5"
        data-workspace="YOUR_ID"
        data-position="bottom-right"
        data-text="Customer Stories"
        data-icon="heart"></script>
```

### Mobile-Optimized Setup
```html
<!-- Floating badge works great on mobile -->
<script src="https://www.prooflayer.app/widget-floating.js?v=5"
        data-workspace="YOUR_ID"
        data-position="bottom-right"
        data-layout="grid"
        data-theme="light"></script>
```

### Trust-Building Homepage
```html
<!-- Scroll-triggered popup after 30% scroll -->
<script src="https://www.prooflayer.app/widget-popup.js?v=5"
        data-workspace="YOUR_ID"
        data-layout="spotlight"
        data-trigger="scroll"
        data-scroll-percent="30"
        data-show-once="true"></script>
```

---

## Browser Support

All widget types support modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Performance Notes

- Widgets load asynchronously and won't block page rendering
- Testimonials are cached for fast loading
- All widget scripts are ~5-8 KB minified
- Popup and floating widgets use localStorage for "show once" functionality

---

## Troubleshooting

### Widget not appearing?
1. Verify your workspace ID is correct
2. Ensure you have approved testimonials in your workspace
3. Check browser console for errors
4. For embed widget, ensure `<div id="prooflayer-widget"></div>` exists

### Popup showing too often?
- Set `data-show-once="true"` to show only once per session
- Increase `data-delay` for time-based triggers
- Clear localStorage to reset "shown" state

### Floating badge position issues?
- Check for CSS z-index conflicts (widget uses z-index: 999997-999998)
- Try different positions: `bottom-left`, `top-right`, etc.
- Adjust your page padding/margins if badge is cut off

---

## Getting Your Workspace ID

1. Log in to [ProofLayer Dashboard](https://www.prooflayer.app/dashboard)
2. Go to **Widgets** section
3. Select your workspace
4. Copy the workspace ID from the embed code

---

## Need Help?

- Documentation: https://www.prooflayer.app/docs
- Support: support@prooflayer.app
- GitHub Issues: https://github.com/prooflayer/prooflayer/issues
