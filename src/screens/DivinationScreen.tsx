import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type DivinationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function DivinationScreen() {
  const navigation = useNavigation<DivinationScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>选择占卜方式</Text>
        <Text style={styles.subtitle}>
          选择适合您当前状态的占卜方式
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, styles.guidedOption]}
          onPress={() => navigation.navigate('GuidedDivination')}
        >
          <View style={styles.optionHeader}>
            <Ionicons name="compass" size={40} color="#fff" />
            <Text style={styles.optionTitle}>引导式占卜</Text>
          </View>
          <Text style={styles.optionDescription}>
            通过专业的心理测评问卷，深度分析您的当前状态，
            并匹配最适合的易经卦象，提供个性化的生活指引。
          </Text>
          <View style={styles.optionFeatures}>
            <Text style={styles.featureText}>• 深度心理分析</Text>
            <Text style={styles.featureText}>• 个性化建议</Text>
            <Text style={styles.featureText}>• 专业解读</Text>
          </View>
          <View style={styles.optionDuration}>
            <Text style={styles.durationText}>预计用时：5-8分钟</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.entertainmentOption]}
          onPress={() => navigation.navigate('EntertainmentDivination')}
        >
          <View style={styles.optionHeader}>
            <Ionicons name="sparkles" size={40} color="#fff" />
            <Text style={styles.optionTitle}>今日运势</Text>
          </View>
          <Text style={styles.optionDescription}>
            基于当前时间、地理位置和天气情况，
            自动生成今日的运势指引，轻松获得正能量。
          </Text>
          <View style={styles.optionFeatures}>
            <Text style={styles.featureText}>• 即时获得结果</Text>
            <Text style={styles.featureText}>• 每日一卦</Text>
            <Text style={styles.featureText}>• 轻松愉快</Text>
          </View>
          <View style={styles.optionDuration}>
            <Text style={styles.durationText}>预计用时：1分钟</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>占卜原理</Text>
        <Text style={styles.infoText}>
          我们的占卜系统结合了古代易经智慧与现代心理学原理，
          通过科学的算法将您的心理状态与相应的卦象进行匹配，
          为您提供积极正面的生活指导。
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  guidedOption: {
    backgroundColor: '#2c5530',
  },
  entertainmentOption: {
    backgroundColor: '#4a90a4',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  optionDescription: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 20,
    opacity: 0.9,
  },
  optionFeatures: {
    marginBottom: 16,
  },
  featureText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
    opacity: 0.8,
  },
  optionDuration: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 12,
  },
  durationText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
  },
  infoSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});
