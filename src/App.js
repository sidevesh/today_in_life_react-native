import React, { Component } from 'react';
import Panels from './components/panels';
import { SCHEDULE } from './types';
import { StatusBar, View } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    const { currentPane, values } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0)"
          translucent={true}
          barStyle="dark-content"
        />
        <Panels
          currentPane={currentPane}
          onPaneChange={pane => this.setState({ currentPane: pane })}
          values={values}
          onChange={(pane, value) => {
            this.setState({
              values: {
                ...this.state.values,
                [pane]: value,
              },
            });
          }}
        />
      </View>
    );
  }

}
