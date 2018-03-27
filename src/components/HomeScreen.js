import React from 'react';
import { FlatList } from 'react-native';

import ListItem from '../components/ListItem';

class HomeScreen extends React.Component {
  render() {
    const { pressListItem, topics } = this.props.screenProps;
    return (
      <FlatList
        data={topics}
        extraData={topics}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            pressListItem={pressListItem}
          />
        )}
      />
    );
  }
}

export default HomeScreen;
