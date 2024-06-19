import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { formatPhotoUri } from "../api/picsum";

export default function DetailsScreen({ route }) {
  const { photo } = route.params;
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: formatPhotoUri(photo.id, width, width) }}
        style={styles.image}
      />
      <Text style={styles.text}>Author: {photo.author}</Text>
      <Text style={styles.text}>Width: {photo.width}</Text>
      <Text style={styles.text}>Height: {photo.height}</Text>
      <Text style={styles.text}>URL: {photo.url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
