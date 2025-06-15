import React from 'react';
import { View } from 'react-native'; // Button will be replaced by RNE Button
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, Button } from 'react-native-elements'; // Import RNE Button and ThemeProvider
import { rneTheme, globalStyles, COLORS } from './src/constants/theme'; // Import our theme

// Screens for Guided Divination
import IntroductionScreen from './src/screens/guided-divination/IntroductionScreen';
import QuestionScreen from './src/screens/guided-divination/QuestionScreen';
import ResultScreen from './src/screens/guided-divination/ResultScreen';

// Screen for Entertainment Divination
import DailyFortuneScreen from './src/screens/entertainment-divination/DailyFortuneScreen';

// Screens for Personal Center
import PersonalCenterScreen from './src/screens/personal-center/PersonalCenterScreen';
import HistoryScreen from './src/screens/personal-center/HistoryScreen';
import SettingsScreen from './src/screens/personal-center/SettingsScreen';

const GuidedDivinationStack = createStackNavigator();
const PersonalCenterStack = createStackNavigator();
const RootStack = createStackNavigator();

function GuidedDivinationFlow() {
  return (
    <GuidedDivinationStack.Navigator>
      <GuidedDivinationStack.Screen name="Introduction" component={IntroductionScreen} options={{ title: 'Guided Divination Intro' }} />
      <GuidedDivinationStack.Screen name="Question" component={QuestionScreen} options={{ title: 'Questions' }}/>
      <GuidedDivinationStack.Screen name="Result" component={ResultScreen} options={{ title: 'Your Hexagram' }}/>
    </GuidedDivinationStack.Navigator>
  );
}

function PersonalCenterFlow() {
  return (
    <PersonalCenterStack.Navigator>
      <PersonalCenterStack.Screen name="PersonalCenterMain" component={PersonalCenterScreen} options={{ title: 'Personal Center' }} />
      <PersonalCenterStack.Screen name="History" component={HistoryScreen} options={{ title: 'Divination History' }} />
      <PersonalCenterStack.Screen name="Settings" component={SettingsScreen} options={{ title: 'App Settings' }} />
    </PersonalCenterStack.Navigator>
  );
}

// This is our home screen, allowing navigation to different features
function HomeScreen({ navigation }) {
  return (
    <View style={[globalStyles.centeredContainer, { justifyContent: 'space-around' }]}>
      <Button
        title="Start Guided Divination"
        onPress={() => navigation.navigate('GuidedDivination')}
        containerStyle={{ marginVertical: 10, width: '80%' }}
      />
      <Button
        title="Get Your Daily Fortune"
        onPress={() => navigation.navigate('DailyFortune')}
        containerStyle={{ marginVertical: 10, width: '80%' }}
      />
      <Button
        title="Personal Center"
        onPress={() => navigation.navigate('PersonalCenter')}
        containerStyle={{ marginVertical: 10, width: '80%' }}
      />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={rneTheme}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.light_blue },
            headerTintColor: COLORS.ink_green,
            headerTitleStyle: { fontFamily: rneTheme.Text.style.fontFamily, fontWeight: 'bold' }, // Ensure font family is applied
            animationEnabled: true, // Default is true on iOS, false on Android < 9
          }}
        >
          <RootStack.Screen name="Home" component={HomeScreen} options={{ title: 'I-Change Psychology' }}/>
          <RootStack.Screen name="GuidedDivination" component={GuidedDivinationFlow} options={{ headerShown: false }} />
          <RootStack.Screen name="DailyFortune" component={DailyFortuneScreen} options={{ title: 'Daily Fortune' }}/>
          <RootStack.Screen name="PersonalCenter" component={PersonalCenterFlow} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
