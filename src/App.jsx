import React, { Component } from 'react';
import {
  StatusBar, View, Platform,
} from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import Panels from './components/panels';
import { SCHEDULE, TODO } from './types';
import {
  getItems,
  addBulletItem,
  addCheckItem,
  editBulletItem,
  editCheckItem,
  toggleCheckItem,
  deleteBulletItem,
  deleteCheckItem,
} from './getData';

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

  componentDidMount() {
    getItems()
      .then(values => this.setState({ values }));
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
          onDateSelected={(date) => {
            this.setState({ currentDate: date });
            getItems(date)
              .then(newValues => this.setState({ values: newValues }));
          }}
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
          onAdd={type => (type === TODO ? addCheckItem(type) : addBulletItem(type))}
          onEdit={(type, id, text) => (type === TODO
            ? editCheckItem(id, text)
            : editBulletItem(id, text)
          )}
          onDelete={(type, id) => (type === TODO
            ? deleteCheckItem(id)
            : deleteBulletItem(id)
          )}
          onCheckedToggle={id => toggleCheckItem(id)}
        />
      </View>
    );
  }
}
