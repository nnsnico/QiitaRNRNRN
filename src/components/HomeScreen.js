import React from 'react';
import { View, StatusBar, FlatList } from 'react-native';

import ListItem from '../components/ListItem';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { pressListItem, topics } = this.props.screenProps;
    return (
      <View>
        <StatusBar
          backgroundColor="#689F38FF"
          barStyle="light-content"
        />
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
      </View>
    );
  }
}

export default HomeScreen;
