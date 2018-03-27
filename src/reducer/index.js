import { NavigationActions } from 'react-navigation';
import { combineReducers } from 'redux';

import { AppNavigator } from '../container/index';

const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

function nav(state = initialNavState, action) {
  switch (action.type) {
    case 'GO_DETAIL': {
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'Detail',
          // params: action.rest, // TODO: Add action param
        }),
        state,
      );
    }
    default: {
      return AppNavigator.router.getStateForAction(action, state);
    }
  }
}

const initialTopics = [];
function topics(state = initialTopics, action) {
  switch (action.type) {
    case 'LOAD_TOPICS': {
      return action.topics;
    }
    default:
      return state;
  }
}

const appReducer = combineReducers({
  nav,
  topics,
});

export default appReducer;
