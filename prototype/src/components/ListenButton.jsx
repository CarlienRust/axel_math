import { useCallback, useState } from 'react';

const NARRATION_TEXT = {
  'lesson.counting-groups.concrete':
    'Tap each snack in the group to count them all.',
  'lesson.counting-groups.pictorial':
    'Which picture shows eight snacks in groups of two?',
  'lesson.counting-groups.abstract': 'How many snacks are there altogether?',
  'lesson.number-bonds.concrete':
    'Pick the number that partners with the anchor to make ten.',
  'lesson.number-bonds.pictorial':
    'Which picture shows seven plus three making ten?',
  'lesson.number-bonds.abstract': 'What is seven plus three?',
  'lesson.addition-within-20.concrete':
    'Tap all the apples in both baskets to count them together.',
  'lesson.addition-within-20.pictorial': 'Which picture shows seven plus five?',
  'lesson.addition-within-20.abstract': 'What is seven plus five?',
  'lesson.subtraction-objects.concrete':
    'Tap five oranges to take them away from the shelf.',
  'lesson.subtraction-objects.pictorial': 'Which picture shows seven oranges left?',
  'lesson.subtraction-objects.abstract': 'What is twelve minus five?',
  'lesson.multiplication-grouping.concrete':
    'Tap every wheel on all five taxis to count them.',
  'lesson.multiplication-grouping.pictorial':
    'Which picture shows five groups of four wheels?',
  'lesson.multiplication-grouping.abstract': 'What is five times four?',
};

export function ListenButton({ text, narrationKey, className = '' }) {
  const [playing, setPlaying] = useState(false);
  const line = text ?? (narrationKey ? NARRATION_TEXT[narrationKey] : null);

  const speak = useCallback(() => {
    if (!line) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(line);
    utter.lang = 'en-ZA';
    utter.rate = 0.9;
    setPlaying(true);
    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utter);
  }, [line]);

  if (!line) return null;

  return (
    <button
      type="button"
      className={`listen-btn ${className}`.trim()}
      onClick={speak}
      disabled={playing}
    >
      {playing ? '🔊 Playing…' : '🔊 Listen'}
    </button>
  );
}
