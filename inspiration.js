import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  PixelRatio,
} from 'react-native';

import React , {
  Component
} from 'react';

import Onboarding from './onboarding'
import store from 'react-native-simple-store';

var Spinner = require('react-native-spinkit');

const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog,
  ShareButton
} = FBSDK;

var REQUEST_URL = 'https://inspiration-ruigomes.rhcloud.com/quotes'

export default class Inspiration extends Component {
  constructor(props, styles) {
    super(props);

    this.styles = styles;

    this.state = {
      quotes: null,
      selectedQuote: 0,
      showOnboarding: true
    };
  }

  getCurrentQuote() {
    return this.state.quotes[this.state.selectedQuote];
  }

  getNewQuote() {
    do {
      newSelectedQuote = Math.floor(Math.random() * this.state.quotes.length);
    } while(newSelectedQuote == this.state.selectedQuote);

    this.setState({
      selectedQuote: newSelectedQuote
    });
  }

  getSharedQuote() {
    var quote = this.getCurrentQuote();

    return {
      contentType: 'link',
      quote: quote.content + " — " + quote.author,
      contentTitle: 'Motivato',
      contentDescription: 'Get your daily fix of motivation - Download the app now!',
      contentUrl: "https://www.motivatoapp.com/",
    }
  }

  completeOnboarding() {
    this.setState({
      showOnboarding: false,
    })
    store.save('onboarding', {
      complete: true
    });
  }

  render() {
    if(this.state.showOnboarding) {
      return <Onboarding completeOnboarding={this.completeOnboarding.bind(this)} />;
    }

    if (!this.state.quotes) {
      return this.renderLoadingView();
    }

    var quote = this.getCurrentQuote();

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.quoteContainer} onPress={this.getNewQuote.bind(this)}>
            <Text style={styles.quote}>
              { quote.content }
            </Text>
            <Text style={styles.author}>
              — { quote.author }
            </Text>
            <Text style={styles.authorinfo}>
              { quote['author-info'] }
            </Text>
        </TouchableOpacity>
        <View style={styles.shareContainer}>
          <ShareButton shareContent={this.getSharedQuote()}/>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.spinnercontainer}>
        <Spinner size={100} isVisible={true} type='CircleFlip' color='#FFFFFF'/>
      </View>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

    store.get('onboarding').then(onboarding => {
      if(onboarding !== null) {
        this.setState({
          showOnboarding: !onboarding.complete,
        });
      }
    });

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          quotes: responseData,
        });
        this.getNewQuote();
      })
      .done();
  }
}

import styles from './styles';
