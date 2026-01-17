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
  var styles = '.pl-widget{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.pl-widget *{box-sizing:border-box}.pl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}.pl-carousel{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:20px;padding-bottom:10px}.pl-card{background:' + (isDark ? '#1f2937' : '#fff') + ';border:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';border-radius:12px;padding:24px;' + (layout === 'carousel' ? 'min-width:320px;scroll-snap-align:start;' : '') + '}.pl-card-header{display:flex;align-items:center;margin-bottom:16px}.pl-avatar{width:48px;height:48px;border-radius:50%;background:' + (isDark ? '#374151' : '#e5e7eb') + ';display:flex;align-items:center;justify-content:center;font-weight:600;font-size:18px;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';margin-right:12px;overflow:hidden}.pl-avatar img{width:100%;height:100%;object-fit:cover}.pl-name{font-weight:600;color:' + (isDark ? '#f9fafb' : '#111827') + ';font-size:16px}.pl-role{color:' + (isDark ? '#9ca3af' : '#6b7280') + ';font-size:14px}.pl-stars{display:flex;gap:2px;margin-bottom:12px}.pl-star{width:18px;height:18px}.pl-star-filled{color:#fbbf24}.pl-star-empty{color:' + (isDark ? '#4b5563' : '#e5e7eb') + '}.pl-text{color:' + (isDark ? '#d1d5db' : '#374151') + ';font-size:15px;line-height:1.6}.pl-badge{text-align:center;margin-top:20px;font-size:12px;color:' + (isDark ? '#6b7280' : '#9ca3af') + '}.pl-badge a{color:' + (isDark ? '#60a5fa' : '#3b82f6') + ';text-decoration:none}.pl-badge a:hover{text-decoration:underline}.pl-empty{text-align:center;padding:40px 20px;color:' + (isDark ? '#9ca3af' : '#6b7280') + '}';

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
    var avatar = t.photoUrl 
      ? '<img src="' + t.photoUrl + '" alt="' + t.name + '">'
      : getInitials(t.name);

    return '<div class="pl-card"><div class="pl-card-header"><div class="pl-avatar">' + avatar + '</div><div><div class="pl-name">' + t.name + '</div>' + (roleText ? '<div class="pl-role">' + roleText + '</div>' : '') + '</div></div>' + stars + '<div class="pl-text">' + t.testimonial + '</div></div>';
  }

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

      container.innerHTML = '<div class="pl-widget"><div class="pl-' + layout + '">' + cardsHtml + '</div>' + badgeHtml + '</div>';
    })
    .catch(function(err) {
      console.error('Prooflayer: Failed to load testimonials', err);
      container.innerHTML = '<div class="pl-widget"><div class="pl-empty">Failed to load testimonials.</div></div>';
    });
})();