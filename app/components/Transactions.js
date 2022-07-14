import {StyleSheet, Text, View, Appearance, FlatList} from 'react-native';
import React from 'react';
import TransactionCard from './TransactionCard';

export default function Transactions({transaction}) {
  const darkMode = Appearance.getColorScheme();
  const textColor = darkMode === 'dark' ? '#FFFFFF' : '#000000';
  const boxColor = darkMode === 'dark' ? '#1f1b24' : '#FFFFFF';

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyDate}>
        {Object.keys(transaction).toString()}
      </Text>
      <View style={[styles.historyWrapper, {backgroundColor: boxColor}]}>
        {transaction[Object.keys(transaction).toString()].map(item => (
          <TransactionCard key={item.id} data={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 10,
  },
  historyDate: {
    paddingHorizontal: 20,
  },
  historyWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
