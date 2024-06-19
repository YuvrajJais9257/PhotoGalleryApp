import React, { useEffect, useReducer, useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getList } from "./api/picsum";
import { actionCreators, initialState, reducer } from "./reducers/photos";
import PhotoGrid from "./components/PhotoGrid";
import DetailsScreen from "./components/DetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const STORAGE_KEY = "photos";
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { photos, nextPage, loading, error } = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());
    try {
      const nextPhotos = await getList(nextPage);
      const updatedPhotos = [...photos, ...nextPhotos];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (error) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage, photos]);

  const loadPhotos = useCallback(async () => {
    try {
      const savedPhotos = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPhotos) {
        const parsedPhotos = JSON.parse(savedPhotos);
        dispatch(actionCreators.success(parsedPhotos, nextPage));
      }
    } catch (error) {
      console.error("Failed to load photos from storage", error);
    }
  }, [nextPage]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    if (!loading && photos.length === 0) {
      fetchPhotos();
    }
  }, [fetchPhotos, loading, photos.length]);

  if (loading && photos.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (error && photos.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Failed to load photos!</Text>
      </View>
    );
  }

  return (
    <PhotoGrid
      numColumns={2}
      photos={photos}
      onEndReached={fetchPhotos}
      onPress={(photo) => navigation.navigate("Details", { photo })}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
