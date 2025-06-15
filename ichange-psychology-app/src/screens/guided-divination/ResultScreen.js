import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Text, Button, Card, Icon } from 'react-native-elements';
import { globalStyles, COLORS, FONT_SIZES } from '../../constants/theme';
import { HEXAGRAMS, mapAnswersToHexagram } from '../../constants/hexagrams';
import { saveDivination, getFormattedDate, generateUniqueId } from '../../utils/historyStorage';

const ResultScreen = ({ route, navigation }) => {
  const [resultHexagram, setResultHexagram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { answers } = route.params || {};

  useEffect(() => {
    setIsLoading(true);
    let hexagramToSave = null;
    if (answers) {
      hexagramToSave = mapAnswersToHexagram(answers);
    } else {
      hexagramToSave = HEXAGRAMS[0]; // Default if no answers
      console.warn("No answers provided to ResultScreen, using default hexagram.");
    }
    setResultHexagram(hexagramToSave);

    if (hexagramToSave) {
      const divinationRecord = {
        id: generateUniqueId(),
        hexagramName: hexagramToSave.name,
        date: getFormattedDate(),
        interpretationSnippet: hexagramToSave.description.substring(0, 120) + "...",
        answers: answers || [],
      };
      saveDivination(divinationRecord)
        .then(() => console.log("Result saved to history."))
        .catch(err => Alert.alert("Error", "Failed to save divination to history. Please try again."))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false); // Should not happen if logic is correct
    }
  }, [answers]);

  if (isLoading || !resultHexagram) {
    return (
      <View style={globalStyles.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.ink_green} />
        <Text style={globalStyles.secondaryText}>Determining your hexagram...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainer}>
      <Card containerStyle={styles.card}>
        <Text h2Style={[globalStyles.h2, styles.title]} h2>Your Guiding Hexagram</Text>
        <Card.Divider />

        <View style={styles.hexagramHeader}>
          <Icon name="yin-yang" type="material-community" color={COLORS.ink_green} size={30} />
          <Text h3Style={[globalStyles.h3, styles.hexagramName]} h3>
            {resultHexagram.name}
          </Text>
        </View>

        {/* Placeholder for image */}
        <View style={styles.imagePlaceholder}>
          <Text style={globalStyles.secondaryText}>{resultHexagram.image_placeholder}</Text>
          <Icon name="image-off-outline" type="material-community" color={COLORS.medium_grey} size={40}/>
        </View>

        <Text style={styles.sectionTitle}>Core Meaning</Text>
        <Text style={styles.description}>{resultHexagram.description}</Text>

        <Text style={styles.sectionTitle}>Suggestions for Reflection</Text>
        {resultHexagram.suggestions.map((suggestion, index) => (
          <View key={index} style={styles.suggestionItem}>
            <Icon name="lightbulb-on-outline" type="material-community" color={COLORS.accent_teal} size={20} style={styles.suggestionIcon}/>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </View>
        ))}

        <Button
          title="Begin Anew"
          onPress={() => navigation.popToTop()}
          icon={<Icon name="arrow-left-circle" type="material-community" color={COLORS.white} style={{ marginRight: 8 }}/>}
          buttonStyle={{ backgroundColor: COLORS.ink_green, marginTop: 30 }}
          containerStyle={{width: '70%', alignSelf: 'center'}}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  hexagramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  hexagramName: {
    marginLeft: 10,
    textAlign: 'center',
    color: COLORS.ink_green, // Emphasize hexagram name
  },
  imagePlaceholder: {
    width: '80%',
    height: 120,
    backgroundColor: COLORS.light_grey,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.medium_grey,
  },
  sectionTitle: {
    ...globalStyles.h3,
    fontSize: FONT_SIZES.lg,
    color: COLORS.accent_teal,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.light_grey,
    paddingBottom: 5,
  },
  description: {
    ...globalStyles.primaryText,
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * 1.6,
    textAlign: 'left', // Justify for more formal look if desired, but left is often more readable
    marginBottom: 15,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  suggestionIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  suggestionText: {
    ...globalStyles.primaryText,
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * 1.5,
    flexShrink: 1, // Allow text to wrap
  },
});

export default ResultScreen;
