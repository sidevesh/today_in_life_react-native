import React, { Component } from 'react';
import {
  StatusBar, View, Platform,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Panels from './components/panels';
import { SCHEDULE, TODO } from './types';
import {
  realm,
  getItems,
  addBulletItem,
  addCheckItem,
  editBulletItem,
  editCheckItem,
  toggleCheckItem,
  deleteBulletItem,
  deleteCheckItem,
  getEntriedDatesForWeekStart,
} from './getData';

const isToday = (date) => {
  const inputDay = new Date(date);
  const inputStartOfDay = inputDay.setHours(0, 0, 0, 0);
  const today = new Date();
  const todayStartOfDay = today.setHours(0, 0, 0, 0);
  return inputStartOfDay === todayStartOfDay;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      currentDate: today,
      currentPane: SCHEDULE,
      whitelistedDatesForCurrentWeek: getEntriedDatesForWeekStart(today),
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
    this.setState({ values: getItems() });
    realm.addListener('change', () => this.setState({ values: getItems() }));
  }

  render() {
    const {
      currentPane,
      values,
      currentDate,
      whitelistedDatesForCurrentWeek,
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
          maxDate={new Date()}
          datesWhitelist={whitelistedDatesForCurrentWeek}
          onWeekChanged={week => this.setState({
            whitelistedDatesForCurrentWeek: getEntriedDatesForWeekStart(new Date(week)),
          })}
          selectedDate={currentDate}
          onDateSelected={(date) => {
            this.setState({
              currentDate: date.toDate(),
              values: getItems(date.toDate()),
            });
          }}
          calendarAnimation={{ type: 'sequence', duration: 100 }}
          calendarHeaderStyle={{ color: '#000000' }}
          dateNumberStyle={{ color: '#C0C0C0' }}
          dateNameStyle={{ color: '#C0C0C0' }}
          weekendDateNumberStyle={{ color: '#888888' }}
          weekendDateNameStyle={{ color: '#888888' }}
          highlightDateNumberStyle={{ color: '#000000' }}
          highlightDateNameStyle={{ color: '#000000' }}
          disabledDateNameStyle={{ color: '#AAAAAA' }}
          disabledDateNumberStyle={{ color: '#AAAAAA' }}
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
          isEditable={isToday(currentDate)}
        />
      </View>
    );
  }
}
