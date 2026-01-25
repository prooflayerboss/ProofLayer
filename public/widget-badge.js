// This is an alias/wrapper for widget-floating.js for the new "BADGE" widget type
// Simply loads the floating widget with the same functionality

(function() {
  var script = document.currentScript;

  // Get all attributes from this script
  var workspaceId = script.getAttribute('data-workspace');
  var position = script.getAttribute('data-position') || 'bottom-right';
  var text = script.getAttribute('data-text') || 'See what our customers say';
  var icon = script.getAttribute('data-icon') || 'star';
  var theme = script.getAttribute('data-theme') || 'light';

  // Load the floating widget script dynamically
  var scriptUrl = new URL(script.src);
  var origin = scriptUrl.origin;

  if (origin.includes('prooflayer.app') && !origin.includes('localhost')) {
    origin = 'https://www.prooflayer.app';
  }

  var floatingScript = document.createElement('script');
  floatingScript.src = origin + '/widget-floating.js';
  floatingScript.setAttribute('data-workspace', workspaceId);
  floatingScript.setAttribute('data-position', position);
  floatingScript.setAttribute('data-text', text);
  floatingScript.setAttribute('data-icon', icon);
  floatingScript.setAttribute('data-theme', theme);

  document.head.appendChild(floatingScript);
})();
