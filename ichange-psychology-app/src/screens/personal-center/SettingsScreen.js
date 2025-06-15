import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, ListItem, Icon } from 'react-native-elements';
import { globalStyles, COLORS, FONT_SIZES } from '../../constants/theme';

const SettingsScreen = () => {
  const settingSections = [
    {
      title: 'Account',
      icon: 'account-cog-outline',
      items: [
        { name: 'Manage Account', detail: 'Coming Soon', disabled: true },
        { name: 'Profile Information', detail: 'Coming Soon', disabled: true },
      ],
    },
    {
      title: 'Notifications',
      icon: 'bell-outline',
      items: [
        { name: 'Notification Preferences', detail: 'Coming Soon', disabled: true },
      ],
    },
    {
      title: 'Privacy',
      icon: 'shield-lock-outline',
      items: [
        { name: 'Privacy Policy', detail: 'View', disabled: true }, // Could navigate to a web view
        { name: 'Data Management', detail: 'Coming Soon', disabled: true },
      ],
    },
    {
      title: 'About',
      icon: 'information-outline',
      items: [
        { name: 'App Version', detail: '1.0.0 (Placeholder)' },
        { name: 'Terms of Service', detail: 'View', disabled: true },
      ],
    },
  ];

  return (
    <ScrollView style={globalStyles.screenContainer}>
      <Text h2Style={[globalStyles.h2, styles.mainTitle]} h2>Settings</Text>

      {settingSections.map((section, index) => (
        <Card containerStyle={styles.card} key={index}>
          <View style={styles.sectionHeader}>
            <Icon name={section.icon} type="material-community" color={COLORS.ink_green} size={24} />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <Card.Divider style={{marginTop: 5}}/>
          {section.items.map((item, itemIndex) => (
            <ListItem key={itemIndex} bottomDivider={itemIndex < section.items.length -1} containerStyle={styles.listItem}>
              <ListItem.Content>
                <ListItem.Title style={globalStyles.primaryText}>{item.name}</ListItem.Title>
                {item.detail && (
                  <ListItem.Subtitle style={globalStyles.secondaryText}>
                    {item.detail}
                  </ListItem.Subtitle>
                )}
              </ListItem.Content>
              {item.disabled ? null : <ListItem.Chevron color={COLORS.medium_grey}/>}
            </ListItem>
          ))}
        </Card>
      ))}

      <Text style={styles.footerText}>
        More settings and personalization options will be available in future updates.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    padding: 0, // Remove Card's own padding
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  sectionTitle: {
    ...globalStyles.h3,
    marginLeft: 10,
    color: COLORS.ink_green,
    marginBottom: 0, // Remove default margin from h3
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },
  footerText: {
    ...globalStyles.secondaryText,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  }
});

export default SettingsScreen;
