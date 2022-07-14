import * as FC from 'react-native-format-currency';

export const groupBy = (array, key) => {
  // create reduced array
  const obj = array.reduce((result, currentItem) => {
    // If an array already present for key, push it to the array. Otherwise create an array and push the object.
    (result[currentItem[key]] = result[currentItem[key]] || []).push(
      currentItem,
    );
    // return the current iteration `result` value, this will be the next iteration's `result` value and accumulate
    return result;
  }, {}); // Empty object is the initial value for result object

  let groupData = [];

  Object.keys(obj).forEach(item => {
    let objectKey = item;
    let result = {};
    result[objectKey] = obj[objectKey];

    groupData.push(result);
  });

  return groupData;
};

export const filterArrayObject = (array, filter) => {
  let filteredData = array;

  for (var x = 0; x < filter.length; x++) {
    const key = Object.keys(filter[x]).toString();
    const filtered = filteredData.filter(
      element => element[key].toLowerCase() === filter[x][key].toLowerCase(),
    );
    filteredData = filtered;
  }

  return filteredData;
};

export const formatCurrency = inputValue => {
  const [vs, vfw, symbol] = FC.formatCurrency({
    amount: Number(inputValue),
    code: 'AUD',
  });

  return vs.replace('$ ', '₦');
};
