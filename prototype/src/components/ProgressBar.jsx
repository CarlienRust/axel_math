export function ProgressBar({ percent }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
