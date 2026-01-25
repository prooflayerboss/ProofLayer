(function() {
  var script = document.currentScript;
  var workspaceId = script.getAttribute('data-workspace');
  var layout = script.getAttribute('data-layout') || 'grid';
  var theme = script.getAttribute('data-theme') || 'light';
  
  if (!workspaceId) {
    console.error('Prooflayer: Missing data-workspace attribute');
    return;
  }

  var container = document.getElementById('prooflayer-widget');
  if (!container) {
    console.error('Prooflayer: Container #prooflayer-widget not found');
    return;
  }

  // Use the canonical domain to avoid redirect issues
  var scriptUrl = new URL(script.src);
  var origin = scriptUrl.origin;
  // Handle both prooflayer.app and www.prooflayer.app
  if (origin.includes('prooflayer.app') && !origin.includes('localhost')) {
    origin = 'https://www.prooflayer.app';
  }
  var apiUrl = origin + '/api/widget/' + workspaceId;

  var isDark = theme === 'dark';
  var marqueeSpeed = script.getAttribute('data-marquee-speed') || '50';
  var autoRotate = script.getAttribute('data-auto-rotate') || '5000';
  var animation = script.getAttribute('data-animation') || 'fade';
  var hoverEffect = script.getAttribute('data-hover') !== 'false';
  var scrollDirection = script.getAttribute('data-scroll') || 'vertical';

  // Animation CSS
  var animationCSS = '';
  if (animation === 'fade') {
    animationCSS = '.pl-card{animation:pl-fade-in 0.6s ease-out forwards;opacity:0}.pl-card:nth-child(1){animation-delay:0.1s}.pl-card:nth-child(2){animation-delay:0.2s}.pl-card:nth-child(3){animation-delay:0.3s}.pl-card:nth-child(4){animation-delay:0.4s}.pl-card:nth-child(5){animation-delay:0.5s}.pl-card:nth-child(6){animation-delay:0.6s}@keyframes pl-fade-in{to{opacity:1}}';
  } else if (animation === 'slide') {
    animationCSS = '.pl-card{animation:pl-slide-up 0.6s ease-out forwards;opacity:0;transform:translateY(20px)}.pl-card:nth-child(1){animation-delay:0.1s}.pl-card:nth-child(2){animation-delay:0.2s}.pl-card:nth-child(3){animation-delay:0.3s}.pl-card:nth-child(4){animation-delay:0.4s}.pl-card:nth-child(5){animation-delay:0.5s}.pl-card:nth-child(6){animation-delay:0.6s}@keyframes pl-slide-up{to{opacity:1;transform:translateY(0)}}';
  } else if (animation === 'hearts') {
    animationCSS = '.pl-widget{position:relative;overflow:hidden}.pl-heart{position:absolute;font-size:20px;animation:pl-float-heart 4s ease-in-out infinite;opacity:0.6;pointer-events:none}@keyframes pl-float-heart{0%{opacity:0;transform:translateY(0) rotate(0deg)}10%{opacity:0.6}90%{opacity:0.6}100%{opacity:0;transform:translateY(-100vh) rotate(360deg)}}';
  }

  var hoverCSS = hoverEffect ? '.pl-card{transition:transform 0.2s ease,box-shadow 0.2s ease}.pl-card:hover{transform:translateY(-4px);box-shadow:0 12px 24px -10px rgba(0,0,0,0.2)}' : '';

  var styles = '.pl-widget{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.pl-widget *{box-sizing:border-box}.pl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}.pl-carousel{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:20px;padding-bottom:10px}.pl-marquee{display:flex;gap:20px;overflow:hidden;position:relative}.pl-marquee-track{display:flex;gap:20px;animation:pl-marquee-scroll ' + marqueeSpeed + 's linear infinite}.pl-marquee-track:hover{animation-play-state:paused}@keyframes pl-marquee-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.pl-masonry{column-count:3;column-gap:20px}@media(max-width:1024px){.pl-masonry{column-count:2}}@media(max-width:640px){.pl-masonry{column-count:1}}.pl-masonry .pl-card{break-inside:avoid;margin-bottom:20px}.pl-spotlight{max-width:700px;margin:0 auto;position:relative;min-height:200px}.pl-spotlight .pl-card{opacity:0;position:absolute;top:0;left:0;right:0;transition:opacity 0.5s ease-in-out;pointer-events:none}.pl-spotlight .pl-card.pl-active{opacity:1;position:relative;pointer-events:auto}.pl-list{display:flex;flex-direction:column;gap:16px;max-width:800px;margin:0 auto}.pl-card{background:' + (isDark ? '#1f2937' : '#fff') + ';border:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';border-radius:12px;padding:24px;' + (layout === 'carousel' ? 'min-width:320px;scroll-snap-align:start;' : '') + '}.pl-card-header{display:flex;align-items:center;margin-bottom:16px}.pl-avatar{width:48px;height:48px;border-radius:50%;background:' + (isDark ? '#374151' : '#e5e7eb') + ';display:flex;align-items:center;justify-content:center;font-weight:600;font-size:18px;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';margin-right:12px;overflow:hidden}.pl-avatar img{width:100%;height:100%;object-fit:cover}.pl-name{font-weight:600;color:' + (isDark ? '#f9fafb' : '#111827') + ';font-size:16px}.pl-role{color:' + (isDark ? '#9ca3af' : '#6b7280') + ';font-size:14px}.pl-stars{display:flex;gap:2px;margin-bottom:12px}.pl-star{width:18px;height:18px}.pl-star-filled{color:#fbbf24}.pl-star-empty{color:' + (isDark ? '#4b5563' : '#e5e7eb') + '}.pl-text{color:' + (isDark ? '#d1d5db' : '#374151') + ';font-size:15px;line-height:1.6}.pl-badge{text-align:center;margin-top:20px;font-size:12px;color:' + (isDark ? '#6b7280' : '#9ca3af') + '}.pl-badge a{color:' + (isDark ? '#60a5fa' : '#3b82f6') + ';text-decoration:none}.pl-badge a:hover{text-decoration:underline}.pl-empty{text-align:center;padding:40px 20px;color:' + (isDark ? '#9ca3af' : '#6b7280') + '}' + animationCSS + hoverCSS;

  var styleEl = document.createElement('style');
  styleEl.textContent = styles;
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

  // Track widget view (fire and forget - don't wait for response)
  var viewUrl = origin + '/api/widget/' + workspaceId + '/view';
  fetch(viewUrl, { method: 'POST' }).catch(function() {});

  fetch(apiUrl)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.error) {
        container.innerHTML = '<div class="pl-widget"><div class="pl-empty">' + data.error + '</div></div>';
        return;
      }

      var testimonials = data.testimonials;
      var showBadge = data.showBadge;

      if (!testimonials || testimonials.length === 0) {
        container.innerHTML = '<div class="pl-widget"><div class="pl-empty">No testimonials yet.</div></div>';
        return;
      }

      var cardsHtml = testimonials.map(renderCard).join('');
      var badgeHtml = showBadge ? '<div class="pl-badge">Powered by <a href="https://prooflayer.app" target="_blank">Prooflayer</a></div>' : '';

      // Handle different layout types
      var layoutHtml;
      if (layout === 'marquee') {
        // Duplicate cards for infinite scroll effect
        layoutHtml = '<div class="pl-marquee"><div class="pl-marquee-track">' + cardsHtml + cardsHtml + '</div></div>';
      } else if (layout === 'spotlight') {
        // Add active class to first card
        var spotlightCards = testimonials.map(function(t, i) {
          var card = renderCard(t);
          return card.replace('class="pl-card"', 'class="pl-card' + (i === 0 ? ' pl-active' : '') + '"');
        }).join('');
        layoutHtml = '<div class="pl-spotlight">' + spotlightCards + '</div>';
      } else {
        // Grid, carousel, masonry use default rendering
        layoutHtml = '<div class="pl-' + layout + '">' + cardsHtml + '</div>';
      }

      container.innerHTML = '<div class="pl-widget">' + layoutHtml + badgeHtml + '</div>';

      // Spotlight auto-rotation
      if (layout === 'spotlight' && testimonials.length > 1) {
        var currentIndex = 0;
        var cards = container.querySelectorAll('.pl-spotlight .pl-card');
        setInterval(function() {
          cards[currentIndex].classList.remove('pl-active');
          currentIndex = (currentIndex + 1) % cards.length;
          cards[currentIndex].classList.add('pl-active');
        }, parseInt(autoRotate));
      }

      // Hearts animation - generate floating hearts
      if (animation === 'hearts') {
        var widget = container.querySelector('.pl-widget');
        setInterval(function() {
          var heart = document.createElement('div');
          heart.className = 'pl-heart';
          heart.innerHTML = '❤️';
          heart.style.left = Math.random() * 100 + '%';
          heart.style.animationDelay = Math.random() * 2 + 's';
          heart.style.animationDuration = (3 + Math.random() * 2) + 's';
          widget.appendChild(heart);
          setTimeout(function() {
            widget.removeChild(heart);
          }, 5000);
        }, 800);
      }
    })
    .catch(function(err) {
      console.error('Prooflayer: Failed to load testimonials', err);
      container.innerHTML = '<div class="pl-widget"><div class="pl-empty">Failed to load testimonials.</div></div>';
    });
})();