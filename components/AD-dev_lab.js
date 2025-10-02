/* devlab-ad.component.js 
   Plain JS version — include with: <script src="devlab-ad.component.js"></script>
   Then call: window.createDevLabAd({ url: 'https://...', persistClosed: true });
*/

(function (global) {
  function createDevLabAd(userOptions = {}) {
    const defaults = {
      url: 'https://toniestarlich.github.io/dev-live/dev_lab/templates/intro.html',
      width: 260,
      smallWidth: 190,
      title: 'DEV LAB',
      subtitle: 'Full-stack memory map',
      description: 'Quick references for Database → Backend → Frontend → Testing',
      badgeText: 'DL',
      persistClosed: false,
      autoHideAfter: 0
    };
    const opts = { ...defaults, ...userOptions };

    // Prevent multiple instances
    if (document.getElementById('devlab-ad-root')) {
      return document.getElementById('devlab-ad-root');
    }

    const closedKey = 'devlab-ad-closed-v1';
    if (opts.persistClosed && localStorage.getItem(closedKey) === '1') return null;

    // Create and inject styles
    const style = document.createElement('style');
    style.id = 'devlab-ad-styles';
    style.textContent = `
#devlab-ad-root.dev-ad {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: ${opts.width}px;
  max-width: calc(100% - 40px);
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  transform: translateY(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  backdrop-filter: blur(8px) saturate(1.02);
  -webkit-backdrop-filter: blur(8px) saturate(1.02);
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  animation: slideIn 900ms cubic-bezier(.22,.9,.36,1) forwards, float 4s ease-in-out 900ms infinite;
  text-decoration: none;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(18px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes float {
  0%, 100% { transform: translateY(6px); }
  50% { transform: translateY(-6px); }
}
#devlab-ad-root .logo-wrap {
  width: 56px;
  height: 56px;
  min-width: 56px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}
#devlab-ad-root .badge {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg,#2e2e2e,#1a1a1a);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 18px rgba(0,0,0,0.6);
  color: #d9d9d9;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: .6px;
  position: relative;
}
#devlab-ad-root .ring {
  position: absolute;
  right: -6px;
  top: -6px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid rgba(26, 26, 26, 0.12);
  transform-origin: center;
  animation: spin 3.8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
#devlab-ad-root .content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
#devlab-ad-root .title { font-size: 15px; font-weight: 700; color: #494949ff; }
#devlab-ad-root .tag { font-size: 12px; color: #444444ff; opacity: .95; }
#devlab-ad-root .sub { font-size: 11px; color: #5a5959ff; opacity: .85; }
#devlab-ad-root .cta-row { display: flex; gap: 8px; align-items: center; margin-top: 6px; }
#devlab-ad-root .cta {
  background: transparent;
  border: 1px solid rgba(220,220,220,0.2);
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 12px;
  color: #5a5a5aff;
  text-decoration: none;
  display: inline-block;
}
#devlab-ad-root .close-btn {
  background: transparent;
  border: 0;
  color: #999;
  font-size: 14px;
  margin-left: 6px;
  cursor: pointer;
}
#devlab-ad-root .badge::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  box-shadow: 0 0 18px rgba(31, 31, 31, 0.08);
  pointer-events: none;
  animation: pulse 2.6s ease-in-out infinite;
}
@keyframes pulse {
  0% { transform: scale(.98); opacity:.55; }
  50% { transform: scale(1.06); opacity:.95; }
  100% { transform: scale(.98); opacity:.55; }
}
#devlab-ad-root[aria-hidden="true"] { transform: translateY(20px) scale(.98); opacity: 0; pointer-events: none; }
@media (max-width:420px) {
  #devlab-ad-root.dev-ad { width: ${opts.smallWidth}px; right:12px; bottom:12px; padding:8px; }
  #devlab-ad-root .title { font-size: 13px; }
  #devlab-ad-root .badge { font-size: 13px; }
}`;
    document.head.appendChild(style);

    // Create ad element
    const anchor = document.createElement('a');
    anchor.id = 'devlab-ad-root';
    anchor.className = 'dev-ad';
    anchor.href = opts.url;

    anchor.innerHTML = `
<div class="logo-wrap">
  <div class="badge">${escapeHtml(opts.badgeText)}</div>
  <span class="ring"></span>
</div>
<div class="content">
  <strong style="color:rgb(255, 65, 65); font-size: 80%; margin-bottom: 5px;">Now:</strong>
  <div class="title">${escapeHtml(opts.title)}</div>
  <div class="tag">${escapeHtml(opts.subtitle)}</div>
  <div class="sub">${escapeHtml(opts.description)}</div>
  <div class="cta-row">
    <span class="cta">Open guide</span>
    <button type="button" class="close-btn" id="devlab-close">✕</button>
  </div>
</div>
`;

    document.body.appendChild(anchor);

     // Close button
    const closeBtn = document.getElementById('devlab-close');
    closeBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      hideAd(true);
    });

    function hideAd(persist) {
      anchor.setAttribute('aria-hidden', 'true');
      setTimeout(() => anchor.style.display = 'none', 360);
    }

    return anchor;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  global.createDevLabAd = createDevLabAd;
})(window);

// Example usage
createDevLabAd({
  url: 'https://toniestarlich.github.io/dev-live/dev_lab/templates/intro.html',
  title: 'DEV LAB',
  subtitle: 'Full-stack memory map',
  description: 'Quick references for Database → Backend → Frontend → Testing',
  badgeText: 'DL'
});
