import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';

export default class Onboarding extends Component {
  render() {
    const pageArray = [{
      title: 'Welcome!',
      description: 'Motivato is a motivational app that will help you achieve your goals.',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'After this tutorial, just tap anywhere to get a fresh quote.',
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onDoneBtnClick={this.props.completeOnboarding}
        onSkipBtnClick={this.props.completeOnboarding}
        pageArray={pageArray}
      />
    );
  }
}
