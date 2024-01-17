import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import useSWR, { SWRConfig } from 'swr';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const fetcher = async (url: string): Promise<unknown> => {
  const res = await fetch(url);
  return res.json();
};

const RootLayout = () => {
  const { data } = useSWR('https://', fetcher);

  if (data) {
    SplashScreen.hideAsync();
    return <RootLayoutNav />;
  }
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
