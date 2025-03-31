import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ApolloProvider } from '@apollo/client';
import client from './services/apolloClient';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    //<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerTitle:"" }} />
        <Stack.Screen name="auth" options= {{headerTitle: ""}} />
        <Stack.Screen name="product" options= {{headerTitle: ""}} />
      </Stack>
    </ApolloProvider>
      //<StatusBar style="auto" />
    //</ThemeProvider>
  );
}
