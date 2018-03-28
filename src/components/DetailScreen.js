import React from 'react';
import { View, Animated, StatusBar, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import Markdown from 'react-native-simple-markdown';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#8BC34AFF',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    padding: 8,
    fontSize: 18,
  },
  profileImage: {
    width: 32,
    height: 32,
    padding: 8,
    borderRadius: 16,
  },
  userName: {
    color: '#fff',
    padding: 8,
  },
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
  },
  bar: {
    height: 32,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
    padding: 8,
  },
});

class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params.title,
      headerStyle: {
        elevation: 0,
        backgroundColor: '#8BC34AFF',
      },
      headerTitleStyle: {
        opacity: params.animatedValue,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      animateHeader: new Animated.Value(0),
    };
  }

  componentWillMount() {
    // 上にスクロールすると徐々に現れる
    this.props.navigation.setParams({
      animatedValue: this.state.animateHeader.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      }),
    });
  }

  render() {
    const topic = this.props.navigation.state.params;
    const { height } = Dimensions.get('window');
    // ヘッダーの高さをスクロールイベントに合わせて伸ばしたり縮ませる
    const headerHeight = this.state.animateHeader.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    // 上にスクロールすると徐々に消えて行く
    const opacityContent = this.state.animateHeader.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          backgroundColor="#689F38FF"
          barStyle="light-content"
        />
        <ScrollView
          style={[styles.fill]}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.state.animateHeader } },
            },
          ])}
        >
          <View style={[styles.scrollViewContent, { minHeight: height - Header.HEIGHT - StatusBar.currentHeight }]}>
            <Markdown>
              {topic.body}
            </Markdown>
          </View>
        </ScrollView>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Text style={[styles.title, { opacity: opacityContent }]}>
            {topic.title}
          </Animated.Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 8 }}>
            <Animated.Image
              style={[styles.profileImage, {
                opacity: opacityContent,
              }]}
              source={{ uri: topic.user.profile_image_url }}
            />
            <Animated.Text style={[styles.userName, { opacity: opacityContent }]}>
              {topic.user.id}
            </Animated.Text>
          </View>
        </Animated.View>
      </View >
    );
  }
}

export default DetailScreen;
