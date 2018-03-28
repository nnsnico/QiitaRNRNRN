import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  profileImage: {
    width: 32,
    height: 32,
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  title: {
    color: 'black',
  },
  profileName: {
    fontSize: 12,
    color: 'grey',
  },
  icon: {
    alignSelf: 'center',
  },
  likeCount: {
    fontSize: 10,
    color: '#FF4081FF',
    alignSelf: 'center',
  },
});

const Container = item => (
  <View style={styles.container}>
    <Image style={styles.profileImage} source={{ uri: item.user.profile_image_url }} />
    <View style={{ flex: 1, padding: 8 }}>
      <View>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.profileName}>{item.user.id}</Text>
      </View>
    </View>
    <Icon style={styles.icon} name="heart" size={24} color="#FF4081FF" />
    <Text style={styles.likeCount}>{item.likes_count}</Text>
  </View>
);

class ListItem extends React.Component {
  render() {
    const { item, pressListItem } = this.props;
    return (
      Platform.OS === 'android' ?
        (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#B0BEC5FF')}
            onPress={() => pressListItem(item)}
          >
            {Container(item)}
          </TouchableNativeFeedback>) :
        (
          <TouchableHighlight style={{ backgroundColor: '#B0BEC5FF' }} onPress={() => pressListItem(item)}>
            {Container(item)}
          </TouchableHighlight>
        )
    );
  }
}

export default ListItem;

