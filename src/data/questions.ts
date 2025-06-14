import { Question, HexagramMapping } from '../types';

// 心理测评问卷数据
export const psychologyQuestions: Question[] = [
  {
    id: 'mood_1',
    type: 'multiple-choice',
    category: 'emotion',
    question: '最近一周，您的整体心情如何？',
    options: [
      '非常积极乐观',
      '比较开心愉悦',
      '平静平和',
      '有些低落担忧',
      '很沮丧焦虑'
    ],
    weight: 0.8,
    hexagramMapping: [
      { hexagramId: 1, conditions: [{ answerValue: '非常积极乐观', operator: 'equals' }], weight: 0.9 },
      { hexagramId: 2, conditions: [{ answerValue: '平静平和', operator: 'equals' }], weight: 0.8 },
      { hexagramId: 3, conditions: [{ answerValue: '有些低落担忧', operator: 'equals' }], weight: 0.7 },
    ]
  },
  {
    id: 'stress_1',
    type: 'scale',
    category: 'stress',
    question: '请评估您当前的压力水平（1=完全没有压力，5=压力很大）',
    scale: {
      min: 1,
      max: 5,
      minLabel: '完全没有压力',
      maxLabel: '压力很大'
    },
    weight: 0.7,
    hexagramMapping: [
      { hexagramId: 2, conditions: [{ answerValue: 1, operator: 'equals' }], weight: 0.8 },
      { hexagramId: 2, conditions: [{ answerValue: 2, operator: 'equals' }], weight: 0.6 },
      { hexagramId: 6, conditions: [{ answerValue: 4, operator: 'equals' }], weight: 0.7 },
      { hexagramId: 6, conditions: [{ answerValue: 5, operator: 'equals' }], weight: 0.9 },
    ]
  },
  {
    id: 'confusion_1',
    type: 'multiple-choice',
    category: 'life-goal',
    question: '关于未来的方向，您目前的状态是？',
    options: [
      '目标清晰，方向明确',
      '大致有方向，但细节不清',
      '有些迷茫，不太确定',
      '很困惑，不知道该怎么办',
      '完全迷失方向'
    ],
    weight: 0.9,
    hexagramMapping: [
      { hexagramId: 1, conditions: [{ answerValue: '目标清晰，方向明确', operator: 'equals' }], weight: 0.9 },
      { hexagramId: 4, conditions: [{ answerValue: '大致有方向，但细节不清', operator: 'equals' }], weight: 0.7 },
      { hexagramId: 4, conditions: [{ answerValue: '有些迷茫，不太确定', operator: 'equals' }], weight: 0.8 },
      { hexagramId: 3, conditions: [{ answerValue: '很困惑，不知道该怎么办', operator: 'equals' }], weight: 0.8 },
    ]
  },
  {
    id: 'relationship_1',
    type: 'multiple-choice',
    category: 'relationship',
    question: '您与身边重要的人（家人、朋友、同事）的关系如何？',
    options: [
      '非常和谐融洽',
      '总体良好，偶有小摩擦',
      '一般般，不亲不疏',
      '有些紧张和冲突',
      '关系很糟糕，经常争吵'
    ],
    weight: 0.6,
    hexagramMapping: [
      { hexagramId: 8, conditions: [{ answerValue: '非常和谐融洽', operator: 'equals' }], weight: 0.9 },
      { hexagramId: 8, conditions: [{ answerValue: '总体良好，偶有小摩擦', operator: 'equals' }], weight: 0.6 },
      { hexagramId: 6, conditions: [{ answerValue: '有些紧张和冲突', operator: 'equals' }], weight: 0.7 },
      { hexagramId: 6, conditions: [{ answerValue: '关系很糟糕，经常争吵', operator: 'equals' }], weight: 0.9 },
    ]
  },
  {
    id: 'career_1',
    type: 'multiple-choice',
    category: 'career',
    question: '对于当前的工作或学习状态，您的感受是？',
    options: [
      '很满意，充满动力',
      '基本满意，还算顺利',
      '一般般，缺乏激情',
      '不太满意，感到困顿',
      '很不满意，想要改变'
    ],
    weight: 0.7,
    hexagramMapping: [
      { hexagramId: 1, conditions: [{ answerValue: '很满意，充满动力', operator: 'equals' }], weight: 0.8 },
      { hexagramId: 7, conditions: [{ answerValue: '基本满意，还算顺利', operator: 'equals' }], weight: 0.6 },
      { hexagramId: 5, conditions: [{ answerValue: '一般般，缺乏激情', operator: 'equals' }], weight: 0.7 },
      { hexagramId: 3, conditions: [{ answerValue: '不太满意，感到困顿', operator: 'equals' }], weight: 0.8 },
    ]
  },
  {
    id: 'energy_1',
    type: 'scale',
    category: 'emotion',
    question: '您最近的精力和活力水平如何？（1=精疲力竭，5=精力充沛）',
    scale: {
      min: 1,
      max: 5,
      minLabel: '精疲力竭',
      maxLabel: '精力充沛'
    },
    weight: 0.6,
    hexagramMapping: [
      { hexagramId: 1, conditions: [{ answerValue: 5, operator: 'equals' }], weight: 0.8 },
      { hexagramId: 1, conditions: [{ answerValue: 4, operator: 'equals' }], weight: 0.6 },
      { hexagramId: 2, conditions: [{ answerValue: 3, operator: 'equals' }], weight: 0.5 },
      { hexagramId: 5, conditions: [{ answerValue: 2, operator: 'equals' }], weight: 0.6 },
      { hexagramId: 3, conditions: [{ answerValue: 1, operator: 'equals' }], weight: 0.7 },
    ]
  },
  {
    id: 'decision_1',
    type: 'multiple-choice',
    category: 'life-goal',
    question: '面对重要决策时，您通常的状态是？',
    options: [
      '果断决定，很少后悔',
      '深思熟虑后决定',
      '需要一些时间考虑',
      '经常犹豫不决',
      '很难做出决定'
    ],
    weight: 0.8,
    hexagramMapping: [
      { hexagramId: 1, conditions: [{ answerValue: '果断决定，很少后悔', operator: 'equals' }], weight: 0.9 },
      { hexagramId: 2, conditions: [{ answerValue: '深思熟虑后决定', operator: 'equals' }], weight: 0.8 },
      { hexagramId: 5, conditions: [{ answerValue: '需要一些时间考虑', operator: 'equals' }], weight: 0.7 },
      { hexagramId: 4, conditions: [{ answerValue: '经常犹豫不决', operator: 'equals' }], weight: 0.8 },
    ]
  },
  {
    id: 'change_1',
    type: 'multiple-choice',
    category: 'emotion',
    question: '对于生活中的变化和挑战，您的态度是？',
    options: [
      '欢迎挑战，享受变化',
      '能够适应，积极应对',
      '有些不安，但能接受',
      '比较抗拒，感到压力',
      '非常抗拒，想要稳定'
    ],
    weight: 0.7,
    hexagramMapping: [
      { hexagramId: 1, conditions: [{ answerValue: '欢迎挑战，享受变化', operator: 'equals' }], weight: 0.9 },
      { hexagramId: 7, conditions: [{ answerValue: '能够适应，积极应对', operator: 'equals' }], weight: 0.7 },
      { hexagramId: 3, conditions: [{ answerValue: '有些不安，但能接受', operator: 'equals' }], weight: 0.6 },
      { hexagramId: 2, conditions: [{ answerValue: '非常抗拒，想要稳定', operator: 'equals' }], weight: 0.8 },
    ]
  }
];

// 问卷评估算法
export class QuestionnaireAlgorithm {
  static calculateHexagramMatch(answers: Map<string, string | number>): { hexagramId: number; score: number }[] {
    const hexagramScores = new Map<number, number>();
    
    // 遍历每个问题的答案
    psychologyQuestions.forEach(question => {
      const userAnswer = answers.get(question.id);
      if (!userAnswer) return;
      
      // 检查该答案对应的卦象映射
      question.hexagramMapping.forEach(mapping => {
        const isMatch = mapping.conditions.some(condition => {
          switch (condition.operator) {
            case 'equals':
              return condition.answerValue === userAnswer;            case 'greater':
              return typeof userAnswer === 'number' && 
                     typeof condition.answerValue === 'number' && 
                     userAnswer > condition.answerValue;
            case 'less':
              return typeof userAnswer === 'number' && 
                     typeof condition.answerValue === 'number' && 
                     userAnswer < condition.answerValue;
            case 'contains':
              return typeof userAnswer === 'string' && 
                     userAnswer.includes(condition.answerValue as string);
            default:
              return false;
          }
        });
        
        if (isMatch) {
          const currentScore = hexagramScores.get(mapping.hexagramId) || 0;
          const addedScore = mapping.weight * question.weight * 100;
          hexagramScores.set(mapping.hexagramId, currentScore + addedScore);
        }
      });
    });
    
    // 转换为数组并排序
    return Array.from(hexagramScores.entries())
      .map(([hexagramId, score]) => ({ hexagramId, score }))
      .sort((a, b) => b.score - a.score);
  }
  
  static generatePersonalizedAdvice(
    hexagramId: number, 
    answers: Map<string, string | number>
  ): string[] {
    const baseAdvice: string[] = [];
    
    // 根据具体答案生成个性化建议
    const moodAnswer = answers.get('mood_1');
    const stressAnswer = answers.get('stress_1');
    const confusionAnswer = answers.get('confusion_1');
    
    if (moodAnswer === '很沮丧焦虑' || moodAnswer === '有些低落担忧') {
      baseAdvice.push('建议您适当进行放松练习，如深呼吸、冥想或轻柔的运动');
      baseAdvice.push('考虑与信任的朋友或专业人士分享您的感受');
    }
    
    if (typeof stressAnswer === 'number' && stressAnswer >= 4) {
      baseAdvice.push('当前压力较大，建议合理安排时间，适当休息');
      baseAdvice.push('可以尝试将大任务分解为小步骤，逐步完成');
    }
    
    if (confusionAnswer === '很困惑，不知道该怎么办' || confusionAnswer === '完全迷失方向') {
      baseAdvice.push('迷茫是成长过程的一部分，不要过于焦虑');
      baseAdvice.push('建议花时间进行自我反思，或寻求他人的建议和指导');
    }
    
    return baseAdvice;
  }
}
