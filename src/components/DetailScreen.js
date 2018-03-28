import React from 'react';
import { View, Text } from 'react-native';

class DetailScreen extends React.Component {
  render() {
    const topic = this.props.navigation.state.params;
    console.log(topic);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{topic.title}</Text>
      </View>
    );
  }
}

export default DetailScreen;
