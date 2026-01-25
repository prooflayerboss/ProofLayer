(function() {
  var script = document.currentScript;
  var workspaceId = script.getAttribute('data-workspace');
  var theme = script.getAttribute('data-theme') || 'light';
  var position = script.getAttribute('data-position') || 'bottom-right';
  var text = script.getAttribute('data-text') || 'See what our customers say';
  var icon = script.getAttribute('data-icon') || 'star';
  var layout = script.getAttribute('data-layout') || 'grid';

  if (!workspaceId) {
    console.error('Prooflayer Floating: Missing data-workspace attribute');
    return;
  }

  // Use the canonical domain to avoid redirect issues
  var scriptUrl = new URL(script.src);
  var origin = scriptUrl.origin;
  if (origin.includes('prooflayer.app') && !origin.includes('localhost')) {
    origin = 'https://www.prooflayer.app';
  }
  var apiUrl = origin + '/api/widget/' + workspaceId;

  var isDark = theme === 'dark';
  var marqueeSpeed = script.getAttribute('data-marquee-speed') || '50';
  var autoRotate = script.getAttribute('data-auto-rotate') || '5000';

  // Position mapping
  var positionStyles = {
    'bottom-right': 'bottom:24px;right:24px',
    'bottom-left': 'bottom:24px;left:24px',
    'top-right': 'top:24px;right:24px',
    'top-left': 'top:24px;left:24px'
  };

  var isBottom = position.includes('bottom');
  var isRight = position.includes('right');

  // Floating badge styles
  var floatingStyles = '.pl-floating-badge{position:fixed;' + positionStyles[position] + ';z-index:999997;cursor:pointer;transition:transform 0.2s ease}.pl-floating-badge:hover{transform:scale(1.05)}.pl-floating-button{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:50px;padding:14px 20px;font-size:15px;font-weight:600;box-shadow:0 10px 25px rgba(102,126,234,0.4);display:flex;align-items:center;gap:10px;cursor:pointer;font-family:system-ui,-apple-system,sans-serif}.pl-floating-button:hover{box-shadow:0 15px 30px rgba(102,126,234,0.5)}.pl-floating-icon{width:22px;height:22px;flex-shrink:0}.pl-floating-panel{position:fixed;' + (isBottom ? 'bottom:90px;' : 'top:90px;') + (isRight ? 'right:24px;' : 'left:24px;') + 'width:400px;max-width:calc(100vw - 48px);max-height:70vh;background:' + (isDark ? '#1f2937' : '#fff') + ';border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,0.3);overflow:hidden;transform:scale(0.9) translateY(' + (isBottom ? '20px' : '-20px') + ');opacity:0;transition:all 0.3s ease;pointer-events:none;z-index:999998}.pl-floating-panel.pl-open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto}.pl-floating-header{padding:20px;border-bottom:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';display:flex;justify-content:space-between;align-items:center}.pl-floating-title{font-size:18px;font-weight:700;color:' + (isDark ? '#f9fafb' : '#111827') + ';margin:0}.pl-floating-close{background:' + (isDark ? '#374151' : '#f3f4f6') + ';border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s}.pl-floating-close:hover{background:' + (isDark ? '#4b5563' : '#e5e7eb') + '}.pl-floating-close svg{width:16px;height:16px;color:' + (isDark ? '#9ca3af' : '#6b7280') + '}.pl-floating-content{padding:16px;max-height:calc(70vh - 80px);overflow-y:auto}@media(max-width:640px){.pl-floating-panel{width:calc(100vw - 48px);' + (isRight ? 'right:24px;' : 'left:24px;') + '}}';

  // Widget styles (reuse from main widget, but smaller cards)
  var widgetStyles = '.pl-widget{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.pl-widget *{box-sizing:border-box}.pl-grid{display:flex;flex-direction:column;gap:12px}.pl-carousel{display:flex;flex-direction:column;gap:12px;max-height:500px;overflow-y:auto}.pl-card{background:' + (isDark ? '#111827' : '#f9fafb') + ';border:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';border-radius:10px;padding:16px}.pl-card-header{display:flex;align-items:center;margin-bottom:12px}.pl-avatar{width:40px;height:40px;border-radius:50%;background:' + (isDark ? '#374151' : '#e5e7eb') + ';display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';margin-right:10px;overflow:hidden}.pl-avatar img{width:100%;height:100%;object-fit:cover}.pl-name{font-weight:600;color:' + (isDark ? '#f9fafb' : '#111827') + ';font-size:14px}.pl-role{color:' + (isDark ? '#9ca3af' : '#6b7280') + ';font-size:12px}.pl-stars{display:flex;gap:2px;margin-bottom:8px}.pl-star{width:14px;height:14px}.pl-star-filled{color:#fbbf24}.pl-star-empty{color:' + (isDark ? '#4b5563' : '#e5e7eb') + '}.pl-text{color:' + (isDark ? '#d1d5db' : '#374151') + ';font-size:13px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.pl-badge{text-align:center;margin-top:16px;padding-top:16px;border-top:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';font-size:11px;color:' + (isDark ? '#6b7280' : '#9ca3af') + '}.pl-badge a{color:' + (isDark ? '#60a5fa' : '#3b82f6') + ';text-decoration:none}.pl-badge a:hover{text-decoration:underline}.pl-empty{text-align:center;padding:30px 16px;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';font-size:14px}';

  var styleEl = document.createElement('style');
  styleEl.textContent = floatingStyles + widgetStyles;
  document.head.appendChild(styleEl);

  // Icon SVGs
  var icons = {
    star: '<svg class="pl-floating-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
    chat: '<svg class="pl-floating-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
    heart: '<svg class="pl-floating-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>'
  };

  function starSvg(filled) {
    return '<svg class="pl-star ' + (filled ? 'pl-star-filled' : 'pl-star-empty') + '" viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>';
  }

  function getInitials(name) {
    return name.split(' ').map(function(n) { return n[0]; }).slice(0, 2).join('').toUpperCase();
  }

  function renderCard(t) {
    var stars = '';
    if (t.rating) {
      stars = '<div class="pl-stars">';
      for (var i = 1; i <= 5; i++) {
        stars += starSvg(i <= t.rating);
      }
      stars += '</div>';
    }
    var roleText = [t.role, t.company].filter(Boolean).join(' at ');

    var isScreenshot = t.submissionType === 'SCREENSHOT';
    var isVideo = t.submissionType === 'VIDEO';

    var avatar = (t.photoUrl && !isScreenshot)
      ? '<img src="' + t.photoUrl + '" alt="' + t.name + '">'
      : getInitials(t.name);

    var mediaContent = '';

    // Video testimonials
    if (isVideo && t.videoUrl) {
      mediaContent = '<div class="pl-video" style="margin:10px 0"><video controls style="width:100%;border-radius:8px;max-height:300px"><source src="' + t.videoUrl + '" type="video/mp4">Your browser does not support video.</video></div>';
    }

    // Screenshot testimonials
    if (isScreenshot && t.photoUrl) {
      mediaContent = '<div class="pl-screenshot"><img src="' + t.photoUrl + '" alt="Screenshot" style="width:100%;border-radius:8px;margin:10px 0"/></div>';
    }

    // Show text for text testimonials, or if video/screenshot has additional text
    var testimonialText = '';
    if (t.testimonial && (!isScreenshot || t.testimonial)) {
      testimonialText = '<div class="pl-text">' + t.testimonial + '</div>';
    }

    return '<div class="pl-card"><div class="pl-card-header"><div class="pl-avatar">' + avatar + '</div><div><div class="pl-name">' + t.name + '</div>' + (roleText ? '<div class="pl-role">' + roleText + '</div>' : '') + '</div></div>' + stars + mediaContent + testimonialText + '</div>';
  }

  // Create floating badge
  var badge = document.createElement('div');
  badge.className = 'pl-floating-badge';
  badge.innerHTML = '<button class="pl-floating-button">' + (icons[icon] || icons.star) + '<span>' + text + '</span></button>';

  // Create panel
  var panel = document.createElement('div');
  panel.className = 'pl-floating-panel';
  panel.innerHTML = '<div class="pl-floating-header"><h3 class="pl-floating-title">Customer Testimonials</h3><button class="pl-floating-close"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></div><div class="pl-floating-content"><div class="pl-widget"><div class="pl-empty">Loading testimonials...</div></div></div>';

  document.body.appendChild(badge);
  document.body.appendChild(panel);

  var isOpen = false;

  badge.onclick = function() {
    if (!isOpen) {
      panel.classList.add('pl-open');
      isOpen = true;
      loadTestimonials();
    } else {
      panel.classList.remove('pl-open');
      isOpen = false;
    }
  };

  panel.querySelector('.pl-floating-close').onclick = function() {
    panel.classList.remove('pl-open');
    isOpen = false;
  };

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (isOpen && !panel.contains(e.target) && !badge.contains(e.target)) {
      panel.classList.remove('pl-open');
      isOpen = false;
    }
  });

  var testimonialsLoaded = false;

  function loadTestimonials() {
    if (testimonialsLoaded) return;

    fetch(apiUrl)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        testimonialsLoaded = true;
        var contentDiv = panel.querySelector('.pl-floating-content .pl-widget');

        if (data.error || !data.testimonials || data.testimonials.length === 0) {
          contentDiv.innerHTML = '<div class="pl-empty">No testimonials available.</div>';
          return;
        }

        var testimonials = data.testimonials;
        var showBadge = data.showBadge;
        var cardsHtml = testimonials.map(renderCard).join('');
        var badgeHtml = showBadge ? '<div class="pl-badge">Powered by <a href="https://prooflayer.app" target="_blank">Prooflayer</a></div>' : '';
        contentDiv.innerHTML = '<div class="pl-grid">' + cardsHtml + '</div>' + badgeHtml;
      })
      .catch(function(err) {
        console.error('Prooflayer Floating: Failed to load testimonials', err);
        var contentDiv = panel.querySelector('.pl-floating-content .pl-widget');
        contentDiv.innerHTML = '<div class="pl-empty">Failed to load testimonials.</div>';
      });
  }
})();
