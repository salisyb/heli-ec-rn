import {StyleSheet, TextInput, View, Appearance} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';

export default function Search({searchText, onChangeText = () => {}}) {
  const darkMode = Appearance.getColorScheme();
  const textColor = darkMode === 'dark' ? '#FFFFFF' : '#000000';
  const boxColor = darkMode === 'dark' ? '#1f1b24' : '#FFFFFF';

  const [isInputFocus, setIsInputFocus] = React.useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchWrapper,
          {backgroundColor: boxColor},
          isInputFocus && {borderWidth: 1, borderColor: 'yellow'},
        ]}>
        <TextInput
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => onChangeText(text)}
          placeholder={'Search'}
        />
        <Feather name="search" size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  // search box
  searchWrapper: {
    width: '100%',
    height: 50,

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1b24',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
