import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';
import { globalStyles, COLORS } from '../../constants/theme';

const IntroductionScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={globalStyles.centeredContainer}>
      <Card containerStyle={{ width: '90%', alignItems: 'center' }}>
        <Text h2Style={globalStyles.h2} h2>Welcome to Guided Divination</Text>
        <Card.Divider />
        <Text style={[globalStyles.primaryText, { textAlign: 'center', marginBottom: 20 }]}>
          This process will guide you through a series of questions to help you gain clarity and insight.
          Focus on your current situation or a specific question you have in mind.
        </Text>
        <Text style={[globalStyles.secondaryText, { textAlign: 'center', marginBottom: 30, fontStyle: 'italic' }]}>
          The I-Ching, or Book of Changes, is an ancient divination text that offers wisdom and guidance.
        </Text>
        <Button
          title="Begin Your Journey"
          onPress={() => navigation.navigate('Question')}
          icon={{ name: 'play-circle-outline', type: 'material-community', color: COLORS.white }}
          buttonStyle={{ backgroundColor: COLORS.ink_green, paddingVertical: 12 }}
          containerStyle={{ width: '80%'}}
        />
      </Card>
    </ScrollView>
  );
};

export default IntroductionScreen;
