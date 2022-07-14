import {StyleSheet, Text, View, Appearance, Image} from 'react-native';
import React from 'react';
import {formatCurrency} from '../utils/helpers';

export default function TransactionCard({data}) {
  const darkMode = Appearance.getColorScheme() === 'dark';
  const textColor = darkMode ? '#FFFFFF' : '#000000';
  const boxColor = darkMode ? '#1f1b24' : '#FFFFFF';

  return (
    <View style={styles.historyWrapper}>
      <View
        style={[
          styles.historyIcon,
          !darkMode ? {backgroundColor: 'black'} : {backgroundColor: 'white'},
        ]}>
        <Image source={{uri: data.image}} style={styles.avatar} />
      </View>
      <View style={styles.historyInfoLeft}>
        <Text style={styles.historyText}>{data.receiver}</Text>
        <Text style={styles.historyTime}>{data.timeCreated}</Text>
      </View>
      <View>
        <Text
          style={[
            styles.historyInfoRight,
            data.types.toLowerCase() === 'received'
              ? {color: 'green'}
              : {color: 'red'},
          ]}>
          {data.types.toLowerCase() === 'received'
            ? `+ ${formatCurrency(data.amount)}`
            : `- ${formatCurrency(data.amount)}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyWrapper: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#505050',
  },
  historyIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  historyInfoLeft: {
    flex: 1,
    paddingHorizontal: 10,
  },
  historyText: {},
  historyTime: {},
  historyInfoRight: {},
});
