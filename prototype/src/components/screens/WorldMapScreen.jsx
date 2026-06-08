import { useState } from 'react';
import { AXEL_HOME_AVATAR_KEY, getAvatarSrc } from '../../data/avatars.js';
import { getGradeLabel, normalizeProfileGrade } from '../../data/grades.js';
import { getLessonById, PILOT_LESSONS } from '../../data/lessons/index.js';
import {
  getChunkLevelRange,
  getMapChunkCount,
  getMapChunkNodes,
  getMapNodeState,
  isMapNodeTappable,
} from '../../data/worldMap.js';
import { FeedbackDialog } from '../FeedbackDialog.jsx';
import { HubMenu } from '../HubMenu.jsx';
import { ReplayConfirmDialog } from '../ReplayConfirmDialog.jsx';
import { WorldMapCanvas } from '../WorldMapCanvas.jsx';

export function WorldMapScreen({
  profile,
  progressMap,
  activeChunk,
  onChunkChange,
  onStartLesson,
  onSwitchLearner,
  onGradeChange,
}) {
  const [replayPrompt, setReplayPrompt] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const chunkCount = getMapChunkCount();
  const avatarSrc = getAvatarSrc(AXEL_HOME_AVATAR_KEY);
  const completedCount = PILOT_LESSONS.filter((l) => progressMap[l.id]?.completed).length;
  const totalLevels = PILOT_LESSONS.length;
  const progressPct = totalLevels ? Math.round((completedCount / totalLevels) * 100) : 0;
  const { start: rangeStart, end: rangeEnd } = getChunkLevelRange(activeChunk);
  const chunkNodes = getMapChunkNodes(activeChunk);
  const grade = normalizeProfileGrade(profile);
  const gradeLabel = getGradeLabel(grade);

  const handleNodeClick = (node) => {
    const lesson = getLessonById(node.lessonId);
    if (!lesson || !isMapNodeTappable(node, progressMap)) return;

    const state = getMapNodeState(node, progressMap);
    if (state === 'done') {
      setReplayPrompt({
        lessonId: node.lessonId,
        placeName: node.name,
        lessonTitle: lesson.title,
      });
      return;
    }
    onStartLesson(node.lessonId, { replay: false });
  };

  return (
    <div className="screen world-map-screen">
      <header className="world-map-header">
        <img src={avatarSrc} alt="Axel" className="home-avatar" />
        <div className="world-map-header-text">
          <h1>Sawubona, {profile.nickname}!</h1>
          <p className="subtitle world-map-subtitle">Explore Axel&apos;s neighbourhood</p>
        </div>
        <HubMenu
          selectedGrade={grade}
          onGradeChange={onGradeChange}
          onSwitchLearner={onSwitchLearner}
          onFeedback={() => setFeedbackOpen(true)}
        />
      </header>

      <div className="world-map-meta lang-row">
        <span className="lang-pill lang-pill-mockup active world-map-grade-pill" aria-label={gradeLabel}>
          <span aria-hidden></span> {gradeLabel} · Term 1
        </span>
      </div>

      <div className="world-map-lang lang-row" role="group" aria-label="Language">
        <span className="lang-pill lang-pill-mockup active">
          <span aria-hidden>🌐</span> English
        </span>
        <span className="lang-pill lang-pill-mockup disabled">isiXhosa · soon</span>
        <span className="lang-pill lang-pill-mockup disabled">Afrikaans · soon</span>
      </div>

      <div className="world-map-chunk-label" aria-label="Map section">
        <span className="world-map-chunk-range">
          Levels {rangeStart}–{rangeEnd}
        </span>
        <span className="world-map-pager-dots">
          {Array.from({ length: chunkCount }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`world-map-dot ${i === activeChunk ? 'active' : ''}`}
              aria-label={`Show levels ${getChunkLevelRange(i).start} to ${getChunkLevelRange(i).end}`}
              aria-current={i === activeChunk ? 'true' : undefined}
              onClick={() => onChunkChange(i)}
            />
          ))}
        </span>
      </div>

      <div className="world-map-viewport">
        <div className="world-map">
          <button
            type="button"
            className="world-map-nav world-map-nav--prev"
            disabled={activeChunk <= 0}
            onClick={() => onChunkChange(activeChunk - 1)}
            aria-label="Previous levels"
          >
            ↑ Back
          </button>
          <button
            type="button"
            className="world-map-nav world-map-nav--next"
            disabled={activeChunk >= chunkCount - 1}
            onClick={() => onChunkChange(activeChunk + 1)}
            aria-label="Next levels"
          >
            Next ↓
          </button>
          <WorldMapCanvas
            key={activeChunk}
            chunkIndex={activeChunk}
            chunkNodes={chunkNodes}
            progressMap={progressMap}
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>

      <div className="map-progress-card map-progress-card--footer" aria-live="polite">
        <p className="map-progress-title">Your progress</p>
        <p className="map-progress-score">
          <span>{completedCount}</span> / {totalLevels} ⭐
        </p>
        <div className="map-progress-track">
          <div className="map-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <button
          type="button"
          className="map-feedback-link"
          onClick={() => setFeedbackOpen(true)}
        >
          <span aria-hidden>💬</span> Give feedback on this prototype
        </button>
      </div>

      <FeedbackDialog
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        profile={profile}
      />

      {replayPrompt && (
        <ReplayConfirmDialog
          placeName={replayPrompt.placeName}
          lessonTitle={replayPrompt.lessonTitle}
          onConfirm={() => {
            onStartLesson(replayPrompt.lessonId, { replay: true });
            setReplayPrompt(null);
          }}
          onCancel={() => setReplayPrompt(null)}
        />
      )}
    </div>
  );
}
