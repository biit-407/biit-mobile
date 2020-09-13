import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoadAssets } from './components'

const fonts = {
  "SFProDisplay-Bold": require('./assets/fonts/SF-Pro-Display-Bold.otf')
}

export default function App() {
  return (
    <LoadAssets {... {fonts}} >
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </LoadAssets>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
