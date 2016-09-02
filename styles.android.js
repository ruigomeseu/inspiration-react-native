import React, {
  StyleSheet,
  PixelRatio
} from 'react-native';

import { getCorrectFontSizeForScreen } from './multiResolution'

import Dimensions from 'Dimensions';
const { height:h, width:w } = Dimensions.get('window');

export default StyleSheet.create({
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
