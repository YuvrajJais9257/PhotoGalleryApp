import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  TouchableOpacity,
} from "react-native";
import { formatPhotoUri } from "../api/picsum";

export default function PhotoGrid({
  photos,
  numColumns,
  onEndReached,
  onPress,
}) {
  const { width } = Dimensions.get("window");
  const size = PixelRatio.roundToNearestPixel(width / numColumns);

  return (
    <FlatList
      data={photos}
      keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure key is unique
      numColumns={numColumns}
      key={numColumns}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPress(item)}>
          <Image
            source={{
              width: size,
              height: size,
              uri: formatPhotoUri(item.id, size, size),
            }}
            style={{ width: size, height: size }}
          />
        </TouchableOpacity>
      )}
    />
  );
}
