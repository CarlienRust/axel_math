import { GroupClusterColumn, GroupClusterRow } from './GroupCluster.jsx';

export function IntroExample({ example }) {
  if (!example) return null;

  switch (example.type) {
    case 'groups':
      return (
        <GroupClusterRow
          emoji={example.emoji}
          groupSize={example.groupSize}
          groups={example.groupsShown}
          labels={example.groupLabels}
        />
      );
    case 'groupRows':
      return (
        <GroupClusterColumn
          emoji={example.emoji}
          groupSize={example.groupSize}
          groups={example.groupsShown}
          labels={example.groupLabels}
          rowLabel={example.rowLabel}
        />
      );
    case 'numberLine':
      return (
        <div className="intro-example intro-example--numberline" role="img" aria-label={`${example.start} to ${example.end}`}>
          <span className="intro-example-num">{example.start}</span>
          <span className="intro-example-arrow">→</span>
          {example.steps?.map((n) => (
            <span key={n} className="intro-example-hop">
              {n}
            </span>
          ))}
          <span className="intro-example-arrow">→</span>
          <span className="intro-example-num intro-example-num--end">{example.end}</span>
        </div>
      );
    case 'compare':
      return (
        <div className="intro-example intro-example--compare" role="img" aria-label={`${example.left} ${example.symbol} ${example.right}`}>
          <span className="intro-compare-num">{example.leftLabel ?? example.left}</span>
          <span className={`intro-compare-symbol intro-compare-symbol--${example.symbol}`}>{example.symbol}</span>
          <span className="intro-compare-num">{example.rightLabel ?? example.right}</span>
          {example.caption && <p className="intro-example-caption">{example.caption}</p>}
        </div>
      );
    case 'bond':
      return (
        <div className="intro-example intro-example--bond" role="img" aria-label={`${example.a} and ${example.b} make ${example.sum}`}>
          <span className="intro-bond-part">{example.a}</span>
          <span className="intro-bond-plus">+</span>
          <span className="intro-bond-part">{example.b}</span>
          <span className="intro-bond-eq">=</span>
          <span className="intro-bond-sum">{example.sum}</span>
        </div>
      );
    case 'equation':
      return (
        <p className="intro-example intro-example--equation" role="img" aria-label={example.text}>
          {example.text}
        </p>
      );
    case 'pattern':
      return (
        <div className="intro-example intro-example--pattern" role="img" aria-label="Pattern">
          {example.items.map((item, i) => (
            <span key={i} className="intro-pattern-item">
              {item}
            </span>
          ))}
          {example.next && <span className="intro-pattern-next">?</span>}
        </div>
      );
    case 'placeValue':
      return (
        <div className="intro-example intro-example--pv" role="img" aria-label={`${example.tens} tens and ${example.ones} ones`}>
          <span className="intro-pv-block">
            <strong>{example.tens}</strong> tens
          </span>
          <span className="intro-pv-block">
            <strong>{example.ones}</strong> ones
          </span>
          <span className="intro-pv-eq">= {example.tens * 10 + example.ones}</span>
        </div>
      );
    case 'labels':
      return (
        <div className="intro-example intro-example--labels" role="img" aria-label={example.items.join(', ')}>
          {example.items.map((item) => (
            <span key={item} className="intro-label-chip">
              {item}
            </span>
          ))}
        </div>
      );
    case 'emojiRow':
      return (
        <div className="intro-example intro-example--emoji-row" role="img" aria-hidden>
          {example.items.map((item, i) => (
            <span key={i} className="intro-emoji-item">
              {item}
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
}
