import { PixelRatio } from "react-native";

const BASE_URL = `https://picsum.photos/v2`;
export async function getList(page = 1) {
  try {
    const response = await fetch(`${BASE_URL}/list?page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error("Fetching photos failed:", error);
    throw error;
  }
}

export function formatPhotoUri(id, width, height) {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = Math.floor(width * pixelDensity);
  const adjustedHeight = Math.floor(height * pixelDensity);
  return `https://picsum.photos/id/${id}/${adjustedWidth}/${adjustedHeight}`;
}
