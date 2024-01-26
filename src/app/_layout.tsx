import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  // Fetch Articles
  const { data } = useSWR('https://zenn.dev/api/articles', fetcher);

  if (data) {
    SplashScreen.hideAsync();
    return <RootLayoutNav />;
  }
};
export default RootLayout;

const RootLayoutNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SWRConfig value={{ fetcher: fetcher }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SWRConfig>
    </GestureHandlerRootView>
  );
};
