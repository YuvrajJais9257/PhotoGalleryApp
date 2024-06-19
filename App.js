import React, { useEffect, useReducer, useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getList } from "./api/picsum";
import { actionCreators, initialState, reducer } from "./reducers/photos";
import PhotoGrid from "./components/PhotoGrid";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { photos, nextPage, loading, error } = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());
    try {
      const nextPhotos = await getList(nextPage);
      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (error) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      );
    }
  }

  return <PhotoGrid numColumns={2} photos={photos} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
