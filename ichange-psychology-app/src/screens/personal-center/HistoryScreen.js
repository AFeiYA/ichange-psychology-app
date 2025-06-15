import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { Text, Button, ListItem, Icon, Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { getDivinationHistory, clearDivinationHistory } from '../../utils/historyStorage';
import { globalStyles, COLORS, FONT_SIZES } from '../../constants/theme';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const storedHistory = await getDivinationHistory();
      setHistory(storedHistory);
    } catch (e) {
      console.error("Failed to load history:", e);
      setError("Could not load divination history.");
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to delete all divination history? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            await clearDivinationHistory();
            await loadHistory(); // Refresh the list
            setIsLoading(false);
          }
        }
      ],
      { cancelable: true }
    );
  };

  const renderHistoryItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.listItem}>
      <Icon name="yin-yang" type="material-community" color={COLORS.accent_teal} size={24} />
      <ListItem.Content>
        <ListItem.Title style={styles.itemHexagram}>{item.hexagramName}</ListItem.Title>
        <ListItem.Subtitle style={styles.itemDate}>{item.date}</ListItem.Subtitle>
        <Text style={styles.itemInterpretation} numberOfLines={2} ellipsizeMode="tail">
          {item.interpretationSnippet}
        </Text>
        {/* Consider adding an expand option or navigating to a detailed view */}
      </ListItem.Content>
      <ListItem.Chevron color={COLORS.medium_grey}/>
    </ListItem>
  );

  if (isLoading && history.length === 0) { // Show full screen loader only on initial load
    return (
      <SafeAreaView style={globalStyles.screenContainer}>
        <View style={globalStyles.centeredContainer}>
          <ActivityIndicator size="large" color={COLORS.ink_green} />
          <Text style={globalStyles.secondaryText}>Loading history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={globalStyles.screenContainer}>
        <View style={globalStyles.centeredContainer}>
          <Icon name="alert-circle-outline" type="material-community" size={40} color={COLORS.error_red} />
          <Text style={globalStyles.errorText}>{error}</Text>
          <Button title="Retry" onPress={loadHistory} icon={<Icon name="refresh" color={COLORS.white} style={{marginRight: 5}}/>} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
        <View style={styles.headerContainer}>
          <Text h2Style={[globalStyles.h2, styles.title]} h2>Divination Archive</Text>
          {history.length > 0 && (
            <Button
              title="Clear All"
              onPress={handleClearHistory}
              type="clear"
              titleStyle={{ color: COLORS.error_red, fontSize: FONT_SIZES.sm }}
              icon={<Icon name="trash-can-outline" type="material-community" color={COLORS.error_red} size={18} />}
              disabled={isLoading}
            />
          )}
        </View>

        {isLoading && history.length > 0 && <ActivityIndicator color={COLORS.ink_green} style={{marginBottom: 5}}/>}

        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContentContainer}
          />
        ) : (
          <View style={globalStyles.centeredContainer}>
            <Icon name="archive-outline" type="material-community" size={50} color={COLORS.medium_grey} />
            <Text style={styles.emptyMessage}>
              Your divination history is currently empty.
            </Text>
            <Text style={globalStyles.secondaryText}>Completed divinations will appear here.</Text>
          </View>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5, // Reduced padding as globalStyles.screenContainer already has padding
    paddingBottom: 10, // Add some space below header
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light_grey,
  },
  title: {
    textAlign: 'left', // Align title to the left
  },
  listContentContainer: {
    paddingTop: 10, // Add some padding at the top of the list
  },
  listItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    // Adding subtle shadow similar to Card
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  itemDate: {
    ...globalStyles.secondaryText,
    fontSize: FONT_SIZES.xs,
    color: COLORS.medium_grey,
    marginBottom: 3,
  },
  itemHexagram: {
    ...globalStyles.primaryText,
    fontFamily: FONTS.bold, // Ensure FONTS is imported from theme
    fontSize: FONT_SIZES.lg,
    color: COLORS.ink_green,
  },
  itemInterpretation: {
    ...globalStyles.secondaryText,
    fontSize: FONT_SIZES.sm,
    marginTop: 4,
  },
  emptyMessage: {
    ...globalStyles.primaryText,
    fontSize: FONT_SIZES.lg,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.medium_grey,
  },
  // Centered container style is in globalStyles, use that
});

export default HistoryScreen;
