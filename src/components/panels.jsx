import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pane from './pane';
import * as types from '../types';

const styles = StyleSheet.create({
  mainCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  topThreeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  bottomTwoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  topSecondCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

const SchedulePane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onChange,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.SCHEDULE}
    value={values[types.SCHEDULE]}
    onPress={() => onPaneChange(types.SCHEDULE)}
    onChange={value => onChange(types.SCHEDULE, value)}
    isCurrent={currentPane === types.SCHEDULE}
  />
);

const GoalsPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onChange,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.GOALS}
    value={values[types.GOALS]}
    onPress={() => onPaneChange(types.GOALS)}
    onChange={value => onChange(types.GOALS, value)}
    isCurrent={currentPane === types.GOALS}
  />
);

const MotivationPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onChange,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.MOTIVATION}
    value={values[types.MOTIVATION]}
    onPress={() => onPaneChange(types.MOTIVATION)}
    onChange={value => onChange(types.MOTIVATION, value)}
    isCurrent={currentPane === types.MOTIVATION}
  />
);

const HappinessPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onChange,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.HAPPINESS}
    value={values[types.HAPPINESS]}
    onPress={() => onPaneChange(types.HAPPINESS)}
    onChange={value => onChange(types.HAPPINESS, value)}
    isCurrent={currentPane === types.HAPPINESS}
  />
);

const TodoPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onChange,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.TODO}
    value={values[types.TODO]}
    onPress={() => onPaneChange(types.TODO)}
    onChange={value => onChange(types.TODO, value)}
    isCurrent={currentPane === types.TODO}
  />
);

export default class Panels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    });
  }

  render() {
    const {
      currentPane,
      onPaneChange,
      values,
      onChange,
    } = this.props;
    const { width, height } = this.state;
    const BANDWIDTH = Math.min(
      height,
      width,
    ) / 6;
    const isTopRowPanesActive = [
      types.SCHEDULE,
      types.GOALS,
      types.MOTIVATION,
    ].includes(currentPane);
    const isLeftColPanesActive = [
      types.SCHEDULE,
      types.TODO,
    ].includes(currentPane);
    return (
      <View style={styles.mainCol}>
        <View
          style={[
            styles.topThreeRow,
            {
              height: isTopRowPanesActive
                ? height - BANDWIDTH
                : (BANDWIDTH * 2),
            },
          ]}
        >
          <SchedulePane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onChange={onChange}
            values={values}
            style={{
              height: !isTopRowPanesActive
                ? (BANDWIDTH * 2)
                : height - BANDWIDTH,
              width: isLeftColPanesActive
                ? width - BANDWIDTH
                : BANDWIDTH,
            }}
          />
          <View
            style={[
              styles.topSecondCol,
              {
                width: !isLeftColPanesActive
                  ? width - BANDWIDTH
                  : BANDWIDTH,
              },
            ]}
          >
            <GoalsPane
              BANDWIDTH={BANDWIDTH}
              currentPane={currentPane}
              onPaneChange={onPaneChange}
              onChange={onChange}
              values={values}
              style={{
                height: currentPane !== types.GOALS // eslint-disable-line no-nested-ternary
                  ? currentPane === types.SCHEDULE
                    ? (height - BANDWIDTH) / 2
                    : BANDWIDTH
                  : height - (BANDWIDTH * 2),
                width: !isLeftColPanesActive
                  ? width - BANDWIDTH
                  : BANDWIDTH,
              }}
            />
            <MotivationPane
              BANDWIDTH={BANDWIDTH}
              currentPane={currentPane}
              onPaneChange={onPaneChange}
              onChange={onChange}
              values={values}
              style={{
                height: currentPane !== types.MOTIVATION // eslint-disable-line no-nested-ternary
                  ? currentPane === types.SCHEDULE
                    ? (height - BANDWIDTH) / 2
                    : BANDWIDTH
                  : height - (BANDWIDTH * 2),
                width: !isLeftColPanesActive
                  ? width - BANDWIDTH
                  : BANDWIDTH,
              }}
            />
          </View>
        </View>
        <View
          style={[
            styles.bottomTwoRow,
            {
              height: !isTopRowPanesActive
                ? height - (BANDWIDTH * 2)
                : BANDWIDTH,
            },
          ]}
        >
          <TodoPane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onChange={onChange}
            values={values}
            style={{
              height: isTopRowPanesActive
                ? BANDWIDTH
                : height - (BANDWIDTH * 2),
              width: isLeftColPanesActive
                ? width - BANDWIDTH
                : BANDWIDTH,
            }}
          />
          <HappinessPane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onChange={onChange}
            values={values}
            style={{
              height: isTopRowPanesActive
                ? BANDWIDTH
                : height - (BANDWIDTH * 2),
              width: !isLeftColPanesActive
                ? width - BANDWIDTH
                : BANDWIDTH,
            }}
          />
        </View>
      </View>
    );
  }
}
