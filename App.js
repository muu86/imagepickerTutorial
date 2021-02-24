import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const player = useRef(null);
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState({});
  const [uploadStatus, setUploadStatus] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        permission,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(permission);
      if (permission !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickVideo = async () => {
    player.current.pauseAsync();
    setUploadStatus(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  const sendVideo = async () => {
    const formData = new FormData();
    formData.append("video", {
      name: "video_upload",
      type: "video/mp4",
      uri: video,
    });

    const result = await fetch("http://121.138.83.4:80/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }).catch((error) => console.log(error));

    console.log(String(result));

    console.log("upload success!");

    setUploadStatus(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        {uploadStatus && (
          <View style={styles.images}>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/0.png",
              }}
            ></Image>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/1.png",
              }}
            ></Image>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/2.png",
              }}
            ></Image>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/3.png",
              }}
            ></Image>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/4.png",
              }}
            ></Image>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/5.png",
              }}
            ></Image>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/6.png",
              }}
            ></Image>
            <Image
              style={styles.image}
              source={{
                uri: "http://121.138.83.4/static/output_images/7.png",
              }}
            ></Image>
          </View>
        )}
      </View>
      <Button title="Pick a video from camera roll" onPress={pickVideo} />
      <Video
        ref={player}
        style={styles.video}
        source={{
          uri: video,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? player.current.pauseAsync()
              : player.current.playAsync()
          }
        />
        <Button title="SEND" onPress={sendVideo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  imagesContainer: {
    flex: 2,
  },
  images: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
  },
  video: {
    flex: 3,
    alignSelf: "center",
    width: 700,
    height: 500,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
