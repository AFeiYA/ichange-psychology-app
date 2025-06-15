import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, LinearProgress } from 'react-native-elements';
import { globalStyles, COLORS, FONT_SIZES } from '../../constants/theme';

// Placeholder questions - can be moved to a constants file
const questions = [
  {
    id: 1,
    text: 'Regarding your current situation, do you feel a sense of hope or apprehension?',
    answers: [
      { text: 'Primarily Hopeful', value: 'hopeful' },
      { text: 'More Apprehensive', value: 'apprehensive' },
      { text: 'A Mix of Both', value: 'mixed' },
      { text: 'Neither, a sense of Neutrality', value: 'neutral' }
    ],
  },
  {
    id: 2,
    text: 'Are you inclined to take direct action, or do you feel a pull towards waiting and observing?',
    answers: [
      { text: 'Take Direct Action', value: 'action' },
      { text: 'Wait and Observe', value: 'observe' },
      { text: 'Unsure of the best approach', value: 'unsure_approach' },
    ],
  },
  {
    id: 3,
    text: 'Is your focus primarily on internal feelings and thoughts, or external events and circumstances?',
    answers: [
      { text: 'Mainly Internal Focus', value: 'internal' },
      { text: 'Mainly External Focus', value: 'external' },
      { text: 'Balanced between Internal and External', value: 'balanced_focus' },
    ],
  },
];

const QuestionScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswer = (answerValue) => {
    const newSelectedAnswers = [...selectedAnswers, { questionId: questions[currentQuestionIndex].id, answer: answerValue }];
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result', { answers: newSelectedAnswers });
    }
  };

  if (currentQuestionIndex >= questions.length) {
    // This case should ideally not be reached if navigation is correct
    return (
      <View style={globalStyles.centeredContainer}>
        <Text style={globalStyles.primaryText}>All questions answered. Preparing your result...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainer}>
      <Card containerStyle={styles.card}>
        <Text h3Style={[globalStyles.h3, styles.questionNumber]} h3>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <LinearProgress value={progress} color={COLORS.ink_green} variant="determinate" style={styles.progressBar} />

        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer) => (
            <Button
              key={answer.value}
              title={answer.text}
              onPress={() => handleAnswer(answer.value)}
              buttonStyle={styles.answerButton}
              titleStyle={styles.answerButtonTitle}
              containerStyle={styles.answerButtonContainer}
              type="outline"
            />
          ))}
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingBottom: 20, // Extra padding for the card content
  },
  questionNumber: {
    textAlign: 'center',
    color: COLORS.medium_grey,
    fontSize: FONT_SIZES.sm,
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 25,
  },
  questionText: {
    ...globalStyles.primaryText,
    fontSize: FONT_SIZES.lg,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: FONT_SIZES.lg * 1.5,
  },
  answersContainer: {
    marginTop: 10,
  },
  answerButtonContainer: {
    marginVertical: 8,
  },
  answerButton: {
    borderColor: COLORS.ink_green,
    borderWidth: 1,
    paddingVertical: 12,
  },
  answerButtonTitle: {
    color: COLORS.ink_green,
    fontFamily: FONTS.regular, // Use FONTS.bold if preferred
  }
});

export default QuestionScreen;
