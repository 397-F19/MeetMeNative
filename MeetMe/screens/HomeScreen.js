import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar, CalendarList, Agenda, calendarTheme } from 'react-native-calendars';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2019-11-22': [{ text: 'item 1 - any js object' }],
          '2019-11-23': [{ text: 'item 2 - any js object' }],
          '2019-11-24': [],
          '2019-11-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }]
        }}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => { console.log('trigger items loading') }}
        // callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
        // callback that gets called on day press
        onDayPress={(day) => { console.log('day pressed') }}
        // callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => { console.log('day changed') }}
        // initially selected day
        selected={'2019-11-20'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2019-11-20'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2019-11-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        // pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        // futureScrollRange={50}
        // specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => { return (<View />); }}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => { return (<View />); }}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={() => { return (<View />); }}
        // specify how agenda knob should look like
        renderKnob={() => { return (<View />); }}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => { return (<View />); }}
        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
        // Hide knob button. Default = false
        hideKnob={false}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2019-11-20': { selected: true, marked: true },
          '2019-11-21': { marked: false },
        }}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        refreshControl={null}
        // agenda theme
        theme={{
          ...calendarTheme,
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        // agenda container style
        style={{}}
      />
      <View style={styles.tabBarInfoContainer}>
        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
