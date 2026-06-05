import { useEffect, useId, useRef, useState } from 'react';
import { GradePicker } from './GradePicker.jsx';

export function HubMenu({ selectedGrade, onGradeChange, onSwitchLearner, onFeedback }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleSwitch = () => {
    setOpen(false);
    onSwitchLearner();
  };

  const handleFeedback = () => {
    setOpen(false);
    onFeedback?.();
  };

  const handleGradeSelect = (grade) => {
    onGradeChange?.(grade);
  };

  return (
    <div className={`hub-menu ${open ? 'hub-menu--open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="hub-menu-toggle"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="hub-menu-bars" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="sr-only">Menu</span>
      </button>
      {open && (
        <div id={menuId} className="hub-menu-dropdown" role="menu">
          <div className="hub-menu-section">
            <p className="hub-menu-section-label">Your grade</p>
            <GradePicker
              compact
              selectedGrade={selectedGrade}
              onSelect={handleGradeSelect}
            />
          </div>
          <div className="hub-menu-divider" role="separator" />
          <button type="button" className="hub-menu-item" role="menuitem" onClick={handleFeedback}>
            Give feedback
          </button>
          <button type="button" className="hub-menu-item" role="menuitem" onClick={handleSwitch}>
            Switch learner
          </button>
        </div>
      )}
    </div>
  );
}
