import { getLessonById } from './lessons/index.js';
import {
  buildPatternNextOptions,
  patternColorLabel,
  patternColorPhrase,
} from './patternColors.js';

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uniqueOptions(correct, pool, count = 4) {
  const opts = new Set([correct]);
  for (const n of shuffle(pool)) {
    if (opts.size >= count) break;
    if (n !== correct) opts.add(n);
  }
  while (opts.size < count) {
    const bump = correct + opts.size;
    if (bump > 0 && bump <= 24) opts.add(bump);
    else opts.add(Math.max(1, correct - opts.size));
  }
  return shuffle([...opts]);
}

function repeatEmoji(emoji, n) {
  return Array.from({ length: n }, () => emoji);
}

function buildVisualiseVariant(base, { prompt, subtitle, sceneVisual, narrationLine }) {
  if (!base.visualise) return {};
  return {
    visualise: {
      ...base.visualise,
      subtitle,
      prompt,
      sceneVisual: sceneVisual ?? base.visualise.sceneVisual,
    },
    narration: {
      ...base.narration,
      visualise: narrationLine ?? prompt,
    },
  };
}

function buildCountingGroups(base) {
  const groupSize = randInt(2, 3);
  const groups = randInt(3, 5);
  const target = groups * groupSize;
  const emoji = '🍬';
  const items = repeatEmoji(emoji, target);
  const wrongA = target - groupSize;
  const wrongB = target + groupSize;

  return {
    ...base,
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `Axel packs snacks in bags of ${groupSize}. He fills ${groups} bags for the spaza shelf. How many snacks does he pack altogether?`,
    },
    narration: {
      concrete: 'Tap each snack in the group to count them all.',
      pictorial: `Which picture shows ${target} snacks in groups of ${groupSize}?`,
      abstract: 'How many snacks are there altogether?',
    },
    concrete: {
      ...base.concrete,
      subtitle: `Sort into groups of ${groupSize}. Tap each pack to count all ${target}.`,
      items,
      groupSize,
      target,
      successLabel: `${target} packs!`,
    },
    pictorial: {
      ...base.pictorial,
      title: `Which shows ${target}?`,
      subtitle: `Pick the shelf with ${target} dots in groups of ${groupSize}.`,
      options: [
        { id: 'a', count: wrongA, correct: false },
        { id: 'b', count: target, correct: true },
        { id: 'c', count: wrongB, correct: false },
      ],
      feedbackCorrect: `Sharp! ${target} dots in groups of ${groupSize}.`,
      feedbackWrong: `Count the dots in ${groupSize}s — which group has ${target}?`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `${groups} groups of ${groupSize} snacks. Pick the total.`,
      visual: Array.from({ length: groups }, () => repeatEmoji(emoji, groupSize).join('')).join(' · '),
      options: uniqueOptions(target, [target - 2, target - 1, target + 1, target + 2, target + groupSize]),
      answer: target,
      feedbackCorrect: `Correct! ${groups} groups of ${groupSize} makes ${target}.`,
      feedbackWrong: `Count in groups of ${groupSize} again.`,
    },
    ...buildVisualiseVariant(base, {
      subtitle: `Picture ${groups} bags of ${groupSize} snacks on the shelf.`,
      prompt: `Close your eyes. See ${groups} groups of ${groupSize} snacks. Open when ready.`,
      sceneVisual: repeatEmoji(emoji, groupSize).join('') + ' …',
      narrationLine: `Close your eyes. See ${groups} groups of ${groupSize} snacks. Open when ready.`,
    }),
  };
}

function buildBondStep(anchor, targetSum) {
  const answer = targetSum - anchor;
  const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => n !== answer);
  return {
    anchor,
    options: uniqueOptions(answer, pool),
    answer,
    successText: `Yes! ${anchor} + ${answer} = ${targetSum}.`,
  };
}

function buildNumberBonds(base) {
  const targetSum = 10;
  const anchors = shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2);
  const steps = anchors.map((a) => buildBondStep(a, targetSum));
  const focus = steps[0];
  const pictorialA = focus.anchor;
  const pictorialB = focus.answer;

  return {
    ...base,
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `At the park, Zola has ${pictorialA} stickers. She gets ${pictorialB} more. How many? (Think: bonds of ${targetSum}.)`,
    },
    narration: {
      concrete: `Pick the number that partners with the anchor to make ${targetSum}.`,
      pictorial: `Which picture shows ${pictorialA} plus ${pictorialB} making ${targetSum}?`,
      abstract: `What is ${pictorialA} plus ${pictorialB}?`,
    },
    concrete: {
      ...base.concrete,
      targetSum,
      steps,
      successLabel: `Two bonds of ${targetSum}!`,
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Pick the picture with ${pictorialA} dots and ${pictorialB} dots.`,
      options: [
        { id: 'a', countA: pictorialA - 1, countB: pictorialB + 1, correct: false },
        { id: 'b', countA: pictorialA, countB: pictorialB, correct: true },
        { id: 'c', countA: pictorialA + 1, countB: pictorialB - 1, correct: false },
      ],
      feedbackCorrect: `Yes! ${pictorialA} and ${pictorialB} make ${targetSum}.`,
      feedbackWrong: `Look for ${pictorialA} on one side and ${pictorialB} on the other.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `What is ${pictorialA} + ${pictorialB}?`,
      equation: `${pictorialA} + ${pictorialB} = ?`,
      options: uniqueOptions(targetSum, [targetSum - 2, targetSum - 1, targetSum + 1, 8, 9]),
      answer: targetSum,
      feedbackCorrect: `Correct! ${pictorialA} + ${pictorialB} = ${targetSum}.`,
      feedbackWrong: `Think: ${pictorialA} needs a partner to make ${targetSum}.`,
    },
    ...buildVisualiseVariant(base, {
      subtitle: `Picture ${pictorialA} stickers and ${pictorialB} more making ${targetSum}.`,
      prompt: `Close your eyes. See ${pictorialA} stickers, then ${pictorialB} more. Open when ready.`,
      sceneVisual: `${pictorialA} + ${pictorialB}`,
      narrationLine: `Close your eyes. See ${pictorialA} stickers, then ${pictorialB} more. Open when ready.`,
    }),
  };
}

function buildAddition(base) {
  if (base.id === 'addition-within-50') {
    const a = randInt(11, 28);
    const b = randInt(10, Math.min(19, 48 - a));
    const sum = a + b;

    return {
      ...base,
      instanceKey: `${base.id}-replay-${Date.now()}`,
      isReplay: true,
      contextProblem: {
        ...base.contextProblem,
        prompt: `On the soccer field, Axel counts ${a} balls and finds ${b} more. How many altogether?`,
      },
      narration: {
        concrete: `What is ${a} plus ${b} soccer balls?`,
        pictorial: `Which picture shows ${a} and ${b} balls?`,
        abstract: `What is ${a} plus ${b}?`,
      },
      concrete: {
        ...base.concrete,
        type: 'addTensOnes',
        subtitle: `${a} balls (${Math.floor(a / 10)} tens, ${a % 10} ones) plus ${b} more (${Math.floor(b / 10)} tens, ${b % 10} ones). Put them together.`,
        a,
        b,
        groupA: {
          label: `${a} balls`,
          tens: Math.floor(a / 10),
          ones: a % 10,
          icon: '⚽',
        },
        groupB: {
          label: `${b} balls`,
          tens: Math.floor(b / 10),
          ones: b % 10,
          icon: '⚽',
        },
        answer: sum,
        options: uniqueOptions(sum, [sum - 2, sum - 1, sum + 1, sum + 2]),
        successText: `Yes! ${sum} soccer balls on the field.`,
        successLabel: `${sum} balls!`,
      },
      pictorial: {
        ...base.pictorial,
        title: `Which shows ${a} + ${b}?`,
        subtitle: `Pick the picture with ${a} and ${b} dots.`,
        options: [
          { id: 'a', countA: a - 1, countB: b, correct: false },
          { id: 'b', countA: a, countB: b, correct: true },
          { id: 'c', countA: a, countB: b - 1, correct: false },
        ],
        feedbackCorrect: `Yes! ${a} and ${b} together.`,
        feedbackWrong: `Look for ${a} and ${b}.`,
      },
      abstract: {
        ...base.abstract,
        subtitle: `What is ${a} + ${b}?`,
        equation: `${a} + ${b} = ?`,
        options: uniqueOptions(sum, [sum - 2, sum - 1, sum + 1, sum + 2]),
        answer: sum,
        feedbackCorrect: `Correct! ${sum} balls.`,
        feedbackWrong: 'Add tens, then ones.',
      },
      ...buildVisualiseVariant(base, {
        subtitle: 'Picture both piles of balls on the soccer field.',
        prompt: `Close your eyes. See ${a} soccer balls and ${b} more. Open when ready.`,
        sceneVisual: `${a} + ${b}`,
        narrationLine: `Close your eyes. See ${a} soccer balls and ${b} more. Open when ready.`,
      }),
    };
  }

  const a = randInt(4, 9);
  const b = randInt(3, Math.min(9, 20 - a));
  const sum = a + b;
  const emoji = '🧒';

  return {
    ...base,
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `At the park, ${a} friends sit on one bench and ${b} on another. How many friends altogether?`,
    },
    narration: {
      concrete: 'Tap every friend on both benches to count them together.',
      pictorial: `Which picture shows ${a} plus ${b}?`,
      abstract: `What is ${a} plus ${b}?`,
    },
    concrete: {
      ...base.concrete,
      subtitle: `${a} friends on one bench and ${b} on another. Tap every friend to count them all.`,
      groupA: { label: `${a} friends`, items: repeatEmoji(emoji, a) },
      groupB: { label: `${b} friends`, items: repeatEmoji(emoji, b) },
      target: sum,
      successLabel: `${sum} friends!`,
    },
    pictorial: {
      ...base.pictorial,
      title: `Which shows ${a} + ${b}?`,
      subtitle: `Pick the picture with ${a} dots and ${b} dots.`,
      options: [
        { id: 'a', countA: a - 1, countB: b, correct: false },
        { id: 'b', countA: a, countB: b, correct: true },
        { id: 'c', countA: a, countB: b - 1, correct: false },
      ],
      feedbackCorrect: `Yes! ${a} and ${b} together make ${sum}.`,
      feedbackWrong: `Look for ${a} on one side and ${b} on the other.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `What is ${a} + ${b}?`,
      equation: `${a} + ${b} = ?`,
      options: uniqueOptions(sum, [sum - 2, sum - 1, sum + 1, sum + 2]),
      answer: sum,
      feedbackCorrect: `Correct! ${a} + ${b} = ${sum}.`,
      feedbackWrong: `Count all ${sum} friends again.`,
    },
    ...buildVisualiseVariant(base, {
      subtitle: 'Picture both park benches before you count.',
      prompt: `Close your eyes. See ${a} friends on one bench and ${b} on another. Open when ready.`,
      sceneVisual: `${a} + ${b}`,
      narrationLine: `Close your eyes. See ${a} friends on one bench and ${b} on another. Open when ready.`,
    }),
  };
}

function buildSubtraction(base) {
  const startCount = randInt(10, 14);
  const removeCount = randInt(2, Math.min(5, startCount - 3));
  const remaining = startCount - removeCount;
  const isClassroom = base.id === 'subtraction-objects';
  const emoji = isClassroom ? '✏️' : '⚽';
  const itemName = isClassroom ? 'crayons' : 'soccer balls';
  const place = isClassroom ? 'class room tray' : 'soccer pitch';

  return {
    ...base,
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: isClassroom
        ? `There are ${startCount} crayons in the ${place}. The class uses ${removeCount}. How many are left?`
        : `At half-time, ${startCount} soccer balls are on the pitch. ${removeCount} roll away. How many left?`,
    },
    narration: {
      concrete: `Tap ${removeCount} ${itemName} to take away.`,
      pictorial: `Which picture shows ${remaining} ${itemName} left?`,
      abstract: `What is ${startCount} minus ${removeCount}?`,
    },
    concrete: {
      ...base.concrete,
      subtitle: isClassroom
        ? `There are ${startCount} crayons in the tray. Tap ${removeCount} the class uses.`
        : `${startCount} soccer balls on the pitch. Tap ${removeCount} that roll away.`,
      items: repeatEmoji(emoji, startCount),
      startCount,
      removeCount,
      successLabel: `${remaining} left!`,
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Pick the picture that shows ${remaining} ${itemName}.`,
      icon: emoji,
      options: [
        { id: 'a', count: remaining - 2, correct: false },
        { id: 'b', count: remaining, correct: true },
        { id: 'c', count: remaining + 2, correct: false },
      ],
      feedbackCorrect: `Yes! ${startCount} take away ${removeCount} leaves ${remaining}.`,
      feedbackWrong: `Count what is left after taking away ${removeCount}.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `What is ${startCount} − ${removeCount}?`,
      equation: `${startCount} − ${removeCount} = ?`,
      options: uniqueOptions(remaining, [remaining - 1, remaining + 1, removeCount, startCount]),
      answer: remaining,
      feedbackCorrect: `Correct! ${startCount} − ${removeCount} = ${remaining}.`,
      feedbackWrong: `Start at ${startCount} and count back ${removeCount}.`,
    },
    ...buildVisualiseVariant(base, {
      subtitle: isClassroom ? 'Picture the class room crayon tray.' : 'Picture the soccer match at half-time.',
      prompt: isClassroom
        ? `Close your eyes. See ${startCount} crayons. ${removeCount} are used. Open when ready.`
        : `Close your eyes. See ${startCount} soccer balls. ${removeCount} roll away. Open when ready.`,
      sceneVisual: `${startCount} − ${removeCount}`,
      narrationLine: isClassroom
        ? `Close your eyes. See ${startCount} crayons. ${removeCount} are used. Open when ready.`
        : `Close your eyes. See ${startCount} soccer balls. ${removeCount} roll away. Open when ready.`,
    }),
  };
}

function buildMultiplication(base) {
  const groups = randInt(3, 5);
  const perGroup = randInt(3, 5);
  const product = groups * perGroup;

  return {
    ...base,
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `The school hall has ${groups} rows of ${perGroup} chairs. How many chairs altogether?`,
    },
    narration: {
      concrete: `Tap every chair in all ${groups} rows to count them.`,
      pictorial: `Which picture shows ${groups} rows of ${perGroup} chairs?`,
      abstract: `What is ${groups} times ${perGroup}?`,
    },
    concrete: {
      ...base.concrete,
      subtitle: `Each row has ${perGroup} chairs. Tap every chair in ${groups} rows.`,
      groups,
      perGroup,
      icon: '🪑',
      groupLabel: 'Row',
      successLabel: `${product} chairs!`,
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Pick ${groups} rows with ${perGroup} dots in each row.`,
      icon: '🪑',
      options: [
        { id: 'a', groups: groups - 1, perGroup, correct: false },
        { id: 'b', groups, perGroup, correct: true },
        { id: 'c', groups, perGroup: perGroup - 1, correct: false },
      ],
      feedbackCorrect: `Yes! ${groups} rows of ${perGroup}.`,
      feedbackWrong: 'Count the rows and chairs in each row.',
    },
    abstract: {
      ...base.abstract,
      type: 'pickChoice',
      subtitle: `${groups} rows of ${perGroup} chairs. How many altogether?`,
      options: [
        {
          id: 'a',
          label: `${Array(groups).fill(perGroup).join(' + ')} = ${product}`,
          correct: true,
        },
        { id: 'b', label: `${groups} + ${perGroup} = ${groups + perGroup}`, correct: false },
        {
          id: 'c',
          label: `${Array(Math.max(2, groups - 1)).fill(perGroup).join(' + ')} = ${(groups - 1) * perGroup}`,
          correct: false,
        },
      ],
      feedbackCorrect: `Correct! ${groups} groups of ${perGroup} makes ${product} chairs.`,
      feedbackWrong: `Add ${perGroup} ${groups} times, or count all the chairs.`,
    },
    ...buildVisualiseVariant(base, {
      subtitle: 'Picture equal rows of chairs in the hall.',
      prompt: `Close your eyes. See ${groups} rows of ${perGroup} chairs in the school hall. Open when ready.`,
      sceneVisual: `${groups} × ${perGroup}`,
      narrationLine: `Close your eyes. See ${groups} rows of ${perGroup} chairs in the school hall. Open when ready.`,
    }),
  };
}

function buildBondsTo20(base) {
  const targetSum = 20;
  const anchors = shuffle([11, 12, 13, 14, 15, 16, 17]).slice(0, 2);
  const steps = anchors.map((a) => buildBondStep(a, targetSum));
  const focus = steps[0];
  const pictorialA = focus.anchor;
  const pictorialB = focus.answer;

  return {
    ...base,
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `At park games, Zola scores ${pictorialA} points and ${pictorialB} more. How many? (Bond of 20.)`,
    },
    narration: {
      concrete: 'Pick the partner to make twenty.',
      pictorial: `Which picture shows ${pictorialA} plus ${pictorialB}?`,
      abstract: `What is ${pictorialA} plus ${pictorialB}?`,
    },
    concrete: {
      ...base.concrete,
      targetSum,
      steps,
      successLabel: 'Two bonds of 20!',
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Pick ${pictorialA} dots and ${pictorialB} dots.`,
      options: [
        { id: 'a', countA: pictorialA - 1, countB: pictorialB, correct: false },
        { id: 'b', countA: pictorialA, countB: pictorialB, correct: true },
        { id: 'c', countA: pictorialA, countB: pictorialB + 1, correct: false },
      ],
      feedbackCorrect: `Yes! ${pictorialA} and ${pictorialB} make 20.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `What is ${pictorialA} + ${pictorialB}?`,
      equation: `${pictorialA} + ${pictorialB} = ?`,
      options: uniqueOptions(targetSum, [targetSum - 2, targetSum - 1, targetSum + 1, 19, 21]),
      answer: targetSum,
      feedbackCorrect: `Correct! ${pictorialA} + ${pictorialB} = 20.`,
    },
    ...buildVisualiseVariant(base, {
      subtitle: `See ${pictorialA} points and ${pictorialB} more to reach 20.`,
      prompt: `Close your eyes. See ${pictorialA} points, then ${pictorialB} more make 20. Open when ready.`,
      sceneVisual: `${pictorialA} + ${pictorialB}`,
      narrationLine: `Close your eyes. See ${pictorialA} points, then ${pictorialB} more make 20. Open when ready.`,
    }),
  };
}

function buildCountForwardsBack(base) {
  const start = randInt(18, 26);
  const steps = randInt(4, 7);
  const target = start + steps;

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `Axel restocks from ${start} to ${target}. What number does he reach?`,
    },
    narration: {
      concrete: `Tap each number as you count on from ${start}.`,
      pictorial: `Which jump lands on ${target}?`,
      abstract: 'What number do you land on?',
    },
    concrete: {
      ...base.concrete,
      subtitle: `Axel restocks shelves. Count on from ${start} to ${target}.`,
      start,
      steps,
      target,
      successLabel: `${target}!`,
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Pick the line that counts on to ${target}.`,
      options: [
        { id: 'a', start, end: target - 2, correct: false },
        { id: 'b', start, end: target, correct: true },
        { id: 'c', start: start - 4, end: target - 4, correct: false },
      ],
      feedbackCorrect: `Yes! ${start} to ${target}.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `Start at ${start}. Count on ${steps}.`,
      visual: `${start} + ${steps} = ?`,
      options: uniqueOptions(target, [target - 2, target - 1, target + 1, target + 2]),
      answer: target,
      feedbackCorrect: `Correct! You land on ${target}.`,
    },
    ...buildVisualiseVariant(base, {
      subtitle: 'See the number line jumps in your head.',
      prompt: `Close your eyes. Count on from ${start} to ${target}. Open when ready.`,
      sceneVisual: `${start} → ${target}`,
      narrationLine: `Close your eyes. Count on from ${start} to ${target}. Open when ready.`,
    }),
  };
}

function buildPatternCopy(base) {
  const patterns = [
    { a: '🔴', b: '🔵' },
    { a: '🟢', b: '🟡' },
  ];
  const pick = patterns[randInt(0, patterns.length - 1)];
  const pattern = [pick.a, pick.b, pick.a, pick.b];
  const colorPhrase = patternColorPhrase([pick.a, pick.b]);
  const nextOptions = buildPatternNextOptions(pick.a, pick.b);

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    concrete: {
      ...base.concrete,
      subtitle: `Tap tiles to copy ${colorPhrase} on the stall.`,
      pattern,
      tileChoices: [pick.a, pick.b],
    },
    pictorial: {
      ...base.pictorial,
      stem: pattern,
      subtitle: `${patternColorLabel(pick.a)}, ${patternColorLabel(pick.b)}, ${patternColorLabel(pick.a)}, ${patternColorLabel(pick.b)} — then?`,
      options: nextOptions,
      feedbackCorrect: `Yes! ${patternColorLabel(pick.a)} comes next.`,
      feedbackWrong: `The pattern repeats ${colorPhrase}.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `${pattern.join(' ')} ?`,
      options: nextOptions.map((opt) => ({
        id: opt.id,
        label: opt.next,
        correct: opt.correct,
      })),
      feedbackCorrect: `Correct! ${patternColorLabel(pick.a)} is next.`,
      feedbackWrong: `The pattern repeats ${colorPhrase}.`,
    },
  };
}

function buildPatternExtend(base) {
  const patterns = [
    { a: '⭐', b: '◯' },
    { a: '🔵', b: '🟧' },
  ];
  const pick = patterns[randInt(0, patterns.length - 1)];
  const pattern = [pick.a, pick.b, pick.a, pick.b];

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    concrete: {
      ...base.concrete,
      subtitle: `Copy ${pick.a} ${pick.b} ${pick.a} ${pick.b} on the clinic wall.`,
      pattern,
      tileChoices: [pick.a, pick.b],
    },
    pictorial: {
      ...base.pictorial,
      stem: pattern,
      subtitle: `${pattern.join(' ')} ?`,
      options: [
        { id: 'a', next: pick.b, correct: false },
        { id: 'b', next: pick.a, correct: true },
        { id: 'c', next: '△', correct: false },
      ],
      feedbackCorrect: `Yes! ${pick.a} comes next.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `${pattern.join(' ')} ?`,
      options: [
        { id: 'a', label: pick.b, correct: false },
        { id: 'b', label: pick.a, correct: true },
        { id: 'c', label: '■', correct: false },
      ],
    },
  };
}

function buildMoney(base) {
  const prices = [
    { id: 'r1', label: 'R1', item: 'a biscuit' },
    { id: 'r2', label: 'R2', item: 'a muffin' },
    { id: 'r5', label: 'R5', item: 'a sandwich' },
  ];
  const pick = prices[randInt(0, prices.length - 1)];

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `${pick.item.charAt(0).toUpperCase() + pick.item.slice(1)} at the cafe costs ${pick.label}. Which coin should Axel use?`,
    },
    concrete: {
      ...base.concrete,
      subtitle: `Axel buys ${pick.item} for ${pick.label}. Tap the right coin.`,
      answer: pick.id,
      successLabel: `${pick.label} coin!`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `${pick.item.charAt(0).toUpperCase() + pick.item.slice(1)} costs ${pick.label}. Pick the coin.`,
      options: [
        { id: 'a', label: '50c', correct: false },
        { id: 'b', label: pick.label, correct: true },
        { id: 'c', label: pick.id === 'r5' ? 'R2' : 'R5', correct: false },
      ],
      feedbackCorrect: `Correct! Use ${pick.label}.`,
    },
  };
}

function buildTimeDays(base) {
  const sequences = [
    { order: ['Mon', 'Tue', 'Wed'], display: ['Wed', 'Mon', 'Tue'], after: 'Tue', next: 'Wed', stem: ['Mon', 'Tue'] },
    { order: ['Tue', 'Wed', 'Thu'], display: ['Thu', 'Tue', 'Wed'], after: 'Wed', next: 'Thu', stem: ['Tue', 'Wed'] },
  ];
  const pick = sequences[randInt(0, sequences.length - 1)];

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    concrete: {
      ...base.concrete,
      subtitle: `Tap ${pick.order.join(', ')} in order on the school calendar.`,
      correctOrder: pick.order,
      display: pick.display,
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `${pick.stem.join(', ')}, ?`,
      stem: pick.stem,
      options: [
        { id: 'a', next: 'Sun', correct: false },
        { id: 'b', next: pick.next, correct: true },
        { id: 'c', next: 'Fri', correct: false },
      ],
      feedbackCorrect: `Yes! ${pick.next}.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `${pick.after} is done. Next school day is…`,
      options: [
        { id: 'a', label: pick.order[0], correct: false },
        { id: 'b', label: pick.next, correct: true },
        { id: 'c', label: 'Sunday', correct: false },
      ],
      feedbackCorrect: `Correct! ${pick.next}.`,
    },
  };
}

function buildShapesSort(base) {
  const triangleCount = randInt(2, 4);
  const shapes = [];
  for (let i = 0; i < triangleCount; i++) {
    shapes.push({ id: `t${i}`, kind: 'triangle', emoji: '△' });
  }
  shapes.push({ id: 's1', kind: 'square', emoji: '□' });
  shapes.push({ id: 'c1', kind: 'circle', emoji: '○' });
  if (triangleCount > 2) shapes.push({ id: 's2', kind: 'square', emoji: '□' });

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    abstract: {
      ...base.abstract,
      subtitle: `Count the triangle banners: ${repeatEmoji('△', triangleCount).join(' ')}`,
      visual: repeatEmoji('△', triangleCount).join(' '),
      options: uniqueOptions(triangleCount, [triangleCount - 1, triangleCount + 1, triangleCount + 2]),
      answer: triangleCount,
      feedbackCorrect: `Correct! ${triangleCount} triangles.`,
    },
  };
}

function buildGenericReplay(base) {
  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
  };
}

function buildPlaceValue(base) {
  const target = randInt(24, 58);
  const tens = Math.floor(target / 10);
  const ones = target % 10;
  const wrongTens = tens === 9 ? tens - 1 : tens + 1;

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `Axel counts R${target} at the spaza till using tens and ones. How is ${target} built?`,
    },
    narration: {
      ...base.narration,
      pictorial: `Which card shows ${tens} tens and ${ones} ones?`,
      abstract: `What number is ${tens} tens ${ones} ones?`,
    },
    visualise: {
      ...base.visualise,
      prompt: `Close your eyes. See ${tens} tens and ${ones} ones make R${target}. Open when ready.`,
      sceneVisual: String(target),
    },
    concrete: {
      ...base.concrete,
      subtitle: `Axel counts R${target} at the till: tens and ones.`,
      target,
      successLabel: `R${target} at the till!`,
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Pick ${tens} tens and ${ones} ones.`,
      options: [
        { id: 'a', tens, ones: ones === 0 ? 1 : ones - 1, correct: false },
        { id: 'b', tens, ones, correct: true },
        { id: 'c', tens: wrongTens, ones, correct: false },
      ],
      feedbackCorrect: `Yes! ${tens} tens and ${ones} ones is ${target}.`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `${tens} tens + ${ones} ones = ?`,
      visual: `${tens * 10} + ${ones} = ?`,
      options: uniqueOptions(target, [target - 10, target + 10, target - 1, target + 1]),
      answer: target,
      feedbackCorrect: `Correct! ${target}.`,
    },
  };
}

function buildCompareOrder(base) {
  const low = 23;
  const mid = 45;
  const high = 67;

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    concrete: {
      ...base.concrete,
      subtitle: `Tap R${low}, R${mid}, and R${high} from cheapest to priciest on the porch.`,
      values: shuffle([low, mid, high]),
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Which is true for R${mid} and R${high}?`,
      options: [
        { id: 'a', left: mid, symbol: '>', right: high, correct: false },
        { id: 'b', left: mid, symbol: '<', right: high, correct: true },
        { id: 'c', left: mid, symbol: '=', right: high, correct: false },
      ],
      feedbackCorrect: `Yes! R${mid} is less than R${high}.`,
      feedbackWrong: `Which price is bigger — R${mid} or R${high}?`,
    },
    abstract: {
      ...base.abstract,
      options: [
        { id: 'a', label: `R${low} > R${high}`, correct: false },
        { id: 'b', label: `R${high} > R${low}`, correct: true },
        { id: 'c', label: `R${low} = R${high}`, correct: false },
      ],
      feedbackCorrect: `Correct! R${high} costs more than R${low}.`,
      feedbackWrong: 'Compare the tens — which number is bigger?',
    },
  };
}

function buildDataFavouriteSnack(base) {
  const snacks = [
    { id: 'apple', emoji: '🍎', name: 'Apple' },
    { id: 'milk', emoji: '🥛', name: 'Milk' },
    { id: 'bread', emoji: '🍞', name: 'Bread' },
  ];
  const counts = shuffle([2, 3, 4, 5, 6]).slice(0, 3);
  const options = snacks.map((snack, i) => ({
    ...snack,
    count: counts[i],
    correct: false,
  }));
  const winner = options.reduce((best, opt) => (opt.count > best.count ? opt : best), options[0]);
  const fewest = options.reduce((low, opt) => (opt.count < low.count ? opt : low), options[0]);
  winner.correct = true;
  const chartTitle = 'School yard snack poll';

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    concrete: {
      ...base.concrete,
      chartTitle,
      options,
      answer: winner.id,
      feedbackCorrect: `Yes! ${winner.name} has the tallest bar — ${winner.count} votes.`,
      successLabel: `${winner.name} wins!`,
    },
    pictorial: (() => {
      const targetSnack = options[randInt(0, options.length - 1)];
      return {
        ...base.pictorial,
        chartTitle,
        options,
        subtitle: `Look at the chart. How many learners chose ${targetSnack.name.toLowerCase()}?`,
        snackName: targetSnack.name,
        answer: targetSnack.count,
        numberOptions: uniqueOptions(targetSnack.count, [1, 2, 3, 4, 5, 6, 7]),
      };
    })(),
    abstract: {
      ...base.abstract,
      chartTitle,
      options,
      choices: options.map((opt) => ({
        id: opt.id,
        label: opt.name,
        correct: opt.id === fewest.id,
      })),
      feedbackCorrect: `Correct! ${fewest.name} has the shortest bar — ${fewest.count} votes.`,
    },
  };
}

function buildTerm1Recap(base) {
  const a = randInt(4, 7);
  const b = 10 - a;
  const low = randInt(20, 45);
  const high = low + randInt(12, 30);

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      prompt: `${a} friends sit on one bench and ${b} on another. How many friends altogether?`,
      type: 'recap',
    },
    concrete: {
      ...base.concrete,
      subtitle: `${a} friends on one bench and ${b} on another. Tap every friend to count them all.`,
      groupA: {
        label: `${a} friends`,
        items: repeatEmoji('🧒', a),
      },
      groupB: {
        label: `${b} friends`,
        items: repeatEmoji('🧒', b),
      },
      target: 10,
      successLabel: 'Ten friends!',
    },
    pictorial: {
      ...base.pictorial,
      subtitle: `Which is true for R${low} and R${high} on the spaza porch?`,
      options: [
        { id: 'a', left: low, symbol: '>', right: high, correct: false },
        { id: 'b', left: low, symbol: '<', right: high, correct: true },
        { id: 'c', left: low, symbol: '=', right: high, correct: false },
      ],
      feedbackCorrect: `Yes! R${low} is less than R${high}.`,
    },
  };
}

function buildSkipCount(base) {
  const shelves = randInt(4, 7);
  const product = shelves * 2;

  return {
    ...structuredClone(base),
    instanceKey: `${base.id}-replay-${Date.now()}`,
    isReplay: true,
    contextProblem: {
      ...base.contextProblem,
      prompt: `${shelves} shelves in the stock room hold 2 chappie packs each. How many packs altogether?`,
    },
    concrete: {
      ...base.concrete,
      items: repeatEmoji('🍬', shelves * 2),
      groupSize: 2,
      subtitle: `Each group has 2 chappie packs. Tap the first pack in each group to count in 2s.`,
      successLabel: `${shelves} pairs!`,
    },
    abstract: {
      ...base.abstract,
      subtitle: `${shelves} shelves × 2 packs`,
      equation: `${shelves} × 2 = ?`,
      options: uniqueOptions(product, [product - 2, product - 1, product + 2]),
      answer: product,
      feedbackCorrect: `Correct! ${product} packs in the stock room.`,
    },
  };
}

const BUILDERS = {
  'counting-groups': buildCountingGroups,
  'number-bonds': buildNumberBonds,
  'addition-within-20': buildAddition,
  'subtraction-objects': buildSubtraction,
  'multiplication-grouping': buildMultiplication,
  'count-forwards-back': buildCountForwardsBack,
  'place-value-tens-ones': buildPlaceValue,
  'compare-order-to-99': buildCompareOrder,
  'bonds-to-20': buildBondsTo20,
  'addition-within-50': buildAddition,
  'subtraction-within-20': buildSubtraction,
  'pattern-copy-ab': buildPatternCopy,
  'pattern-extend': buildPatternExtend,
  'shapes-2d-sort': buildShapesSort,
  'shapes-2d-sides': buildGenericReplay,
  'money-coins-sa': buildMoney,
  'time-days-order': buildTimeDays,
  'data-favourite-snack': buildDataFavouriteSnack,
  'term1-recap': buildTerm1Recap,
  'skip-count-2-5-10': buildSkipCount,
};

/** Fresh numbers for the same lesson topic (practice replay). */
export function buildLessonVariant(lessonId) {
  const base = getLessonById(lessonId);
  if (!base) return null;
  const build = BUILDERS[lessonId];
  if (!build) return { ...base, instanceKey: `${lessonId}-replay-${Date.now()}`, isReplay: true };
  return build(structuredClone(base));
}
