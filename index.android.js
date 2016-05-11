/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  PixelRatio,
} from 'react-native';


import { getCorrectFontSizeForScreen } from './multiResolution'

import Dimensions from 'Dimensions';
const { height:h, width:w } = Dimensions.get('window');

var Spinner = require('react-native-spinkit');

const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog,
  ShareButton
} = FBSDK;

var REQUEST_URL = 'http://inspiration-ruigomes.rhcloud.com/quotes'

class Inspiration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: null,
      selectedQuote: 0,
    };
  }

  getCurrentQuote() {
    return this.state.quotes[this.state.selectedQuote];
  }

  getNewQuote() {
    this.setState({
      selectedQuote: Math.floor(Math.random() * this.state.quotes.length)
    })
  }

  getSharedQuote() {
    var quote = this.getCurrentQuote();

    return {
      contentType: 'link',
      quote: quote.content,
      contentTitle: 'Inspirational Quotes',
      contentDescription: 'Get your daily fix of inspiration - Download the app now!',
      contentUrl: "https://www.facebook.com/",
    }
  }

  render() {
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
        <Spinner size={100} type='ThreeBounce' color='#FFFFFF'/>
      </View>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          quotes: responseData,
          selectedQuote: Math.floor(Math.random() * responseData.length)
        });
      })
      .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  spinnercontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  shareContainer: {
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, w, h, 18),
    borderColor: '#FFFFFF',
    borderWidth: 2
  },
  author: {
    color: '#222222',
    fontSize: 20,
    textAlign: 'right',
    paddingRight: 20,
    marginBottom: 2,
  },
  authorinfo: {
    color: '#222222',
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 20,
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('Inspiration', () => Inspiration);
