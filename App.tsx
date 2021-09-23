/**
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Form from './src/screens/form'
import {UnitProvider} from './src/context/unitContext'

const App = () => {

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scroll}
      >
          <UnitProvider>
            <Form/>
          </UnitProvider>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex:1,
  }
})

export default App;
