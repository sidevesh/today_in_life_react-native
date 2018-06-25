import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pane from './pane';
import * as types from '../types';

const SchedulePane = props =>
  <Pane
    BANDWIDTH={props.BANDWIDTH}
    style={props.style}
    type={types.SCHEDULE}
    value={props.values[types.SCHEDULE]}
    onPress={() => props.onPaneChange(types.SCHEDULE)}
    onChange={value => props.onChange(types.SCHEDULE, value)}
    isCurrent={props.currentPane === types.SCHEDULE}
  />;

const GoalsPane = props =>
  <Pane
    BANDWIDTH={props.BANDWIDTH}
    style={props.style}
    type={types.GOALS}
    value={props.values[types.GOALS]}
    onPress={() => props.onPaneChange(types.GOALS)}
    onChange={value => props.onChange(types.GOALS, value)}
    isCurrent={props.currentPane === types.GOALS}
  />;

const MotivationPane = props =>
  <Pane
    BANDWIDTH={props.BANDWIDTH}
    style={props.style}
    type={types.MOTIVATION}
    value={props.values[types.MOTIVATION]}
    onPress={() => props.onPaneChange(types.MOTIVATION)}
    onChange={value => props.onChange(types.MOTIVATION, value)}
    isCurrent={props.currentPane === types.MOTIVATION}
  />;

const HappinessPane = props =>
  <Pane
    BANDWIDTH={props.BANDWIDTH}
    style={props.style}
    type={types.HAPPINESS}
    value={props.values[types.HAPPINESS]}
    onPress={() => props.onPaneChange(types.HAPPINESS)}
    onChange={value => props.onChange(types.HAPPINESS, value)}
    isCurrent={props.currentPane === types.HAPPINESS}
  />;

const TodoPane = props =>
  <Pane
    BANDWIDTH={props.BANDWIDTH}
    style={props.style}
    type={types.TODO}
    value={props.values[types.TODO]}
    onPress={() => props.onPaneChange(types.TODO)}
    onChange={value => props.onChange(types.TODO, value)}
    isCurrent={props.currentPane === types.TODO}
  />;

export default class Panels extends Component {

  constructor(props) {
    super(props);
    this.state ={
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
      onChange
    } = this.props;
    const { width, height } = this.state;
    let BANDWIDTH = Math.min(
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
              height:  isTopRowPanesActive ?
                height - BANDWIDTH
                :
                (BANDWIDTH * 2),
            }
          ]}
        >
          <SchedulePane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onChange={onChange}
            values={values}
            style={{
              height: !isTopRowPanesActive ?
                (BANDWIDTH * 2)
                :
                height - BANDWIDTH,
              width: isLeftColPanesActive ?
                width - BANDWIDTH
                :
                BANDWIDTH,
            }}
          />
          <View
            style={[
              styles.topSecondCol,
              {
                width: !isLeftColPanesActive ?
                  width - BANDWIDTH
                  :
                  BANDWIDTH,
              }
            ]}
          >
            <GoalsPane
              BANDWIDTH={BANDWIDTH}
              currentPane={currentPane}
              onPaneChange={onPaneChange}
              onChange={onChange}
              values={values}
            style={{
                height: currentPane !== types.GOALS ?
                currentPane === types.SCHEDULE ?
                  (height - BANDWIDTH) / 2
                  :
                  BANDWIDTH
                :
                height - (BANDWIDTH * 2),
              width: !isLeftColPanesActive ?
                width - BANDWIDTH
                :
                BANDWIDTH,
            }}
            />
            <MotivationPane
              BANDWIDTH={BANDWIDTH}
              currentPane={currentPane}
              onPaneChange={onPaneChange}
              onChange={onChange}
              values={values}
              style={{
                height: currentPane !== types.MOTIVATION ?
                  currentPane === types.SCHEDULE ?
                    (height - BANDWIDTH) / 2
                    :
                    BANDWIDTH
                  :
                  height - (BANDWIDTH * 2),
                width: !isLeftColPanesActive ?
                  width - BANDWIDTH
                  :
                  BANDWIDTH,
              }}
            />
          </View>
        </View>
        <View
          style={[
            styles.bottomTwoRow,
            {
              height: !isTopRowPanesActive ?
                height - (BANDWIDTH * 2)
                :
                BANDWIDTH,
            }
          ]}
        >
          <TodoPane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onChange={onChange}
            values={values}
            style={{
              height: isTopRowPanesActive ?
                BANDWIDTH
                :
                height - (BANDWIDTH * 2),
              width: isLeftColPanesActive ?
                width - BANDWIDTH
                :
                BANDWIDTH,
            }}
          />
          <HappinessPane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onChange={onChange}
            values={values}
            style={{
              height: isTopRowPanesActive ?
                BANDWIDTH
                :
                height - (BANDWIDTH * 2),
              width: !isLeftColPanesActive ?
                width - BANDWIDTH
                :
                BANDWIDTH,
            }}
          />
        </View>
      </View>
    ); 
  }

}

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
