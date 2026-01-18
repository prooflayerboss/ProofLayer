(function() {
  var script = document.currentScript;
  var workspaceId = script.getAttribute('data-workspace');
  var theme = script.getAttribute('data-theme') || 'light';
  var trigger = script.getAttribute('data-trigger') || 'time';
  var delay = parseInt(script.getAttribute('data-delay') || '5000');
  var showOnce = script.getAttribute('data-show-once') !== 'false';
  var layout = script.getAttribute('data-layout') || 'grid';

  if (!workspaceId) {
    console.error('Prooflayer Popup: Missing data-workspace attribute');
    return;
  }

  // Check if already shown
  var storageKey = 'prooflayer-popup-shown-' + workspaceId;
  if (showOnce && localStorage.getItem(storageKey)) {
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

  // Modal styles
  var modalStyles = '.pl-popup-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:999998;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;animation:pl-fade-in 0.3s forwards}@keyframes pl-fade-in{to{opacity:1}}.pl-popup-modal{background:' + (isDark ? '#1f2937' : '#fff') + ';border-radius:16px;max-width:900px;width:90%;max-height:85vh;overflow-y:auto;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);position:relative;animation:pl-slide-up 0.3s ease-out;margin:20px}@keyframes pl-slide-up{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}.pl-popup-close{position:absolute;top:16px;right:16px;background:' + (isDark ? '#374151' : '#f3f4f6') + ';border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;transition:background 0.2s}.pl-popup-close:hover{background:' + (isDark ? '#4b5563' : '#e5e7eb') + '}.pl-popup-close svg{width:18px;height:18px;color:' + (isDark ? '#9ca3af' : '#6b7280') + '}.pl-popup-header{padding:32px 32px 24px;border-bottom:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + '}.pl-popup-title{font-size:24px;font-weight:700;color:' + (isDark ? '#f9fafb' : '#111827') + ';margin:0 0 8px 0}.pl-popup-subtitle{font-size:16px;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';margin:0}.pl-popup-content{padding:24px 32px 32px}';

  // Widget styles (reuse from main widget)
  var widgetStyles = '.pl-widget{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.pl-widget *{box-sizing:border-box}.pl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}.pl-carousel{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px;padding-bottom:10px}.pl-marquee{display:flex;gap:16px;overflow:hidden;position:relative}.pl-marquee-track{display:flex;gap:16px;animation:pl-marquee-scroll ' + marqueeSpeed + 's linear infinite}.pl-marquee-track:hover{animation-play-state:paused}@keyframes pl-marquee-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.pl-masonry{column-count:3;column-gap:16px}@media(max-width:1024px){.pl-masonry{column-count:2}}@media(max-width:640px){.pl-masonry{column-count:1}}.pl-masonry .pl-card{break-inside:avoid;margin-bottom:16px}.pl-spotlight{max-width:600px;margin:0 auto;position:relative;min-height:200px}.pl-spotlight .pl-card{opacity:0;position:absolute;top:0;left:0;right:0;transition:opacity 0.5s ease-in-out;pointer-events:none}.pl-spotlight .pl-card.pl-active{opacity:1;position:relative;pointer-events:auto}.pl-card{background:' + (isDark ? '#1f2937' : '#fff') + ';border:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';border-radius:12px;padding:20px;' + (layout === 'carousel' ? 'min-width:300px;scroll-snap-align:start;' : '') + '}.pl-card-header{display:flex;align-items:center;margin-bottom:14px}.pl-avatar{width:44px;height:44px;border-radius:50%;background:' + (isDark ? '#374151' : '#e5e7eb') + ';display:flex;align-items:center;justify-content:center;font-weight:600;font-size:16px;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';margin-right:12px;overflow:hidden}.pl-avatar img{width:100%;height:100%;object-fit:cover}.pl-name{font-weight:600;color:' + (isDark ? '#f9fafb' : '#111827') + ';font-size:15px}.pl-role{color:' + (isDark ? '#9ca3af' : '#6b7280') + ';font-size:13px}.pl-stars{display:flex;gap:2px;margin-bottom:10px}.pl-star{width:16px;height:16px}.pl-star-filled{color:#fbbf24}.pl-star-empty{color:' + (isDark ? '#4b5563' : '#e5e7eb') + '}.pl-text{color:' + (isDark ? '#d1d5db' : '#374151') + ';font-size:14px;line-height:1.5}.pl-badge{text-align:center;margin-top:16px;padding-top:16px;border-top:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';font-size:12px;color:' + (isDark ? '#6b7280' : '#9ca3af') + '}.pl-badge a{color:' + (isDark ? '#60a5fa' : '#3b82f6') + ';text-decoration:none}.pl-badge a:hover{text-decoration:underline}.pl-empty{text-align:center;padding:40px 20px;color:' + (isDark ? '#9ca3af' : '#6b7280') + '}';

  var styleEl = document.createElement('style');
  styleEl.textContent = modalStyles + widgetStyles;
  document.head.appendChild(styleEl);

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
      mediaContent = '<div class="pl-video" style="margin:12px 0"><video controls style="width:100%;border-radius:8px;max-height:400px"><source src="' + t.videoUrl + '" type="video/mp4">Your browser does not support video.</video></div>';
    }

    // Screenshot testimonials
    if (isScreenshot && t.photoUrl) {
      mediaContent = '<div class="pl-screenshot"><img src="' + t.photoUrl + '" alt="Screenshot" style="width:100%;border-radius:8px;margin:12px 0"/></div>';
    }

    // Show text for text testimonials, or if video/screenshot has additional text
    var testimonialText = '';
    if (t.testimonial && (!isScreenshot || t.testimonial)) {
      testimonialText = '<div class="pl-text">' + t.testimonial + '</div>';
    }

    return '<div class="pl-card"><div class="pl-card-header"><div class="pl-avatar">' + avatar + '</div><div><div class="pl-name">' + t.name + '</div>' + (roleText ? '<div class="pl-role">' + roleText + '</div>' : '') + '</div></div>' + stars + mediaContent + testimonialText + '</div>';
  }

  function showPopup(testimonials, showBadge) {
    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'pl-popup-overlay';
    overlay.onclick = function(e) {
      if (e.target === overlay) {
        closePopup();
      }
    };

    // Create modal
    var modal = document.createElement('div');
    modal.className = 'pl-popup-modal';

    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.className = 'pl-popup-close';
    closeBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
    closeBtn.onclick = closePopup;

    // Header
    var header = document.createElement('div');
    header.className = 'pl-popup-header';
    header.innerHTML = '<h2 class="pl-popup-title">What Our Customers Say</h2><p class="pl-popup-subtitle">Real testimonials from real people</p>';

    // Content
    var content = document.createElement('div');
    content.className = 'pl-popup-content';

    var cardsHtml = testimonials.map(renderCard).join('');
    var badgeHtml = showBadge ? '<div class="pl-badge">Powered by <a href="https://prooflayer.app" target="_blank">Prooflayer</a></div>' : '';
    var layoutHtml;
    if (layout === 'marquee') {
      layoutHtml = '<div class="pl-marquee"><div class="pl-marquee-track">' + cardsHtml + cardsHtml + '</div></div>';
    } else if (layout === 'spotlight') {
      var spotlightCards = testimonials.map(function(t, i) {
        var card = renderCard(t);
        return card.replace('class="pl-card"', 'class="pl-card' + (i === 0 ? ' pl-active' : '') + '"');
      }).join('');
      layoutHtml = '<div class="pl-spotlight">' + spotlightCards + '</div>';
    } else {
      layoutHtml = '<div class="pl-' + layout + '">' + cardsHtml + '</div>';
    }

    content.innerHTML = '<div class="pl-widget">' + layoutHtml + badgeHtml + '</div>';

    modal.appendChild(closeBtn);
    modal.appendChild(header);
    modal.appendChild(content);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Mark as shown
    if (showOnce) {
      localStorage.setItem(storageKey, 'true');
    }

    // Spotlight auto-rotation
    if (layout === 'spotlight' && testimonials.length > 1) {
      var currentIndex = 0;
      var cards = content.querySelectorAll('.pl-spotlight .pl-card');
      setInterval(function() {
        cards[currentIndex].classList.remove('pl-active');
        currentIndex = (currentIndex + 1) % cards.length;
        cards[currentIndex].classList.add('pl-active');
      }, parseInt(autoRotate));
    }
  }

  function closePopup() {
    var overlay = document.querySelector('.pl-popup-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(function() {
        overlay.remove();
      }, 300);
    }
  }

  function triggerPopup() {
    fetch(apiUrl)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.error || !data.testimonials || data.testimonials.length === 0) {
          return;
        }
        showPopup(data.testimonials, data.showBadge);
      })
      .catch(function(err) {
        console.error('Prooflayer Popup: Failed to load testimonials', err);
      });
  }

  // Set up trigger
  if (trigger === 'time') {
    setTimeout(triggerPopup, delay);
  } else if (trigger === 'exit_intent') {
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0 && !localStorage.getItem(storageKey)) {
        triggerPopup();
      }
    }, { once: showOnce });
  } else if (trigger === 'scroll') {
    var scrollThreshold = parseInt(script.getAttribute('data-scroll-percent') || '50');
    var triggered = false;
    window.addEventListener('scroll', function() {
      if (triggered) return;
      var scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= scrollThreshold) {
        triggered = true;
        triggerPopup();
      }
    });
  }

  // Allow ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePopup();
    }
  });
})();
