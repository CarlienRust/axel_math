/**
 * Visual cluster of items in a bordered group (e.g. 2 chappie packs = count in 2s).
 */
export function GroupCluster({ emoji, count, label, className = '' }) {
  return (
    <div className={`group-cluster ${className}`.trim()} aria-hidden={label ? undefined : true}>
      <div className="group-cluster-items">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="group-cluster-item">
            {emoji}
          </span>
        ))}
      </div>
      {label && <span className="group-cluster-label">{label}</span>}
    </div>
  );
}

export function GroupClusterRow({ emoji, groupSize, groups, labels }) {
  return (
    <div className="group-cluster-row" role="img" aria-label={`Groups of ${groupSize}`}>
      {Array.from({ length: groups }, (_, i) => (
        <GroupCluster
          key={i}
          emoji={emoji}
          count={groupSize}
          label={labels?.[i]}
        />
      ))}
    </div>
  );
}

/** Stacked rows (e.g. chairs in a school hall) */
export function GroupClusterColumn({ emoji, groupSize, groups, labels, rowLabel = 'Row' }) {
  return (
    <div className="group-cluster-column" role="img" aria-label={`${groups} rows of ${groupSize}`}>
      {Array.from({ length: groups }, (_, i) => (
        <div key={i} className="group-cluster-row-stack">
          <span className="group-cluster-row-name">
            {rowLabel} {i + 1}
          </span>
          <GroupCluster emoji={emoji} count={groupSize} label={labels?.[i]} />
        </div>
      ))}
    </div>
  );
}
