import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_STORAGE_KEY = '@divinationHistory';

/**
 * Saves a divination result to AsyncStorage.
 * @param {object} result - The divination result object to save.
 *                          Expected format: { id, hexagramName, date, interpretationSnippet, answers }
 * @returns {Promise<void>}
 */
export const saveDivination = async (result) => {
  try {
    const existingHistoryJson = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    const existingHistory = existingHistoryJson ? JSON.parse(existingHistoryJson) : [];

    // Add new result to the beginning of the array for chronological order (newest first)
    existingHistory.unshift(result);

    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(existingHistory));
    console.log('Divination result saved successfully.');
  } catch (error) {
    console.error('Error saving divination result to AsyncStorage:', error);
    // Optionally, re-throw or handle more gracefully
  }
};

/**
 * Retrieves the divination history from AsyncStorage.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of divination results, or an empty array.
 */
export const getDivinationHistory = async () => {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    if (historyJson !== null) {
      return JSON.parse(historyJson);
    }
    return []; // No history found
  } catch (error) {
    console.error('Error retrieving divination history from AsyncStorage:', error);
    return []; // Return empty array on error
  }
};

/**
 * Clears all divination history from AsyncStorage.
 * @returns {Promise<void>}
 */
export const clearDivinationHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
    console.log('Divination history cleared successfully.');
  } catch (error) {
    console.error('Error clearing divination history from AsyncStorage:', error);
  }
};

/**
 * Generates a user-friendly date string.
 * @returns {string} Formatted date string (e.g., "October 27, 2023, 10:30 AM")
 */
export const getFormattedDate = () => {
  return new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Generates a unique ID for history items.
 * Simple implementation using timestamp + random number.
 * @returns {string}
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
