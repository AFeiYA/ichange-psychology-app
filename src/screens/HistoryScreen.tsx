import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  // 模拟历史记录数据
  const historyData = [
    {
      id: '1',
      date: '2025-06-14',
      type: 'guided',
      hexagram: '乾为天',
      summary: '目标清晰，积极向上',
    },
    {
      id: '2',
      date: '2025-06-13',
      type: 'entertainment',
      hexagram: '坤为地',
      summary: '保持耐心，静待时机',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>占卜历史</Text>
        <Text style={styles.subtitle}>
          回顾您的占卜记录，追踪心理成长轨迹
        </Text>
      </View>

      <View style={styles.historyList}>
        {historyData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.historyItem}>
            <View style={styles.itemLeft}>
              <View style={[
                styles.typeIndicator,
                item.type === 'guided' ? styles.guidedType : styles.entertainmentType
              ]}>
                <Ionicons 
                  name={item.type === 'guided' ? 'compass' : 'sparkles'} 
                  size={16} 
                  color="#fff" 
                />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.hexagramName}>{item.hexagram}</Text>
                <Text style={styles.summary}>{item.summary}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {historyData.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>暂无占卜记录</Text>
          <Text style={styles.emptyDescription}>
            开始您的第一次占卜，记录心理成长历程
          </Text>
        </View>
      )}
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
  historyList: {
    paddingHorizontal: 20,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guidedType: {
    backgroundColor: '#2c5530',
  },
  entertainmentType: {
    backgroundColor: '#4a90a4',
  },
  itemContent: {
    flex: 1,
  },
  hexagramName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ccc',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
