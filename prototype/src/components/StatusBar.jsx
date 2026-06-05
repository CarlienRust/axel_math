export function StatusBar({ online, swReady }) {
  return (
    <div className="status-bar">
      <span>AXEL · Pilot</span>
      <span className={`pill ${online ? 'pill-online' : 'pill-offline'}`}>
        {swReady ? (online ? '● Cached · online' : '● Offline ready') : '● Loading cache…'}
      </span>
    </div>
  );
}
