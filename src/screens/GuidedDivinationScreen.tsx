import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Answer } from '../types';
import { psychologyQuestions, QuestionnaireAlgorithm } from '../data/questions';
import { hexagrams } from '../data/hexagrams';

type GuidedDivinationNavigationProp = StackNavigationProp<RootStackParamList, 'GuidedDivination'>;

export default function GuidedDivinationScreen() {
  const navigation = useNavigation<GuidedDivinationNavigationProp>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | number>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = psychologyQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / psychologyQuestions.length) * 100;

  const handleAnswer = (value: string | number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestion.id, value);
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < psychologyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // 计算卦象匹配
      const hexagramMatches = QuestionnaireAlgorithm.calculateHexagramMatch(answers);
      
      if (hexagramMatches.length === 0) {
        Alert.alert('错误', '无法分析您的答案，请重试。');
        setIsLoading(false);
        return;
      }

      // 获取最匹配的卦象
      const bestMatch = hexagramMatches[0];
      const matchedHexagram = hexagrams.find(h => h.id === bestMatch.hexagramId);
      
      if (!matchedHexagram) {
        Alert.alert('错误', '无法找到匹配的卦象，请重试。');
        setIsLoading(false);
        return;
      }

      // 生成个性化建议
      const personalizedAdvice = QuestionnaireAlgorithm.generatePersonalizedAdvice(
        bestMatch.hexagramId,
        answers
      );

      // 创建占卜结果
      const result = {
        id: Date.now().toString(),
        type: 'guided' as const,
        hexagram: matchedHexagram,
        personalizedAdvice: [...matchedHexagram.advice, ...personalizedAdvice],
        confidenceScore: bestMatch.score / 100,
        timestamp: new Date(),
      };

      // 导航到结果页面
      navigation.navigate('DivinationResult', { result });
    } catch (error) {
      Alert.alert('错误', '处理您的答案时出现问题，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  const currentAnswer = answers.get(currentQuestion.id);
  const canProceed = currentAnswer !== undefined;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="sync" size={48} color="#4a90a4" />
        <Text style={styles.loadingText}>正在分析您的状态...</Text>
        <Text style={styles.loadingSubtext}>易经智慧与心理学的融合</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 进度条 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} / {psychologyQuestions.length}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* 问题 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        {/* 答案选项 */}
        <View style={styles.answersContainer}>
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerOption,
                  currentAnswer === option && styles.selectedOption
                ]}
                onPress={() => handleAnswer(option)}
              >
                <Text style={[
                  styles.answerText,
                  currentAnswer === option && styles.selectedAnswerText
                ]}>
                  {option}
                </Text>
                {currentAnswer === option && (
                  <Ionicons name="checkmark-circle" size={24} color="#fff" />
                )}
              </TouchableOpacity>
            ))
          )}

          {currentQuestion.type === 'scale' && currentQuestion.scale && (
            <View style={styles.scaleContainer}>
              <Text style={styles.scaleLabel}>{currentQuestion.scale.minLabel}</Text>
              <View style={styles.scaleOptions}>
                {Array.from({ length: currentQuestion.scale.max - currentQuestion.scale.min + 1 }, (_, i) => {
                  const value = currentQuestion.scale!.min + i;
                  return (
                    <TouchableOpacity
                      key={value}
                      style={[
                        styles.scaleOption,
                        currentAnswer === value && styles.selectedScaleOption
                      ]}
                      onPress={() => handleAnswer(value)}
                    >
                      <Text style={[
                        styles.scaleOptionText,
                        currentAnswer === value && styles.selectedScaleOptionText
                      ]}>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={styles.scaleLabel}>{currentQuestion.scale.maxLabel}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 导航按钮 */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton]}
          onPress={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color="#666" />
          <Text style={styles.navButtonText}>上一题</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            !canProceed && styles.disabledButton
          ]}
          onPress={goToNextQuestion}
          disabled={!canProceed}
        >
          <Text style={[
            styles.navButtonText,
            styles.nextButtonText,
            !canProceed && styles.disabledButtonText
          ]}>
            {currentQuestionIndex === psychologyQuestions.length - 1 ? '完成' : '下一题'}
          </Text>
          <Ionicons 
            name={currentQuestionIndex === psychologyQuestions.length - 1 ? 'checkmark' : 'chevron-forward'} 
            size={24} 
            color={canProceed ? '#fff' : '#ccc'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a90a4',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionContainer: {
    paddingVertical: 30,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    lineHeight: 28,
    textAlign: 'center',
  },
  answersContainer: {
    paddingBottom: 100,
  },
  answerOption: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#4a90a4',
    borderColor: '#4a90a4',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  selectedAnswerText: {
    color: '#fff',
    fontWeight: '500',
  },
  scaleContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scaleLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  scaleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scaleOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedScaleOption: {
    backgroundColor: '#4a90a4',
    borderColor: '#4a90a4',
  },
  scaleOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedScaleOptionText: {
    color: '#fff',
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  prevButton: {
    backgroundColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#4a90a4',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginHorizontal: 4,
  },
  nextButtonText: {
    color: '#fff',
  },
  disabledButtonText: {
    color: '#ccc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f6f0',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
