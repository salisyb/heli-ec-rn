/* eslint-disable react-native/no-inline-styles */
import {Appearance, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Feather from 'react-native-vector-icons/Feather';

export default function FilterCard({
  filter,
  onFilterSelected = () => {},
  onFilterClear = () => {},
}) {
  const darkMode = Appearance.getColorScheme() === 'dark';
  const textColor = darkMode ? '#FFFFFF' : '#000000';
  const boxColor = darkMode ? '#1f1b24' : '#FFFFFF';

  const [filterState, setFilterState] = React.useState(false);
  const dropdownRef = React.useRef({});

  const handleClearFilter = filterType => {
    dropdownRef.current.reset();
    setFilterState(false);
    onFilterClear(filterType);
  };

  const handleSelectedFilter = (type, text, index) => {
    setFilterState(true);
    onFilterSelected(type, text);
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        ref={dropdownRef}
        buttonStyle={{
          ...styles.filterWrapper,
          ...{
            backgroundColor: boxColor,
            padding: 0,
            justifyContent: 'flex-end',
          },
        }}
        defaultButtonText={filter.types}
        selectedRowStyle={{backgroundColor: 'yellow'}}
        buttonTextStyle={{color: textColor}}
        data={filter.data}
        onSelect={(selectedItem, index) => {
          handleSelectedFilter(filter.types, selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      {filterState && (
        <Pressable
          style={styles.clearButton}
          onPress={() => handleClearFilter(filter.types)}>
          <Feather name="x" color={textColor} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    height: 50,
  },
  //filter
  filterWrapper: {
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    width: 130,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 5,
  },
  clearButton: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
  },
});
