import React, {useRef} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {WebView} from 'react-native-webview';

const ExternalPage = () => {
  const webViewRef = useRef(null);

  console.log(DeviceInfo.getUniqueId());

  // const openGoogleChrome = () => {
  //   Linking.openURL(
  //     'https://auth0.openai.com/u/login/identifier?state=hKFo2SBqVHVyY2RreFhtUGJ4WTdodFRzTWxya1hOTDdMYWpCYqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFlnZXJTY0hCbUY3MzNZUUE0dE9FdjBXZU1FY0xqa3djo2NpZNkgZEJQWVBIWDh4R1R1ZXBOaFhaSkN5Y3dzeXN0RHN3N1k',
  //   ); // Substitua com o URL que deseja abrir
  // };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://auth0.openai.com/u/login/identifier?state=hKFo2SBqVHVyY2RreFhtUGJ4WTdodFRzTWxya1hOTDdMYWpCYqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFlnZXJTY0hCbUY3MzNZUUE0dE9FdjBXZU1FY0xqa3djo2NpZNkgZEJQWVBIWDh4R1R1ZXBOaFhaSkN5Y3dzeXN0RHN3N1k',
        }}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExternalPage;
