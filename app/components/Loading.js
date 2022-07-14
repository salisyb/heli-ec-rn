import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({});
