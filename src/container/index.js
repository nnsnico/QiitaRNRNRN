import React from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import HomeScreen from '../components/HomeScreen';
import DetailScreen from '../components/DetailScreen';
import { goDetail } from '../actions/index';

export const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#8BC34AFF',
    },
    headerTintColor: '#fff',
    statusBarStyle: 'light-content',
  },
});

class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
    this.pressListItem = this.pressListItem.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  pressListItem(item) {
    const { dispatch } = this.props;
    dispatch(goDetail(item));
  }

  render() {
    const {
      dispatch, nav, addListener, topics,
    } = this.props;
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
          })
        }
        screenProps={{
          pressListItem: this.pressListItem,
          topics,
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return ({
    nav: state.nav,
    topics: state.topics,
  });
}

export default connect(mapStateToProps)(AppWithNavigationState);

