import { StyleSheet } from 'react-native';

// Color Palette
export const COLORS = {
  rice_white: '#F5F5DC',
  light_blue: '#ADD8E6',
  ink_green: '#006400', // Dark Green for contrast and importance
  dark_charcoal: '#333333', // Primary text color
  medium_grey: '#777777', // Secondary text color, borders
  light_grey: '#CCCCCC', // Light borders, disabled states
  white: '#FFFFFF',
  black: '#000000',
  error_red: '#D32F2F',
  // Accent colors - can be expanded
  accent_teal: '#008080',
  accent_gold: '#FFD700',
};

// Font Sizes (using a scale for consistency)
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16, // Default body text
  lg: 18,
  xl: 22, // Titles
  xxl: 26, // Large titles
};

// Font Families (using system fonts for now)
// To use custom fonts, they must be loaded in App.js or via Expo's font loading mechanism
export const FONTS = {
  regular: 'System', // Default system font
  bold: 'System',    // Default system bold font (platform specific rendering)
  // Example for custom fonts (after loading them):
  // primaryRegular: 'YourCustomFont-Regular',
  // primaryBold: 'YourCustomFont-Bold',
};

// Common Styles
export const globalStyles = StyleSheet.create({
  // --- Container Styles ---
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.rice_white,
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.rice_white,
    padding: 20,
  },
  // --- Text Styles ---
  primaryText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.md,
    color: COLORS.dark_charcoal,
  },
  secondaryText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.medium_grey,
  },
  h1: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xxl,
    color: COLORS.ink_green,
    marginBottom: 15,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xl,
    color: COLORS.ink_green,
    marginBottom: 10,
  },
  h3: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.lg,
    color: COLORS.dark_charcoal,
    marginBottom: 8,
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.error_red,
    textAlign: 'center',
    marginTop: 10,
  },
  // --- Button Styles ---
  // These are base styles; React Native Elements buttons will have their own props for styling
  // but these can guide the theme.
  buttonPrimary: {
    backgroundColor: COLORS.ink_green,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
  },
  // --- Card/ListItem Styles (conceptual, will be applied via RNE components) ---
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  listItem: {
    // Styles for list items, often used within cards or lists
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light_grey,
  }
});

// React Native Elements Theme Object (optional but recommended for RNE v4+)
// This helps in setting default styles for RNE components globally.
// For RNE v3 and below, direct styling props are more common.
// Assuming we might use RNE v4+ structure for future-proofing.
export const rneTheme = {
  colors: {
    primary: COLORS.ink_green,
    secondary: COLORS.accent_teal,
    white: COLORS.white,
    black: COLORS.black,
    grey0: COLORS.medium_grey, // Example mapping
    grey1: COLORS.medium_grey,
    grey2: COLORS.medium_grey,
    grey3: COLORS.light_grey,
    grey4: COLORS.light_grey,
    grey5: COLORS.light_grey,
    searchBg: COLORS.light_grey,
    success: COLORS.ink_green,
    error: COLORS.error_red,
    warning: COLORS.accent_gold,
    divider: COLORS.light_grey,
  },
  Text: {
    style: {
      fontFamily: FONTS.regular,
      fontSize: FONT_SIZES.md,
      color: COLORS.dark_charcoal,
    },
    h1Style: globalStyles.h1,
    h2Style: globalStyles.h2,
    h3Style: globalStyles.h3,
    // h4Style will use default RNE h4 or can be defined here
  },
  Button: {
    buttonStyle: {
      backgroundColor: COLORS.ink_green,
      borderRadius: 8,
    },
    titleStyle: {
      fontFamily: FONTS.bold,
      fontSize: FONT_SIZES.md,
      color: COLORS.white,
    },
  },
  Card: {
    containerStyle: globalStyles.card,
  },
  ListItem: {
    containerStyle: globalStyles.listItem,
    // bottomDivider: true, // Example default
  },
  // Define other component themes as needed
};

// It's good practice to also provide a ThemeProvider at the root of your app
// import { ThemeProvider } from 'react-native-elements';
// <ThemeProvider theme={rneTheme}>
//   <App />
// </ThemeProvider>
// This will be done in App.js in a subsequent step.
