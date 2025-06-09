import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export async function requestPermissions() {
  try {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    return {
      camera: cameraStatus === 'granted',
      media: mediaStatus === 'granted',
      location: locationStatus === 'granted',
    };
  } catch (error) {
    console.warn('Error requesting permissions', error);
    return { camera: false, media: false, location: false };
  }
}
