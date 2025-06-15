import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Text, ListItem, Icon, Card } from 'react-native-elements';
import { globalStyles, COLORS } from '../../constants/theme';

const PersonalCenterScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: 'history',
      title: 'View Divination History',
      screen: 'History',
      icon: 'history',
      iconType: 'material-community'
    },
    {
      id: 'settings',
      title: 'App Settings',
      screen: 'Settings',
      icon: 'cog-outline',
      iconType: 'material-community'
    },
    // Add more items here as Personal Center grows
    // {
    //   id: 'profile',
    //   title: 'Manage Profile',
    //   screen: 'UserProfile', // Example
    //   icon: 'account-circle-outline',
    //   iconType: 'material-community'
    // },
  ];

  const renderMenuItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate(item.screen)}
      containerStyle={styles.listItemContainer}
    >
      <Icon name={item.icon} type={item.iconType} color={COLORS.ink_green} />
      <ListItem.Content>
        <ListItem.Title style={globalStyles.primaryText}>{item.title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron color={COLORS.medium_grey}/>
    </ListItem>
  );

  return (
    <ScrollView style={globalStyles.screenContainer}>
      <Text h2Style={[globalStyles.h2, styles.title]} h2>Personal Hub</Text>
      <Card containerStyle={styles.card}>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id}
          scrollEnabled={false} // Disable FlatList scrolling inside ScrollView
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    padding: 0, // Remove Card's default padding to let ListItem handle it
  },
  listItemContainer: {
    backgroundColor: COLORS.white, // Ensure list items are white for contrast
  },
  // menuList: { // No longer needed if FlatList is inside Card
  //   width: '100%',
  // },
});

export default PersonalCenterScreen;
