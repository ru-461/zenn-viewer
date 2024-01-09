import { useEffect, useState } from 'react';

import { useColorScheme } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // 読み込みステート
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // 解除
      SplashScreen.hideAsync();
      setReady(true);
    }, 5000);
  }, []);

  if (!isReady) {
    return null;
  }

  return <RootLayoutNav />;
};
export default RootLayout;

const RootLayoutNav = () => {
  // カラースキーム取得
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};
