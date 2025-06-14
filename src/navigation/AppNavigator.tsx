import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// 导入屏幕组件（稍后创建）
import HomeScreen from '../screens/HomeScreen';
import DivinationScreen from '../screens/DivinationScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GuidedDivinationScreen from '../screens/GuidedDivinationScreen';
import EntertainmentDivinationScreen from '../screens/EntertainmentDivinationScreen';
import DivinationResultScreen from '../screens/DivinationResultScreen';

import { TabParamList, RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// 底部标签导航
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Divination') {
            iconName = focused ? 'sparkles' : 'sparkles-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2c5530', // 墨绿色
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#f8f6f0', // 米白色
          borderTopColor: '#e0e0e0',
        },
        headerStyle: {
          backgroundColor: '#f8f6f0',
        },
        headerTintColor: '#2c5530',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '首页' }}
      />
      <Tab.Screen 
        name="Divination" 
        component={DivinationScreen} 
        options={{ title: '占卜' }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ title: '历史' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: '我的' }}
      />
    </Tab.Navigator>
  );
}

// 主导航栈
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f6f0',
          },
          headerTintColor: '#2c5530',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuidedDivination"
          component={GuidedDivinationScreen}
          options={{ title: '引导式占卜' }}
        />
        <Stack.Screen
          name="EntertainmentDivination"
          component={EntertainmentDivinationScreen}
          options={{ title: '娱乐占卜' }}
        />
        <Stack.Screen
          name="DivinationResult"
          component={DivinationResultScreen}
          options={{ title: '占卜结果' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
