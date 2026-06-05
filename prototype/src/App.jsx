import { useCallback, useEffect, useState } from 'react';
import { InstallBanner } from './components/InstallBanner.jsx';
import { ResumeLessonDialog } from './components/ResumeLessonDialog.jsx';
import { StatusBar } from './components/StatusBar.jsx';
import { LessonFlow } from './components/screens/LessonFlow.jsx';
import { OnboardingNickname } from './components/screens/OnboardingNickname.jsx';
import { RewardScreen } from './components/screens/RewardScreen.jsx';
import { WorldMapScreen } from './components/screens/WorldMapScreen.jsx';
import { AXEL_HOME_AVATAR_KEY } from './data/avatars.js';
import { DEFAULT_GRADE, normalizeProfileGrade } from './data/grades.js';
import { buildLessonVariant } from './data/lessonVariants.js';
import { getLessonById, getNextPlayableLesson, isLessonAccessible } from './data/lessons/index.js';
import { getLessonStageIds, getStageLabel, resolveCheckpointStageIndex } from './lib/lessonStages.js';
import { useOfflineStatus } from './hooks/useOfflineStatus.js';
import { startSession, trackLessonReplay } from './lib/analytics.js';
import {
  clearLessonCheckpoint,
  clearProfile,
  loadAppData,
  saveProfile,
  saveProgress,
} from './lib/db.js';

const ROUTES = {
  loading: 'loading',
  nickname: 'nickname',
  home: 'home',
  lesson: 'lesson',
  reward: 'reward',
};

export default function App() {
  const [route, setRoute] = useState(ROUTES.loading);
  const [profile, setProfile] = useState(null);
  const [progressMap, setProgressMap] = useState({});
  const [loadWarning, setLoadWarning] = useState(null);
  const [nicknameDraft, setNicknameDraft] = useState('');
  const [gradeDraft, setGradeDraft] = useState(DEFAULT_GRADE);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonCheckpoint, setLessonCheckpoint] = useState(null);
  const [isReplaySession, setIsReplaySession] = useState(false);
  const [resumePrompt, setResumePrompt] = useState(null);
  const [completedLesson, setCompletedLesson] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const { online, swReady } = useOfflineStatus();

  const refreshProgress = useCallback(async () => {
    const { progress } = await loadAppData();
    setProgressMap(progress);
  }, []);

  useEffect(() => {
    (async () => {
      const { profile: p, progress, progressLoadFailed } = await loadAppData();
      setProgressMap(progress);
      if (progressLoadFailed) {
        setLoadWarning('Some progress could not be loaded. Your map may be incomplete.');
      }
      if (p) {
        const normalized = { ...p, grade: normalizeProfileGrade(p) };
        if (normalized.grade !== p.grade) {
          await saveProfile(normalized);
        }
        setProfile(normalized);
        setRoute(ROUTES.home);
        startSession();
      } else {
        setRoute(ROUTES.nickname);
      }
    })();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const finishOnboarding = async (nickname) => {
    const saved = await saveProfile({
      nickname,
      grade: gradeDraft,
      avatarKey: AXEL_HOME_AVATAR_KEY,
      createdAt: Date.now(),
    });
    setProfile(saved);
    startSession();
    setRoute(ROUTES.home);
  };

  const handleGradeChange = async (grade) => {
    if (!profile || profile.grade === grade) return;
    const updated = await saveProfile({ ...profile, grade });
    setProfile(updated);
  };

  const beginLesson = (lesson, { replay = false, checkpoint = null } = {}) => {
    setActiveLesson(lesson);
    setIsReplaySession(replay);
    setLessonCheckpoint(checkpoint);
    setResumePrompt(null);
    setRoute(ROUTES.lesson);
  };

  const handleCheckpointSave = useCallback(async (checkpoint) => {
    if (!checkpoint?.lessonId) return;
    await saveProgress(checkpoint.lessonId, { checkpoint });
  }, []);

  const handleLessonComplete = async () => {
    const lesson = activeLesson;
    if (!lesson) return;

    if (isReplaySession) {
      setActiveLesson(null);
      setLessonCheckpoint(null);
      setIsReplaySession(false);
      setRoute(ROUTES.home);
      return;
    }

    await saveProgress(lesson.id, { completed: true, stars: 3 });
    await refreshProgress();
    setCompletedLesson(lesson);
    setActiveLesson(null);
    setLessonCheckpoint(null);
    setRoute(ROUTES.reward);
  };

  const handleStartLesson = async (lessonId, { replay = false } = {}) => {
    if (replay) {
      const lesson = buildLessonVariant(lessonId);
      if (!lesson?.concrete) return;
      trackLessonReplay(lessonId);
      beginLesson(lesson, { replay: true });
      return;
    }

    const lesson = getLessonById(lessonId);
    if (!lesson?.concrete) return;
    if (!isLessonAccessible(lesson, progressMap)) return;

    const saved = progressMap[lessonId];
    const cp = saved?.checkpoint;

    if (cp && saved?.completed) {
      await clearLessonCheckpoint(lessonId);
      await refreshProgress();
    } else if (cp && cp.stageIndex > 0) {
      const stageIds = getLessonStageIds(lesson);
      const idx = resolveCheckpointStageIndex(cp, stageIds);
      const stageId = stageIds[idx] ?? 'concrete';
      setResumePrompt({
        lesson,
        checkpoint: cp,
        stageLabel: getStageLabel(stageId),
      });
      return;
    }

    beginLesson(lesson, { replay: false });
  };

  const handleResumeContinue = () => {
    if (!resumePrompt) return;
    beginLesson(resumePrompt.lesson, {
      replay: false,
      checkpoint: resumePrompt.checkpoint,
    });
  };

  const handleResumeStartOver = async () => {
    if (!resumePrompt) return;
    const lessonId = resumePrompt.lesson.id;
    await clearLessonCheckpoint(lessonId);
    await refreshProgress();
    beginLesson(resumePrompt.lesson, { replay: false });
  };

  const handleSwitchLearner = async () => {
    await clearProfile();
    setProfile(null);
    setProgressMap({});
    setLoadWarning(null);
    setNicknameDraft('');
    setGradeDraft(DEFAULT_GRADE);
    setResumePrompt(null);
    setRoute(ROUTES.nickname);
  };

  const exitLesson = async () => {
    setActiveLesson(null);
    setLessonCheckpoint(null);
    setIsReplaySession(false);
    await refreshProgress();
    setRoute(ROUTES.home);
  };

  let content = null;

  if (route === ROUTES.loading) {
    content = (
      <div className="screen center-message">
        <p>Loading…</p>
      </div>
    );
  } else if (route === ROUTES.nickname) {
    content = (
      <OnboardingNickname
        value={nicknameDraft}
        onChange={setNicknameDraft}
        selectedGrade={gradeDraft}
        onGradeChange={setGradeDraft}
        onNext={(name) => finishOnboarding(name)}
      />
    );
  } else if (route === ROUTES.home && profile) {
    content = (
      <WorldMapScreen
        profile={profile}
        progressMap={progressMap}
        onStartLesson={handleStartLesson}
        onSwitchLearner={handleSwitchLearner}
        onGradeChange={handleGradeChange}
      />
    );
  } else if (route === ROUTES.lesson && activeLesson) {
    content = (
      <LessonFlow
        key={activeLesson.instanceKey ?? activeLesson.id}
        lesson={activeLesson}
        isReplay={isReplaySession}
        initialCheckpoint={lessonCheckpoint}
        onCheckpointSave={isReplaySession ? undefined : handleCheckpointSave}
        onComplete={handleLessonComplete}
        onExit={exitLesson}
      />
    );
  } else if (route === ROUTES.reward && completedLesson) {
    const nextPlayable = getNextPlayableLesson(progressMap, completedLesson.id);
    content = (
      <RewardScreen
        lesson={completedLesson}
        onHome={async () => {
          setCompletedLesson(null);
          await refreshProgress();
          setRoute(ROUTES.home);
        }}
        onNextLesson={
          nextPlayable
            ? () => {
                setCompletedLesson(null);
                handleStartLesson(nextPlayable.id, { replay: false });
              }
            : null
        }
        nextLessonTitle={nextPlayable?.title}
      />
    );
  }

  return (
    <div className="app-shell">
      <StatusBar online={online} swReady={swReady} />
      {loadWarning && (
        <p className="load-warning" role="status">
          {loadWarning}
        </p>
      )}
      {!bannerDismissed && (
        <InstallBanner
          deferredPrompt={deferredPrompt}
          onInstall={handleInstall}
          onDismiss={() => setBannerDismissed(true)}
        />
      )}
      {content}
      {resumePrompt && (
        <ResumeLessonDialog
          lessonTitle={resumePrompt.lesson.title}
          stageLabel={resumePrompt.stageLabel}
          onContinue={handleResumeContinue}
          onStartOver={handleResumeStartOver}
        />
      )}
    </div>
  );
}
