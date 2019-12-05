

import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Alert, 
  Modal,
  ScrollView, 
  TouchableHighlight
} from 'react-native';
import t from 'tcomb-form-native';
import {Agenda} from 'react-native-calendars';

const Form = t.form.Form;

const event = t.struct({
  Title: t.String,
  Name: t.String,
  Description: t.String, 
  Location: t.String, 
  StartTime: t.String, 
  EndTime: t.String,
  Attendees: t.String,
});

export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        '2019-12-04': [{
          name: 'Work ' + 'with ' + 'Aaron \n' 
          + 'Work work work!! \n' 
          +  'Mudd Library' + ', '+ '12:00 - 14:00',
        },
      ],
        '2019-11-22': [{
          name: 'Comp_Sci 396' + ' \n' 
          +  'Frances' + ', '+ '15:30 - 17:00',
        }],
        '2019-11-21': [{
          name: 'Comp_Sci 397 Work' + '\n' 
          +  'Tech' + ', '+ '12:00 - 15:00',
        }], 
        '2019-11-25': [{
          name: 'Comp_Sci 397 Work' + '\n' 
          +  'Tech' + ', '+ '12:00 - 15:00',
        }], 
        '2019-11-26': [{
          name: 'Comp_Sci 396 Assignment' + ' \n' 
          +  'Frances' + ', '+ 'All Day',
        }],
        '2019-11-27': [{
          name: 'Home for Thanksgiving!' + '\n' 
          +  'Romeoville' + ', '+ 'All Day',
        }], 
        '2019-11-28': [{
          name: 'Thanksgiving with Grandpa Steve' + ' \n' 
          +  'Skokie' + ', '+ 'All Day',
        }],
        '2019-11-29': [{
          name: 'Black Friday!!!!' + ' \n' 
          +  'The Mall' + ', '+ 'All Day',
        }],
        '2019-11-30': [{
          name: 'Home for Thanksgiving!' + ' \n' 
          +  'Romeoville' + ', '+ 'All Day',
        }],
        '2019-12-01': [{
          name: 'Home for Thanksgiving!' + ' \n' 
          +  'Romeoville' + ', '+ 'All Day',
        }],
        '2019-12-04': [{
          name: 'Work! with Terry' + ' \n' 
          +  'Mudd Library' + ', '+ '12:00 - 14:00',
        }],
        '2019-11-29': [{
          name: 'Home for Thanksgiving!' + '\n' 
          +  'Romeoville' + ', '+ 'All Day',
        }], 
        '2019-11-23': [{
          name: 'Study ' + 'with ' + 'Terry \n' 
          + '397 Homework \n' 
          +  'Mudd' + ', '+ '12:00 - 16:00',
        }]}, 
      modalVisible: false,
    };
  }
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    setTimeout(() => {
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      newItems[value.Name] = { name: value.Description };
      console.log(newItems[value.Name]);
      this.setState({
        items: newItems
      });
    }, 1000); 
    this.setState({ modalVisible: false });
    console.log(value);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render(){
    var options = {
      auto: 'placeholders', 
      fields: {
        Title: {
          label: 'Title', placeholder: 'Title of your event' // <= label for the name field
        },
        Name: {
          label: 'Date', placeholder: 'Date of your event (e.g. 2019-11-29)' // <= label for the name field
        },
        Description: {
          label: 'Description', placeholder: 'Describe your event for your friends' // <= label for the name field
        },
        Location: {
          label: 'Location', placeholder: 'Where is your event taking place?' // <= label for the name field
        },
        StartTime: {
          label: 'Start Time', placeholder: 'What time does your event start?' // <= label for the name field
        },
        EndTime: {
          label: 'End Time', placeholder: 'What time does your event end?' // <= label for the name field
        },
        Attendees: {
          label: 'Attendees', placeholder: 'Who will be attending the event?' // <= label for the name field
        }
      }
    };
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{ marginTop: 42, marginLeft: 5, backgroundColor: 'white', color: 'black' }}>
            <ScrollView>
              <Form 
                ref={c => this._form = c}
                value={this.state.value}
                type={event}
                options={options}/> 
              <Button
                title="Create my event"
                onPress={() => this.handleSubmit()}/>
            </ScrollView>
          </View>
        </Modal>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2019-11-20'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
        <Button
          title="Create Event"
          onPress={() => this.setModalVisible()}/>
      </View>
    );
  }
  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = []; 
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  startCreateEvent()
  {
    this.setModalVisible(!this.state.modalVisible);
  }
}

CalendarScreen.navigationOptions = {
  title: 'Calendar',
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
function addEvent(){
  //Launch modal.
  //fill in Title, Date, People, Description, Location, Start Time, End Time in modal and return an item with these. 
  item = createEvent()
  // this.setState({
  //   items: item
  // });
}

function createEvent(){}

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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
//useful extra def for agenda
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        