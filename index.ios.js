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
} from 'react-native';

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
      shareLinkContent: {
        contentType: 'link',
        contentDescription: 'Best memes online',
        contentUrl: "https://www.facebook.com/",
      },
    };
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
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
      <View style={styles.container}>
        <TouchableOpacity style={styles.quoteContainer} onPress={this.clickMe.bind(this)}>
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
          <ShareButton shareContent={this.state.shareLinkContent}/>
        </View>
      </View>
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
    backgroundColor: '#2196F3',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
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
