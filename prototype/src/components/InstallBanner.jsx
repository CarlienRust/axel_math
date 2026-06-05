export function InstallBanner({ deferredPrompt, onInstall, onDismiss }) {
  if (!deferredPrompt) return null;
  return (
    <div className="install-banner">
      <span>Install on your phone — works without data after that.</span>
      <div style={{ display: 'flex', gap: 6 }}>
        <button type="button" onClick={onInstall}>
          Install
        </button>
        <button
          type="button"
          onClick={onDismiss}
          style={{ background: 'transparent', color: 'var(--primary)' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
