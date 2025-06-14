import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type DivinationResultRouteProp = RouteProp<RootStackParamList, 'DivinationResult'>;

export default function DivinationResultScreen() {
  const route = useRoute<DivinationResultRouteProp>();
  const navigation = useNavigation();
  const { result } = route.params;

  const handleShare = async () => {
    try {
      const shareContent = `
易经心理占卜结果

卦象：${result.hexagram.chineseName}
时间：${result.timestamp.toLocaleDateString()}

卦辞：${result.hexagram.description}

解读：${result.hexagram.interpretation}

生活建议：
${result.personalizedAdvice.map((advice, index) => `${index + 1}. ${advice}`).join('\n')}

——来自易经心理App
      `.trim();

      await Share.share({
        message: shareContent,
        title: '易经心理占卜结果',
      });
    } catch (error) {
      Alert.alert('分享失败', '无法分享您的占卜结果');
    }
  };

  const handleSave = () => {
    // 这里应该实现保存到历史记录的逻辑
    Alert.alert('保存成功', '占卜结果已保存到历史记录');
  };

  const getResultTypeInfo = () => {
    if (result.type === 'guided') {
      return {
        icon: 'compass',
        color: '#2c5530',
        title: '引导式占卜结果',
        subtitle: '基于心理测评的深度分析',
      };
    } else {
      return {
        icon: 'sparkles',
        color: '#4a90a4',
        title: '今日运势',
        subtitle: '基于时间能量的轻松指引',
      };
    }
  };

  const typeInfo = getResultTypeInfo();

  return (
    <ScrollView style={styles.container}>
      {/* 结果类型标识 */}
      <View style={[styles.typeHeader, { backgroundColor: typeInfo.color }]}>
        <Ionicons name={typeInfo.icon as any} size={32} color="#fff" />
        <View style={styles.typeInfo}>
          <Text style={styles.typeTitle}>{typeInfo.title}</Text>
          <Text style={styles.typeSubtitle}>{typeInfo.subtitle}</Text>
        </View>
      </View>

      {/* 卦象显示 */}
      <View style={styles.hexagramSection}>
        <View style={styles.hexagramSymbol}>
          <Text style={styles.symbolText}>{result.hexagram.symbol}</Text>
        </View>
        <Text style={styles.hexagramName}>{result.hexagram.chineseName}</Text>
        <Text style={styles.hexagramEnglish}>{result.hexagram.englishName}</Text>
        
        <View style={styles.keywordsContainer}>
          {result.hexagram.keywords.map((keyword, index) => (
            <View key={index} style={styles.keywordTag}>
              <Text style={styles.keywordText}>{keyword}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 卦辞 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>卦辞</Text>
        <View style={styles.card}>
          <Text style={styles.descriptionText}>{result.hexagram.description}</Text>
        </View>
      </View>

      {/* 现代解读 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>现代心理学解读</Text>
        <View style={styles.card}>
          <Text style={styles.interpretationText}>{result.hexagram.interpretation}</Text>
        </View>
      </View>

      {/* 生活建议 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>生活建议</Text>
        <View style={styles.card}>
          {result.personalizedAdvice.map((advice, index) => (
            <View key={index} style={styles.adviceItem}>
              <View style={styles.adviceNumber}>
                <Text style={styles.adviceNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.adviceText}>{advice}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 匹配度 */}
      {result.type === 'guided' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>匹配度</Text>
          <View style={styles.card}>
            <View style={styles.confidenceContainer}>
              <View style={styles.confidenceBar}>
                <View 
                  style={[
                    styles.confidenceFill, 
                    { width: `${result.confidenceScore * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.confidenceText}>
                {Math.round(result.confidenceScore * 100)}% 匹配
              </Text>
            </View>
            <Text style={styles.confidenceDescription}>
              基于您的回答与易经理论的匹配程度
            </Text>
          </View>
        </View>
      )}

      {/* 操作按钮 */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
          <Ionicons name="bookmark-outline" size={24} color="#4a90a4" />
          <Text style={styles.actionButtonText}>保存结果</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#4a90a4" />
          <Text style={styles.actionButtonText}>分享结果</Text>
        </TouchableOpacity>
      </View>

      {/* 重新占卜按钮 */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>重新占卜</Text>
        </TouchableOpacity>        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            // 返回到标签导航器的首页
            navigation.goBack();
            navigation.goBack();
          }}
        >
          <Text style={styles.homeButtonText}>返回首页</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timestamp}>
        <Text style={styles.timestampText}>
          占卜时间：{result.timestamp.toLocaleString('zh-CN')}
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
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  typeInfo: {
    marginLeft: 16,
  },
  typeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  typeSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  hexagramSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  hexagramSymbol: {
    marginBottom: 16,
  },
  symbolText: {
    fontSize: 64,
    color: '#2c5530',
    textAlign: 'center',
  },
  hexagramName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 8,
  },
  hexagramEnglish: {
    fontSize: 16,
    color: '#4a90a4',
    marginBottom: 20,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  keywordTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  keywordText: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 12,
  },
  card: {
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
  descriptionText: {
    fontSize: 16,
    color: '#2c5530',
    lineHeight: 24,
    fontWeight: '500',
  },
  interpretationText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  adviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  adviceNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4a90a4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  adviceNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  adviceText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  confidenceContainer: {
    marginBottom: 12,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#4a90a4',
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90a4',
    textAlign: 'center',
  },
  confidenceDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4a90a4',
    marginTop: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a90a4',
  },
  retryButtonText: {
    fontSize: 16,
    color: '#4a90a4',
    fontWeight: '500',
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#4a90a4',
    paddingVertical: 16,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  timestamp: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  timestampText: {
    fontSize: 12,
    color: '#999',
  },
});
