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
import {Agenda} from 'react-native-calendars';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <div style={styles.profile_pic}>Lol</div>
      </View>
    );
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile_pic: {
    flex: 1,
    backgroundColor: 'black',
    height: 30,
    width: 30,
    borderRadius: 30,
    margin: '10%',
  },
  logo: {
    width: 300,
    height: 400,
  },
});
