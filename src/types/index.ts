// 易经卦象相关类型定义

export interface Hexagram {
  id: number; // 1-64
  name: string; // 卦名，如"乾"
  chineseName: string; // 中文卦名
  englishName: string; // 英文卦名
  symbol: string; // 卦象符号
  upperTrigram: Trigram; // 上卦
  lowerTrigram: Trigram; // 下卦
  description: string; // 卦辞
  interpretation: string; // 现代心理学解读
  advice: string[]; // 生活建议
  keywords: string[]; // 关键词
  emotionalState: EmotionalState[]; // 对应的情绪状态
}

export interface Trigram {
  name: string; // 八卦名称
  symbol: string; // 符号
  element: string; // 五行属性
  nature: string; // 性质
}

export interface Line {
  position: number; // 爻位 1-6
  type: 'yin' | 'yang'; // 阴爻或阳爻
  changing: boolean; // 是否为变爻
  interpretation: string; // 爻辞解读
}

// 心理状态相关类型
export interface EmotionalState {
  category: 'anxiety' | 'confusion' | 'depression' | 'stress' | 'hope' | 'calm';
  intensity: 1 | 2 | 3 | 4 | 5; // 强度等级
  description: string;
}

export interface PsychologicalProfile {
  mood: string;
  stressLevel: number;
  confusionLevel: number;
  hopeLevel: number;
  relationshipStatus: string;
  lifeGoals: string[];
  currentChallenges: string[];
}

// 问卷相关类型
export interface Question {
  id: string;
  type: 'multiple-choice' | 'scale' | 'text';
  category: 'emotion' | 'relationship' | 'career' | 'life-goal' | 'stress';
  question: string;
  options?: string[]; // 选择题选项
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  weight: number; // 在算法中的权重
  hexagramMapping: HexagramMapping[]; // 与卦象的映射关系
}

export interface HexagramMapping {
  hexagramId: number;
  conditions: QuestionCondition[];
  weight: number;
}

export interface QuestionCondition {
  answerValue: string | number;
  operator: 'equals' | 'greater' | 'less' | 'contains';
}

export interface Answer {
  questionId: string;
  value: string | number;
  timestamp: Date;
}

// 占卜结果相关类型
export interface DivinationResult {
  id: string;
  type: 'guided' | 'entertainment';
  hexagram: Hexagram;
  changingLines?: Line[];
  personalizedAdvice: string[];
  confidenceScore: number; // 0-1，算法匹配的置信度
  timestamp: Date;
  metadata?: {
    location?: {
      latitude: number;
      longitude: number;
      city?: string;
    };
    weather?: WeatherData;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  };
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

// 用户相关类型
export interface User {
  id: string;
  profile: PsychologicalProfile;
  history: DivinationResult[];
  preferences: UserPreferences;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface UserPreferences {
  language: 'zh' | 'en';
  notifications: boolean;
  privacyLevel: 'low' | 'medium' | 'high';
  favoriteHexagrams: number[];
}

// 导航相关类型
export type RootStackParamList = {
  Home: undefined;
  GuidedDivination: undefined;
  EntertainmentDivination: undefined;
  DivinationResult: { result: DivinationResult };
  History: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  Divination: undefined;
  History: undefined;
  Profile: undefined;
};

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
  };
}
