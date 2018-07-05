import React, { Component } from 'react';
import {
  StatusBar, View, Platform,
} from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import Panels from './components/panels';
import { SCHEDULE } from './types';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(),
      currentPane: SCHEDULE,
      values: {
        SCHEDULE: [],
        GOALS: [],
        MOTIVATION: [],
        HAPPINESS: [],
        TODO: [],
        REMARKS: [],
      },
    };
  }

  render() {
    const {
      currentPane,
      values,
      currentDate,
    } = this.state;
    let statusbarOffset = Platform.OS === 'android' ? 24 : 20;
    statusbarOffset = Platform.OS === 'web' ? 0 : statusbarOffset;
    const stripOffset = 80;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0)"
          translucent
          barStyle="dark-content"
        />
        <View style={{ height: statusbarOffset }} />
        <CalendarStrip
          selectedDate={currentDate}
          onDateSelected={date => this.setState({ currentDate: date })}
          calendarAnimation={{ type: 'sequence', duration: 100 }}
          calendarHeaderStyle={{ color: '#000000' }}
          dateNumberStyle={{ color: '#C0C0C0' }}
          dateNameStyle={{ color: '#C0C0C0' }}
          weekendDateNumberStyle={{ color: '#DFDFDF' }}
          weekendDateNameStyle={{ color: '#DFDFDF' }}
          highlightDateNumberStyle={{ color: '#000000' }}
          highlightDateNameStyle={{ color: '#000000' }}
          disabledDateNameStyle={{ color: '#DFDFDF' }}
          disabledDateNumberStyle={{ color: '#DFDFDF' }}
          innerStyle={[]}
          style={{ height: stripOffset }}
        />
        <Panels
          topOffset={statusbarOffset + stripOffset}
          currentPane={currentPane}
          onPaneChange={pane => this.setState({ currentPane: pane })}
          values={values}
          onChange={(pane, value) => this.setState(prevState => ({
            values: {
              ...prevState.values,
              [pane]: value,
            },
          }))
          }
        />
      </View>
    );
  }
}
