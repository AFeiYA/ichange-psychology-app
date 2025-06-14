import { Hexagram, Trigram } from '../types';

// 八卦基础数据
export const trigrams: Record<string, Trigram> = {
  '☰': { name: '乾', symbol: '☰', element: '金', nature: '刚健' },
  '☱': { name: '兑', symbol: '☱', element: '金', nature: '悦和' },
  '☲': { name: '离', symbol: '☲', element: '火', nature: '光明' },
  '☳': { name: '震', symbol: '☳', element: '木', nature: '震动' },
  '☴': { name: '巽', symbol: '☴', element: '木', nature: '顺从' },
  '☵': { name: '坎', symbol: '☵', element: '水', nature: '陷险' },
  '☶': { name: '艮', symbol: '☶', element: '土', nature: '静止' },
  '☷': { name: '坤', symbol: '☷', element: '土', nature: '柔顺' },
};

// 六十四卦数据（这里展示前8卦作为示例，完整版本需要64卦）
export const hexagrams: Hexagram[] = [
  {
    id: 1,
    name: '乾',
    chineseName: '乾为天',
    englishName: 'The Creative',
    symbol: '☰☰',
    upperTrigram: trigrams['☰'],
    lowerTrigram: trigrams['☰'],
    description: '乾：元，亨，利，贞。',
    interpretation: '代表积极向上的能量和创造力。在心理学上，象征着自信、领导力和主动性。适合需要突破和创新的时期。',
    advice: [
      '保持积极主动的态度',
      '发挥领导才能，承担责任',
      '制定长远计划并坚持执行',
      '相信自己的能力和判断'
    ],
    keywords: ['创造', '领导', '积极', '刚健', '进取'],
    emotionalState: [
      { category: 'hope', intensity: 5, description: '充满希望和动力' },
      { category: 'calm', intensity: 4, description: '内心坚定平静' }
    ]
  },
  {
    id: 2,
    name: '坤',
    chineseName: '坤为地',
    englishName: 'The Receptive',
    symbol: '☷☷',
    upperTrigram: trigrams['☷'],
    lowerTrigram: trigrams['☷'],
    description: '坤：元，亨，利牝马之贞。',
    interpretation: '代表包容和接纳的力量。在心理学上，象征着耐心、包容和稳定。适合需要休息调整和默默积累的时期。',
    advice: [
      '学会倾听和接纳他人意见',
      '保持耐心，等待时机成熟',
      '关注内在修养和品德培养',
      '以柔克刚，用包容化解冲突'
    ],
    keywords: ['包容', '耐心', '稳定', '柔顺', '厚德'],
    emotionalState: [
      { category: 'calm', intensity: 5, description: '内心平和安宁' },
      { category: 'anxiety', intensity: 1, description: '焦虑感很低' }
    ]
  },
  {
    id: 3,
    name: '屯',
    chineseName: '水雷屯',
    englishName: 'Difficulty at the Beginning',
    symbol: '☵☳',
    upperTrigram: trigrams['☵'],
    lowerTrigram: trigrams['☳'],
    description: '屯：元，亨，利，贞。勿用，有攸往，利建侯。',
    interpretation: '代表初始阶段的困难和挑战。在心理学上，象征着面对新开始时的不确定和焦虑，但蕴含着巨大的成长潜力。',
    advice: [
      '接受初期的困难是正常的',
      '寻求他人的帮助和支持',
      '制定明确的目标和计划',
      '保持耐心，一步步克服困难'
    ],
    keywords: ['困难', '开始', '成长', '坚持', '突破'],
    emotionalState: [
      { category: 'anxiety', intensity: 3, description: '面对困难的焦虑' },
      { category: 'hope', intensity: 3, description: '对未来的希望' }
    ]
  },
  {
    id: 4,
    name: '蒙',
    chineseName: '山水蒙',
    englishName: 'Youthful Folly',
    symbol: '☶☵',
    upperTrigram: trigrams['☶'],
    lowerTrigram: trigrams['☵'],
    description: '蒙：亨。匪我求童蒙，童蒙求我。',
    interpretation: '代表学习和启蒙的阶段。在心理学上，象征着对知识的渴求和对指导的需要，适合保持谦逊的学习态度。',
    advice: [
      '保持谦逊的学习态度',
      '主动寻求智者的指导',
      '通过实践来验证理论',
      '培养独立思考的能力'
    ],
    keywords: ['学习', '启蒙', '谦逊', '成长', '智慧'],
    emotionalState: [
      { category: 'confusion', intensity: 2, description: '学习中的困惑' },
      { category: 'hope', intensity: 4, description: '对获得知识的期待' }
    ]
  },
  {
    id: 5,
    name: '需',
    chineseName: '水天需',
    englishName: 'Waiting',
    symbol: '☵☰',
    upperTrigram: trigrams['☵'],
    lowerTrigram: trigrams['☰'],
    description: '需：有孚，光亨，贞吉。利涉大川。',
    interpretation: '代表等待的智慧。在心理学上，象征着耐心等待时机的重要性，以及在等待中保持内心的坚定和准备。',
    advice: [
      '保持耐心，等待合适的时机',
      '利用等待的时间充实自己',
      '相信时机成熟时会有好结果',
      '在等待中保持积极的心态'
    ],
    keywords: ['等待', '耐心', '时机', '准备', '信心'],
    emotionalState: [
      { category: 'calm', intensity: 4, description: '等待中的平静' },
      { category: 'anxiety', intensity: 2, description: '轻微的焦虑不安' }
    ]
  },
  {
    id: 6,
    name: '讼',
    chineseName: '天水讼',
    englishName: 'Conflict',
    symbol: '☰☵',
    upperTrigram: trigrams['☰'],
    lowerTrigram: trigrams['☵'],
    description: '讼：有孚，窒。惕中吉。终凶。利见大人，不利涉大川。',
    interpretation: '代表冲突和争执。在心理学上，象征着内在或外在的矛盾冲突，需要通过理性和智慧来化解。',
    advice: [
      '避免不必要的争执和冲突',
      '寻求公正客观的第三方调解',
      '反思自己在冲突中的责任',
      '以和为贵，寻求双赢的解决方案'
    ],
    keywords: ['冲突', '争执', '调解', '反思', '和解'],
    emotionalState: [
      { category: 'stress', intensity: 4, description: '冲突带来的压力' },
      { category: 'anxiety', intensity: 4, description: '对结果的担忧' }
    ]
  },
  {
    id: 7,
    name: '师',
    chineseName: '地水师',
    englishName: 'The Army',
    symbol: '☷☵',
    upperTrigram: trigrams['☷'],
    lowerTrigram: trigrams['☵'],
    description: '师：贞，丈人，吉无咎。',
    interpretation: '代表集体力量和领导能力。在心理学上，象征着团队合作的重要性和承担责任的勇气。',
    advice: [
      '发挥团队合作的力量',
      '承担起领导责任',
      '制定明确的行动策略',
      '以正义为准则，以德服人'
    ],
    keywords: ['团队', '领导', '责任', '策略', '正义'],
    emotionalState: [
      { category: 'hope', intensity: 4, description: '对成功的信心' },
      { category: 'stress', intensity: 3, description: '责任带来的压力' }
    ]
  },
  {
    id: 8,
    name: '比',
    chineseName: '水地比',
    englishName: 'Holding Together',
    symbol: '☵☷',
    upperTrigram: trigrams['☵'],
    lowerTrigram: trigrams['☷'],
    description: '比：吉。原筮元永贞，无咎。',
    interpretation: '代表团结和亲密关系。在心理学上，象征着人际关系的和谐和相互支持的重要性。',
    advice: [
      '珍惜身边的人际关系',
      '主动建立良好的社交网络',
      '在困难时寻求他人的支持',
      '也要适时给予他人帮助'
    ],
    keywords: ['团结', '友谊', '支持', '和谐', '互助'],
    emotionalState: [
      { category: 'calm', intensity: 4, description: '人际和谐的安全感' },
      { category: 'hope', intensity: 3, description: '对友谊的期待' }
    ]
  }
];

// 根据心理状态匹配卦象的权重算法
export const getHexagramByEmotionalState = (
  emotionalStates: { category: string; intensity: number }[]
): Hexagram[] => {
  const matches: { hexagram: Hexagram; score: number }[] = [];
  
  hexagrams.forEach(hexagram => {
    let score = 0;
    
    emotionalStates.forEach(userState => {
      hexagram.emotionalState.forEach(hexState => {
        if (hexState.category === userState.category) {
          // 计算匹配度分数
          const intensityDiff = Math.abs(hexState.intensity - userState.intensity);
          const matchScore = Math.max(0, 5 - intensityDiff) * 20; // 0-100分
          score += matchScore;
        }
      });
    });
    
    if (score > 0) {
      matches.push({ hexagram, score });
    }
  });
  
  // 按分数排序，返回最匹配的卦象
  return matches
    .sort((a, b) => b.score - a.score)
    .map(match => match.hexagram);
};
