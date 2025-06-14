import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { hexagrams } from '../data/hexagrams';

type EntertainmentDivinationNavigationProp = StackNavigationProp<RootStackParamList, 'EntertainmentDivination'>;

export default function EntertainmentDivinationScreen() {
  const navigation = useNavigation<EntertainmentDivinationNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [timeInfo, setTimeInfo] = useState({
    hour: new Date().getHours(),
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
  });

  const generateHexagram = () => {
    setIsLoading(true);
    
    // 模拟加载过程
    setTimeout(() => {
      // 基于时间生成卦象
      const { hour, date, month } = timeInfo;
      const timeSum = hour + date + month;
      const hexagramIndex = timeSum % hexagrams.length;
      const selectedHexagram = hexagrams[hexagramIndex];

      // 创建占卜结果
      const result = {
        id: Date.now().toString(),
        type: 'entertainment' as const,
        hexagram: selectedHexagram,
        personalizedAdvice: [
          '今日运势基于时间和自然规律生成',
          '保持积极的心态，迎接美好的一天',
          ...selectedHexagram.advice.slice(0, 2), // 取前两条建议
        ],
        confidenceScore: 0.8,
        timestamp: new Date(),
        metadata: {
          timeOfDay: getTimeOfDay(hour),
        },
      };

      setIsLoading(false);
      navigation.navigate('DivinationResult', { result });
    }, 2000);
  };

  const getTimeOfDay = (hour: number): 'morning' | 'afternoon' | 'evening' | 'night' => {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  };

  const getTimeEmoji = () => {
    const timeOfDay = getTimeOfDay(timeInfo.hour);
    switch (timeOfDay) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'evening': return '🌇';
      case 'night': return '🌙';
    }
  };

  const getTimeGreeting = () => {
    const timeOfDay = getTimeOfDay(timeInfo.hour);
    switch (timeOfDay) {
      case 'morning': return '早上好';
      case 'afternoon': return '下午好';
      case 'evening': return '傍晚好';
      case 'night': return '晚上好';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingSpinner}>
          <Text style={styles.spinnerText}>☰☷</Text>
        </View>
        <Text style={styles.loadingText}>正在感知天地能量...</Text>
        <Text style={styles.loadingSubtext}>
          基于当前时间 {timeInfo.hour}:{new Date().getMinutes().toString().padStart(2, '0')} 生成运势
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 时间信息 */}
      <View style={styles.timeSection}>
        <Text style={styles.timeEmoji}>{getTimeEmoji()}</Text>
        <Text style={styles.greeting}>{getTimeGreeting()}</Text>
        <Text style={styles.timeText}>
          {new Date().toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.currentTime}>
          {new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      {/* 说明区域 */}
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionTitle}>今日运势占卜</Text>
        <Text style={styles.descriptionText}>
          基于当前的时间节点，结合易经天人合一的理念，
          为您生成今日的运势指引。
        </Text>
        
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={24} color="#4a90a4" />
            <Text style={styles.infoText}>时间能量</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="leaf-outline" size={24} color="#4a90a4" />
            <Text style={styles.infoText}>自然规律</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="star-outline" size={24} color="#4a90a4" />
            <Text style={styles.infoText}>易经智慧</Text>
          </View>
        </View>
      </View>

      {/* 占卜按钮 */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.divinationButton}
          onPress={generateHexagram}
        >
          <Ionicons name="sparkles" size={32} color="#fff" />
          <Text style={styles.buttonText}>开始今日占卜</Text>
        </TouchableOpacity>
        
        <Text style={styles.disclaimer}>
          * 每日可以多次占卜，但建议以第一次为准
        </Text>
      </View>

      {/* 底部提示 */}
      <View style={styles.tipSection}>
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={20} color="#4a90a4" />
          <Text style={styles.tipText}>
            易经认为，天地万物都有其运行规律，
            在合适的时间做合适的事，才能事半功倍。
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  timeSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  timeEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 18,
    color: '#4a90a4',
    marginBottom: 4,
  },
  currentTime: {
    fontSize: 16,
    color: '#666',
  },
  descriptionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 12,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  buttonSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  divinationButton: {
    backgroundColor: '#4a90a4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  tipSection: {
    paddingHorizontal: 20,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f6f0',
    paddingHorizontal: 40,
  },
  loadingSpinner: {
    marginBottom: 24,
  },
  spinnerText: {
    fontSize: 64,
    color: '#4a90a4',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
