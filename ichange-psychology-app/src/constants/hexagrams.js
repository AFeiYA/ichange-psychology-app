export const HEXAGRAMS = [
  {
    id: 1,
    name: '乾 (Qian) - The Creative',
    description: 'Represents pure creative energy, initiative, and strength. It signifies a time of action and leadership.',
    image_placeholder: 'qian.png', // Placeholder image name
    suggestions: [
      'Embrace new beginnings and take initiative.',
      'Lead with confidence and determination.',
      'Stay focused on your goals.',
    ],
  },
  {
    id: 2,
    name: '坤 (Kun) - The Receptive',
    description: 'Represents receptivity, nourishment, and yielding. It signifies a time for patience, support, and following.',
    image_placeholder: 'kun.png',
    suggestions: [
      'Be open to receiving guidance and support.',
      'Nurture your projects and relationships.',
      'Practice patience and allow things to unfold naturally.',
    ],
  },
  {
    id: 3,
    name: '屯 (Zhun) - Difficulty at the Beginning',
    description: 'Represents initial difficulties, sprouting, and chaos before order. It signifies a challenging start that requires perseverance.',
    image_placeholder: 'zhun.png',
    suggestions: [
      'Acknowledge and navigate initial obstacles with care.',
      'Seek support and organize your resources.',
      'Persevere through challenges, growth is happening.',
    ],
  },
  // Add more hexagrams here... for now, we'll use these three for demonstration
  {
    id: 4,
    name: '蒙 (Meng) - Youthful Folly',
    description: 'Represents inexperience, immaturity, and the need for education. It signifies a time for learning and seeking guidance.',
    image_placeholder: 'meng.png',
    suggestions: [
      'Be open to learning from mistakes.',
      'Seek guidance from experienced mentors.',
      'Approach new situations with humility.',
    ],
  },
];

// Placeholder function to get a hexagram based on answers
// This needs to be replaced with a meaningful algorithm
export const mapAnswersToHexagram = (answers) => {
  if (!answers || answers.length === 0) {
    return HEXAGRAMS[0]; // Default to the first hexagram if no answers
  }
  // Example: simple logic based on the number of "yes" or "definitely" or "strongly" answers
  // This is a placeholder and should be replaced by a more complex mapping.
  let positiveAnswersCount = 0;
  answers.forEach(answer => {
    if (answer.answer === 'yes' || answer.answer === 'definitely' || answer.answer === 'strongly') {
      positiveAnswersCount++;
    }
  });

  if (positiveAnswersCount >= 2) {
    return HEXAGRAMS[0]; // The Creative
  } else if (positiveAnswersCount === 1) {
    return HEXAGRAMS[2]; // Difficulty at the Beginning
  } else {
    return HEXAGRAMS[1]; // The Receptive
  }
  // For a more robust solution, you might sum scores, use weighted answers,
  // or a more complex decision tree based on specific answer combinations.
  // Or, a simpler approach for now:
  // const randomIndex = Math.floor(Math.random() * HEXAGRAMS.length);
  // return HEXAGRAMS[randomIndex];
};
