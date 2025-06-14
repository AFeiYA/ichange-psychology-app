import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {/* 欢迎区域 */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>易经心理</Text>
        <Text style={styles.welcomeSubtitle}>古代智慧 · 现代心理</Text>
        <Text style={styles.welcomeDescription}>
          通过易经智慧了解内心状态，获得积极的生活指引
        </Text>
      </View>

      {/* 功能卡片区域 */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, styles.primaryCard]}
          onPress={() => navigation.navigate('GuidedDivination')}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="compass" size={32} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>引导式占卜</Text>
          <Text style={styles.cardDescription}>
            通过心理测评，获得个性化的易经指引
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.secondaryCard]}
          onPress={() => navigation.navigate('EntertainmentDivination')}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="sparkles" size={32} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>今日运势</Text>
          <Text style={styles.cardDescription}>
            基于时间和天气的轻松占卜
          </Text>
        </TouchableOpacity>
      </View>

      {/* 每日一卦 */}
      <View style={styles.dailySection}>
        <Text style={styles.sectionTitle}>每日一卦</Text>
        <View style={styles.dailyCard}>
          <View style={styles.hexagramSymbol}>
            <Text style={styles.hexagramText}>☰☰</Text>
          </View>
          <View style={styles.dailyContent}>
            <Text style={styles.hexagramName}>乾为天</Text>
            <Text style={styles.hexagramQuote}>
              "天行健，君子以自强不息"
            </Text>
            <Text style={styles.hexagramAdvice}>
              今日适合积极主动，发挥领导力，为目标而努力。
            </Text>
          </View>
        </View>
      </View>

      {/* 心理小贴士 */}
      <View style={styles.tipSection}>
        <Text style={styles.sectionTitle}>心理小贴士</Text>
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={24} color="#4a90a4" />
          <Text style={styles.tipText}>
            面对困难时，不妨换个角度思考问题。易经告诉我们，变化是唯一的不变。
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#4a90a4',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryCard: {
    backgroundColor: '#2c5530',
  },
  secondaryCard: {
    backgroundColor: '#4a90a4',
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  dailySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 16,
  },
  dailyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hexagramSymbol: {
    marginRight: 16,
  },
  hexagramText: {
    fontSize: 32,
    color: '#2c5530',
  },
  dailyContent: {
    flex: 1,
  },
  hexagramName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 4,
  },
  hexagramQuote: {
    fontSize: 14,
    color: '#4a90a4',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  hexagramAdvice: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tipSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginLeft: 12,
  },
});
