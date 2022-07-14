import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import FilterCard from './FilterCard';

export default function Filter({
  onFilterSelected = () => {},
  onFilterClear = () => {},
  filter = [],
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={filter}
        keyExtractor={(item, index) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <FilterCard
            filter={item}
            onFilterSelected={onFilterSelected}
            onFilterClear={onFilterClear}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
