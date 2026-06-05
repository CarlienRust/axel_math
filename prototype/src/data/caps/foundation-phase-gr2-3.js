/**
 * CAPS Foundation Phase Mathematics (Grades 1–3) — Grade 2–3 numeracy spine.
 * Source: docs/CAPS MATHS  ENGLISH GR 1-3 FS.pdf (DBE CAPS, Section 3).
 */

export const CAPS_CONTENT_WEIGHTS = {
  grade2: {
    numbers: 60,
    patterns: 10,
    spaceShape: 13,
    measurement: 12,
    dataHandling: 5,
  },
  grade3: {
    numbers: 58,
    patterns: 10,
    spaceShape: 13,
    measurement: 14,
    dataHandling: 5,
  },
};

/** Key Numbers strand topics referenced by the pilot */
export const CAPS_TOPICS = {
  '1.1': {
    title: 'Count objects',
    strand: 'Numbers, Operations and relationships',
    summary: 'Count reliably; grouping encouraged (Gr 2: to 200).',
  },
  '1.2': {
    title: 'Count forwards and backwards',
    strand: 'Numbers, Operations and relationships',
    summary: 'Skip count in 1s, 2s, 5s, 10s within grade range.',
  },
  '1.5': {
    title: 'Place value',
    strand: 'Numbers, Operations and relationships',
    summary: 'Decompose two-digit numbers (Gr 2: to 99).',
  },
  '1.7': {
    title: 'Addition and subtraction — problems in context',
    strand: 'Numbers, Operations and relationships',
    summary: 'Word problems with explain-your-solution (Gr 2: to 99).',
  },
  '1.12': {
    title: 'Calculation techniques',
    strand: 'Numbers, Operations and relationships',
    summary: 'Counters, pictures, building up/breaking down, number lines.',
  },
  '1.13': {
    title: 'Addition and subtraction',
    strand: 'Numbers, Operations and relationships',
    summary: 'Gr 2: add/sub to 99; bonds to 20; symbols +, −, =.',
  },
  '1.14': {
    title: 'Repeated addition leading to multiplication',
    strand: 'Numbers, Operations and relationships',
    summary: 'Gr 2: repeated addition to 20; ×2 (T1), then ×5, ×3, ×4.',
  },
  '1.16': {
    title: 'Mental mathematics',
    strand: 'Numbers, Operations and relationships',
    summary: 'Recall facts to 20; compare and order within range.',
  },
};

export const LESSON_CAPS_MAP = {
  'counting-groups': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.1', '1.2', '1.12'],
    capsOutcomes: [
      'Count a collection of objects using grouping (e.g. groups of 2).',
      'Relate grouped objects to a total number.',
      'Use concrete objects before symbols (CPA).',
    ],
    prerequisiteLessonIds: [],
    contextProblem: {
      prompt:
        'Axel packs snacks in bags of 2. He fills 4 bags for the spaza shelf. How many snacks does he pack altogether?',
      type: 'grouping',
    },
  },
  'addition-within-20': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.7', '1.13', '1.12'],
    capsOutcomes: [
      'Combine two groups to find a total (combine problem type).',
      'Add within 20 using objects, then symbols.',
      'Use + and = correctly in a number sentence.',
    ],
    prerequisiteLessonIds: ['bonds-to-20'],
    contextProblem: {
      prompt:
        'At the park, 7 friends sit on one bench and 5 on another. How many friends altogether?',
      type: 'combine',
    },
  },
  'number-bonds': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.13', '1.16'],
    capsOutcomes: [
      'Recall number bonds to 10 and 15 (Term 1), progressing to 20.',
      'Use bonds to add and subtract efficiently.',
    ],
    prerequisiteLessonIds: ['compare-order-to-99'],
    contextProblem: {
      prompt:
        'At the park, Zola has 7 stickers. She gets 3 more. How many? (Think: bonds of 10.)',
      type: 'change',
    },
  },
  'subtraction-objects': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.7', '1.13', '1.12'],
    capsOutcomes: [
      'Subtract using concrete objects and pictures.',
      'Solve simple take-away problems in context.',
    ],
    prerequisiteLessonIds: ['data-favourite-snack'],
    contextProblem: {
      prompt:
        'There are 12 crayons in the class room tray. The class uses 5. How many are left?',
      type: 'change',
    },
  },
  'count-forwards-back': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.2', '1.16'],
    capsOutcomes: ['Count forwards on a number line.', 'Land on the correct number after counting on.'],
    prerequisiteLessonIds: ['counting-groups'],
    contextProblem: {
      prompt: 'Axel restocks from 24 to 30. What number does he reach?',
      type: 'count_on',
    },
  },
  'skip-count-2-5-10': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.2'],
    capsOutcomes: ['Skip count in 2s within 20.', 'Relate skip counting to equal groups.'],
    prerequisiteLessonIds: ['count-forwards-back'],
    contextProblem: {
      prompt: 'Six shelves in the stock room hold 2 chappie packs each. How many packs altogether?',
      type: 'skip_count',
    },
  },
  'place-value-tens-ones': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.5', '1.12'],
    capsOutcomes: ['Build two-digit numbers with tens and ones.', 'Read numbers to 99.'],
    prerequisiteLessonIds: ['skip-count-2-5-10'],
    contextProblem: {
      prompt: 'Axel counts R47 at the spaza till using tens and ones. How is 47 built?',
      type: 'place_value',
    },
  },
  'compare-order-to-99': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.16'],
    capsOutcomes: ['Compare two numbers using <, >, =.', 'Order numbers from least to greatest.'],
    prerequisiteLessonIds: ['place-value-tens-ones'],
    contextProblem: {
      prompt: 'On the spaza porch, which drink costs more: R23 or R67?',
      type: 'compare',
    },
  },
  'bonds-to-20': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.13', '1.16'],
    capsOutcomes: ['Recall bonds to 20.', 'Use bonds to add efficiently.'],
    prerequisiteLessonIds: ['number-bonds'],
    contextProblem: {
      prompt: 'At park games, Zola scores 13 points and 7 more. How many? (Bond of 20.)',
      type: 'change',
    },
  },
  'addition-within-50': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.7', '1.13'],
    capsOutcomes: ['Add two two-digit numbers without regrouping.', 'Solve combine problems in context.'],
    prerequisiteLessonIds: ['addition-within-20'],
    contextProblem: {
      prompt: 'On the soccer field, Axel counts 23 balls and finds 14 more. How many altogether?',
      type: 'combine',
    },
  },
  'subtraction-within-20': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.7', '1.13'],
    capsOutcomes: ['Subtract within 20 using objects.', 'Solve take-away problems.'],
    prerequisiteLessonIds: ['addition-within-50'],
    contextProblem: {
      prompt: 'At half-time, 18 soccer balls are on the pitch. 5 roll away. How many left?',
      type: 'change',
    },
  },
  'pattern-copy-ab': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['2.1'],
    capsOutcomes: ['Copy and extend simple repeating patterns.'],
    prerequisiteLessonIds: ['subtraction-within-20'],
    contextProblem: {
      prompt: 'Decorate the Big Market stall with a red-blue tile pattern.',
      type: 'pattern',
    },
  },
  'pattern-extend': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['2.1'],
    capsOutcomes: ['Predict the next element in a pattern.'],
    prerequisiteLessonIds: ['pattern-copy-ab'],
    contextProblem: {
      prompt: 'What shape comes next on the clinic waiting-room wall?',
      type: 'pattern',
    },
  },
  'shapes-2d-sort': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['3.1'],
    capsOutcomes: ['Sort 2D shapes by appearance.', 'Identify triangles among mixed shapes.'],
    prerequisiteLessonIds: ['pattern-extend'],
    contextProblem: {
      prompt: 'Sort the triangle banners from the Community Hall decorations.',
      type: 'sort',
    },
  },
  'shapes-2d-sides': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['3.1'],
    capsOutcomes: ['Count sides and corners of 2D shapes.'],
    prerequisiteLessonIds: ['shapes-2d-sort'],
    contextProblem: {
      prompt: 'How many sides does a triangle sign at the taxi rank have?',
      type: 'properties',
    },
  },
  'money-coins-sa': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['4.1'],
    capsOutcomes: ['Recognise SA coins.', 'Compare coin values.'],
    prerequisiteLessonIds: ['shapes-2d-sides'],
    contextProblem: {
      prompt: 'A muffin at the cafe costs R2. Which coin should Axel use?',
      type: 'money',
    },
  },
  'time-days-order': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['4.2'],
    capsOutcomes: ['Order days of the week.', 'Name the day after a given day.'],
    prerequisiteLessonIds: ['money-coins-sa'],
    contextProblem: {
      prompt: 'School days are Mon, Tue, Wed. What comes after Tuesday?',
      type: 'time',
    },
  },
  'data-favourite-snack': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['5.1'],
    capsOutcomes: ['Read a simple pictograph.', 'Identify the category with the most.'],
    prerequisiteLessonIds: ['time-days-order'],
    contextProblem: {
      prompt: 'Which snack is most popular in the school yard poll?',
      type: 'data',
    },
  },
  'multiplication-grouping': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.14', '1.12'],
    capsOutcomes: [
      'Add the same number repeatedly (repeated addition).',
      'Recognise equal groups in context (school hall rows).',
    ],
    prerequisiteLessonIds: ['subtraction-objects'],
    contextProblem: {
      prompt:
        'The school hall has 5 rows of 4 chairs. How many chairs altogether? (Count in equal groups.)',
      type: 'repeated_addition',
    },
  },
  'term1-recap': {
    capsGrade: 2,
    capsTerm: 1,
    capsTopics: ['1.7', '1.13', '1.16', '5.1'],
    capsOutcomes: [
      'Recall bonds and addition from Term 1.',
      'Compare numbers in context.',
      'Read a pictograph to find the most popular category.',
    ],
    prerequisiteLessonIds: ['multiplication-grouping'],
    contextProblem: {
      prompt: 'Axel finishes Term 1 with a quick recap quiz at school.',
      type: 'recap',
    },
  },
};

export function getLessonCapsRef(lessonId) {
  return LESSON_CAPS_MAP[lessonId] ?? null;
}

export function formatCapsTopicLabels(topicIds) {
  return topicIds.map((id) => `CAPS ${id}`).join(', ');
}
