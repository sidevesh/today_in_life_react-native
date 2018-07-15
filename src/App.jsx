import React, { Component } from 'react';
import {
  StatusBar, View, Platform,
} from 'react-native';
import moment from 'moment';
import { CalendarList } from 'react-native-calendars';
import Panels from './components/panels';
import NavBar from './components/navbar';
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
  getEntriedDatesFoMonths,
} from './getData';

const getDaysInMonth = (inpDate) => {
  const month = inpDate.getMonth();
  const year = inpDate.getFullYear();
  const date = new Date(year, month, 1);
  const result = [];
  while (date.getMonth() === month) {
    result.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return result;
};

const fillDisabledRestDates = (markedDates, months) => {
  const presentDates = Object.keys(markedDates);
  const allDates = months
    .map(getDaysInMonth)
    .reduce((a, b) => a.concat(b))
    .map(date => moment(date).format('YYYY-MM-DD'));
  const returnMarkedDates = { ...markedDates };
  allDates.forEach((date) => {
    if (presentDates.includes(date)) return;
    returnMarkedDates[date] = { disabled: true };
  });
  return returnMarkedDates;
};

const getMarkedDatesWithToday = (dates) => {
  const markedDates = {};
  dates.forEach((date) => {
    markedDates[moment(date).format('YYYY-MM-DD')] = { selected: true };
  });
  if (!Object.keys(markedDates).includes(moment().format('YYYY-MM-DD'))) {
    markedDates[moment().format('YYYY-MM-DD')] = { selected: true, marked: true };
  }
  return markedDates;
};

const formatToDate = object => moment(object.dateString, 'YYYY-MM-DD').toDate();

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
    const today = moment().startOf('day').toDate();
    this.state = {
      isExpanded: false,
      currentDate: today,
      currentPane: SCHEDULE,
      markedDates: {},
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
      markedDates,
      isExpanded,
    } = this.state;
    let statusbarOffset = Platform.OS === 'android' ? 24 : 20;
    statusbarOffset = Platform.OS === 'web' ? 0 : statusbarOffset;
    const navBarOffset = Platform.OS === 'android' ? 56 : 44;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0)"
          translucent
          barStyle="dark-content"
        />
        <View style={{ height: statusbarOffset }} />
        <NavBar
          title={moment(currentDate).format('dddd, D MMMM YYYY')}
          isExpanded={isExpanded}
          onExpand={() => this.setState({ isExpanded: true })}
          onCollapse={() => this.setState({ isExpanded: false })}
          renderExpandedContent={() => (
            <CalendarList
              maxDate={new Date()}
              markedDates={markedDates}
              onVisibleMonthsChange={months => this.setState({
                markedDates:
                fillDisabledRestDates(
                  getMarkedDatesWithToday(
                    getEntriedDatesFoMonths(
                      months.map(formatToDate),
                    ),
                  ),
                  months.map(formatToDate),
                ),
              })}
              current={currentDate}
              onDayPressed={(date) => {
                const parsedDate = formatToDate(date);
                this.setState({
                  currentDate: parsedDate,
                  values: getItems(parsedDate),
                });
              }}
            />
          )}
        />
        {!isExpanded && (
          <Panels
            topOffset={statusbarOffset + navBarOffset}
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
        )}
      </View>
    );
  }
}
