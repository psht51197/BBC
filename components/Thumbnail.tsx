import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Button
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Channel } from "./Model";
import { Video } from "expo-av";
import { useState } from "react";
import * as AppLink from "react-native-app-link";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    aspectRatio: 640 / 360
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  },
  content: {
    padding: 16,
    flexDirection: "row"
  },
  info: {
    flex: 4
  },
  control: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  type: {
    color: "white",
    fontWeight: "bold"
  },
  title: {
    color: "white",
    fontSize: 24
  },
  subtitle: {
    color: "white",
    fontSize: 18
  }
});

interface ThumbnailProps {
  channel: Channel;
}

export default ({ channel: { type, title, subtitle } }: ThumbnailProps) => {
  const volume = new Animated.Value(0);
  const volumeInterpol = volume.interpolate({
    inputRange: [-10, 0],
    outputRange: [0, 10]
  });
  console.log(volumeInterpol);
  const [isPlay, setIsPlay] = useState(false);
  let vid: any;
  async function onPlay() {
    setIsPlay(true);
    await vid.playAsync();
  }
  function openOnApp() {
    const appName = "facebook";
    const appStoreId = "id284882215";
    const playStoreId = "com.facebook.katana";
    AppLink.maybeOpenURL("fb://", { appName, appStoreId, playStoreId }).catch(
      err => console.log(err)
    );
  }

  async function onPause() {
    setIsPlay(false);
    await vid.pauseAsync();
  }
  return (
    <>
      <View style={styles.container}>
        <Video
          ref={c => {
            return (vid = c);
          }}
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          style={styles.cover}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.control}>
          {!isPlay ? (
            <TouchableOpacity onPress={onPlay}>
              <Icon size={40} color={"#FFFFFF"} name="play-arrow" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPause}>
              <Icon size={40} color={"#FFFFFF"} name="pause" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <Button title={"Open On App"} onPress={openOnApp} />
      </View>
    </>
  );
};
