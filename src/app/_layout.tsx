import { useEffect, useState } from 'react';

import { useColorScheme } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { SWRConfig } from 'swr';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const fetcher = async (url: string): Promise<unknown> => {
  const res = await fetch(url);
  return res.json();
};

const RootLayout = () => {
  // 読み込みステート
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
    setReady(true);
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
    <SWRConfig value={{ fetcher: fetcher }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SWRConfig>
  );
};
