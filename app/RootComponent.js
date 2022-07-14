/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Appearance, View, FlatList} from 'react-native';
import React from 'react';

import {gql, useQuery} from '@apollo/client';
import Loading from './components/Loading';
import Search from './components/Search';
import Filter from './components/Filter';
import Transactions from './components/Transactions';
import {groupBy, filterArrayObject} from './utils/helpers';

const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      id
      image
      receiver
      amount
      status
      types
      dateCreated
      timeCreated
    }
  }
`;

const filterData = [
  {
    id: 1,
    active: false,
    types: 'Status',
    data: ['Pending', 'Failed', 'Success'],
    initial: 'Status',
  },
  {
    id: 2,
    active: false,
    types: 'Types',
    data: ['Send', 'Received', 'Subscriptions'],
    initial: 'Types',
  },
];

const RootComponent = () => {
  const didMount = React.useRef(false);
  const darkMode = Appearance.getColorScheme() === 'dark';

  const {data, loading} = useQuery(TRANSACTIONS_QUERY);

  const [transactionData, setTransactionData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [filter, setFilter] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setTransactionData(groupBy(data.transactions, 'dateCreated'));
    }
  }, [data]);

  React.useEffect(() => {
    // Return early, if this is the first render:
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    // this is for apply filter call back so that to make sure it was called when the state has change
    applyFilter();
  }, [filter]);

  const handleSearch = text => {
    setSearchText(text);
    // call apply filter and get the filtered data incase there is one
    const searchData = applyFilter().filter(transaction =>
      transaction.receiver.toLowerCase().includes(text.toLowerCase()),
    );

    setTransactionData(groupBy(searchData, 'dateCreated'));
  };

  const applyFilter = () => {
    // check if we have data from server
    if (!data) {
      return;
    }
    // there is no filter return the unmodified data incase it came from search
    if (filter < 1) {
      setTransactionData(groupBy(data.transactions, 'dateCreated'));
      return data.transactions;
    }

    const result = filterArrayObject(data.transactions, filter);
    setTransactionData(groupBy(result, 'dateCreated'));
    return result;
  };

  const handleSetFilter = (type, filterValue) => {
    const removeFilterType = filter.filter(
      element => !(type.toLowerCase() in element),
    );

    const objKey = type.toLowerCase();
    const filterObj = {};
    filterObj[objKey] = filterValue;
    const currentFilter = [...removeFilterType, filterObj];
    setFilter(currentFilter);

    // apply filter will be called automatically when state has set
  };

  const handleClearFilter = type => {
    const removeFilterType = filter.filter(
      element => !(type.toLowerCase() in element),
    );

    const currentFilter = [...removeFilterType];
    setFilter(currentFilter);

    // apply filter will be called automatically when state has set
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container, darkMode && {backgroundColor: '#121212'}]}>
      <Search onChangeText={handleSearch} searchText={searchText} />
      <Filter
        filter={filterData}
        onFilterSelected={handleSetFilter}
        onFilterClear={handleClearFilter}
      />
      <View>
        <FlatList
          data={transactionData}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item}) => <Transactions transaction={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default RootComponent;
