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
  TouchableOpacity
} from 'react-native';

var Spinner = require('react-native-spinkit');

var REQUEST_URL = 'https://gjgihitgak.localtunnel.me/quotes'

class Inspiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: null,
      selectedQuote: 0
    };
  }

  clickMe() {
    this.setState({
      selectedQuote: Math.floor(Math.random() * this.state.quotes.length)
    })
  }

  render() {
    if (!this.state.quotes) {
      return this.renderLoadingView();
    }

    var quote = this.state.quotes[this.state.selectedQuote];

    return (
      <TouchableOpacity  style={styles.container} onPress={this.clickMe.bind(this)}>
        <View style={styles.container}>
          <Text style={styles.quote}>
            { quote.content }
          </Text>
          <Text style={styles.author}>
            — { quote.author }
          </Text>
          <Text style={styles.authorinfo}>
            { quote['author-info'] }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.spinnercontainer}>
        <Spinner size={100} type='Bounce' color='#FFFFFF'/>
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
        });
      })
      .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  spinnercontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  quote: {
    textAlign: 'left',
    color: '#FFFFFF',
    fontSize: 40,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 5,
  },
  author: {
    color: '#222222',
    fontSize: 20,
    textAlign: 'right',
    paddingRight: 30,
    marginBottom: 2,
  },
  authorinfo: {
    color: '#222222',
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 30,
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('Inspiration', () => Inspiration);
