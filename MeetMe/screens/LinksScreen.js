import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';


export default function LinksScreen() {
  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log({calendars})
    }
  };

  return (
    <ScrollView style={styles.container}>
      
    </ScrollView>
    );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
/*
export default class App extends React.Component {

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Calendar Module Example</Text>
      </View>
    );
  }
}
*/