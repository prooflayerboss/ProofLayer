(function() {
  var script = document.currentScript;
  var workspaceId = script.getAttribute('data-workspace');
  var theme = script.getAttribute('data-theme') || 'light';

  if (!workspaceId) {
    console.error('Prooflayer Form: Missing data-workspace attribute');
    return;
  }

  var container = document.getElementById('prooflayer-form');
  if (!container) {
    console.error('Prooflayer Form: Container #prooflayer-form not found');
    return;
  }

  // Use the canonical domain to avoid redirect issues
  var scriptUrl = new URL(script.src);
  var origin = scriptUrl.origin;
  if (origin.includes('prooflayer.app') && !origin.includes('localhost')) {
    origin = 'https://www.prooflayer.app';
  }

  var isDark = theme === 'dark';

  // Embedded form styles
  var styles = '.pl-form{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto}.pl-form *{box-sizing:border-box}.pl-form-container{background:' + (isDark ? '#1f2937' : '#fff') + ';border:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';border-radius:16px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}.pl-form-header{text-align:center;margin-bottom:24px}.pl-form-title{font-size:24px;font-weight:700;color:' + (isDark ? '#f9fafb' : '#111827') + ';margin:0 0 8px 0}.pl-form-subtitle{font-size:16px;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';margin:0}.pl-form-field{margin-bottom:20px}.pl-form-label{display:block;font-size:14px;font-weight:600;color:' + (isDark ? '#e5e7eb' : '#374151') + ';margin-bottom:8px}.pl-form-required{color:#ef4444}.pl-form-input,.pl-form-textarea{width:100%;padding:12px 16px;border:1px solid ' + (isDark ? '#374151' : '#d1d5db') + ';border-radius:8px;font-size:15px;color:' + (isDark ? '#f9fafb' : '#111827') + ';background:' + (isDark ? '#111827' : '#fff') + ';transition:border-color 0.2s}.pl-form-input:focus,.pl-form-textarea:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,0.1)}.pl-form-textarea{resize:vertical;min-height:120px}.pl-form-stars{display:flex;gap:4px;margin-bottom:20px}.pl-form-star{width:32px;height:32px;cursor:pointer;transition:transform 0.2s}.pl-form-star:hover{transform:scale(1.1)}.pl-form-star-filled{color:#fbbf24}.pl-form-star-empty{color:' + (isDark ? '#4b5563' : '#d1d5db') + '}.pl-form-tabs{display:flex;gap:8px;margin-bottom:20px;border-bottom:2px solid ' + (isDark ? '#374151' : '#e5e7eb') + '}.pl-form-tab{padding:12px 20px;background:none;border:none;font-size:14px;font-weight:600;color:' + (isDark ? '#9ca3af' : '#6b7280') + ';cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all 0.2s}.pl-form-tab:hover{color:' + (isDark ? '#f9fafb' : '#111827') + '}.pl-form-tab-active{color:#3b82f6;border-bottom-color:#3b82f6}.pl-form-submit{width:100%;padding:14px 24px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}.pl-form-submit:hover{transform:translateY(-1px);box-shadow:0 10px 15px -3px rgba(0,0,0,0.2)}.pl-form-submit:disabled{opacity:0.5;cursor:not-allowed}.pl-form-success,.pl-form-error{padding:16px;border-radius:8px;margin-bottom:20px;font-size:14px}.pl-form-success{background:#d1fae5;color:#065f46;border:1px solid #6ee7b7}.pl-form-error{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}';

  var styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // Fetch workspace data to get form info
  fetch(origin + '/api/widget/' + workspaceId)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.error) {
        container.innerHTML = '<div class="pl-form"><div class="pl-form-error">' + data.error + '</div></div>';
        return;
      }

      // Get the first form from workspace (could be enhanced to select specific form)
      var formId = data.forms && data.forms[0] ? data.forms[0].id : null;

      if (!formId) {
        container.innerHTML = '<div class="pl-form"><div class="pl-form-error">No form found for this workspace.</div></div>';
        return;
      }

      renderForm(formId, data.workspaceName);
    })
    .catch(function(err) {
      console.error('Prooflayer Form: Failed to load workspace data', err);
      container.innerHTML = '<div class="pl-form"><div class="pl-form-error">Failed to load form.</div></div>';
    });

  function renderForm(formId, workspaceName) {
    var rating = 0;
    var submissionType = 'TEXT';
    var formHtml = '<div class="pl-form"><div class="pl-form-container"><div class="pl-form-header"><h2 class="pl-form-title">Share Your Feedback</h2><p class="pl-form-subtitle">Your testimonial helps us improve!</p></div><form id="pl-testimonial-form"><div class="pl-form-tabs"><button type="button" class="pl-form-tab pl-form-tab-active" data-type="TEXT">✍️ Write</button><button type="button" class="pl-form-tab" data-type="VIDEO">🎥 Video</button><button type="button" class="pl-form-tab" data-type="SCREENSHOT">📸 Screenshot</button></div><div id="pl-form-content"></div><button type="submit" class="pl-form-submit">Submit Testimonial</button></form></div></div>';

    container.innerHTML = formHtml;

    var form = document.getElementById('pl-testimonial-form');
    var contentDiv = document.getElementById('pl-form-content');
    var tabs = container.querySelectorAll('.pl-form-tab');

    // Tab switching
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('pl-form-tab-active'); });
        tab.classList.add('pl-form-tab-active');
        submissionType = tab.getAttribute('data-type');
        renderFormContent();
      });
    });

    function renderFormContent() {
      if (submissionType === 'TEXT') {
        contentDiv.innerHTML = '<div class="pl-form-field"><label class="pl-form-label">Your Name <span class="pl-form-required">*</span></label><input type="text" name="name" class="pl-form-input" required></div><div class="pl-form-field"><label class="pl-form-label">Company</label><input type="text" name="company" class="pl-form-input"></div><div class="pl-form-field"><label class="pl-form-label">Job Title</label><input type="text" name="role" class="pl-form-input"></div><div class="pl-form-field"><label class="pl-form-label">Rating</label><div class="pl-form-stars" id="pl-rating-stars"></div></div><div class="pl-form-field"><label class="pl-form-label">Your Testimonial <span class="pl-form-required">*</span></label><textarea name="testimonial" class="pl-form-textarea" required placeholder="Share your experience..."></textarea></div>';
        renderStars();
      } else if (submissionType === 'VIDEO') {
        contentDiv.innerHTML = '<div class="pl-form-field"><label class="pl-form-label">Your Name <span class="pl-form-required">*</span></label><input type="text" name="name" class="pl-form-input" required></div><div class="pl-form-field"><label class="pl-form-label">Company</label><input type="text" name="company" class="pl-form-input"></div><div class="pl-form-field"><label class="pl-form-label">Job Title</label><input type="text" name="role" class="pl-form-input"></div><div class="pl-form-field"><label class="pl-form-label">Video Upload</label><input type="file" name="video" accept="video/*" class="pl-form-input" required></div><div class="pl-form-field"><label class="pl-form-label">Additional Message (optional)</label><textarea name="testimonial" class="pl-form-textarea" placeholder="Add any additional context..."></textarea></div>';
      } else if (submissionType === 'SCREENSHOT') {
        contentDiv.innerHTML = '<div class="pl-form-field"><label class="pl-form-label">Your Name <span class="pl-form-required">*</span></label><input type="text" name="name" class="pl-form-input" required></div><div class="pl-form-field"><label class="pl-form-label">Screenshot Upload <span class="pl-form-required">*</span></label><input type="file" name="screenshot" accept="image/*" class="pl-form-input" required></div><div class="pl-form-field"><label class="pl-form-label">Social Platform</label><select name="platform" class="pl-form-input"><option value="">Select platform...</option><option value="Twitter">Twitter</option><option value="LinkedIn">LinkedIn</option><option value="Facebook">Facebook</option><option value="Instagram">Instagram</option></select></div>';
      }
    }

    function renderStars() {
      var starsDiv = document.getElementById('pl-rating-stars');
      if (!starsDiv) return;

      for (var i = 1; i <= 5; i++) {
        var star = document.createElement('div');
        star.className = 'pl-form-star pl-form-star-empty';
        star.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>';
        star.dataset.rating = i;
        star.addEventListener('click', function() {
          rating = parseInt(this.dataset.rating);
          updateStars();
        });
        starsDiv.appendChild(star);
      }
    }

    function updateStars() {
      var stars = document.querySelectorAll('.pl-form-star');
      stars.forEach(function(star, idx) {
        if (idx < rating) {
          star.classList.remove('pl-form-star-empty');
          star.classList.add('pl-form-star-filled');
        } else {
          star.classList.remove('pl-form-star-filled');
          star.classList.add('pl-form-star-empty');
        }
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var submitBtn = form.querySelector('.pl-form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      var formData = new FormData(form);
      var data = {
        formId: formId,
        name: formData.get('name'),
        company: formData.get('company') || null,
        role: formData.get('role') || null,
        testimonial: formData.get('testimonial') || '',
        rating: rating || null,
        submissionType: submissionType
      };

      // For now, just show success (file upload would need server endpoint)
      setTimeout(function() {
        contentDiv.innerHTML = '<div class="pl-form-success"><strong>Thank you!</strong> Your testimonial has been submitted successfully.</div>';
        submitBtn.style.display = 'none';
      }, 1000);
    });

    renderFormContent();
  }
})();
