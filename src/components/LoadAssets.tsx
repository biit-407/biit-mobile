/**
 * @name LoadAssets
 * @author Stephen Davis
 * @description Component to Load assets when a react native application is launched.
 * @example
 * # App.tsx
 *
 * import { LoadAssets } from './src/components';
 *
 * const fonts = {
 *    fontname: './assets/fonts/fontname.otf'
 * }
 *
 * const App = () => {
 *      return (
 *          <LoadAssets { ... {fonts}}>
 *              <AppNavigation />
 *          </LoadAssets>
 *      );
 * }
 */

import React, { useEffect, useState, ReactElement, useCallback } from "react";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Constants from "expo-constants";
import { Asset } from "expo-asset";
import { InitialState, NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";

import theme from "../theme";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest.sdkVersion}`;

export type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (promises: Promise<void | void[]>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  fonts?: FontSource;
  assets?: number[];
  saveState?: boolean;
  children: ReactElement | ReactElement[];
}

const LoadAssets = ({
  assets,
  fonts,
  saveState,
  children,
}: LoadAssetsProps) => {
  // will save navigation state when refreshing a developer build
  const [isNavigationReady, setIsNavigationReady] = useState(!saveState); // __DEV__
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], fonts || {});
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);

  const onStateChange = useCallback(
    (state) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );

  if (!ready || !isNavigationReady) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer {...{ onStateChange, initialState }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NavigationContainer>
  );
};

export default LoadAssets;
