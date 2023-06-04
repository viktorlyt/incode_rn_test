import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import IconE from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {clearFans} from '../../redux/countersSlice';
import {
  fetchItemsRequest,
  setAllItemsNotSelected,
} from '../../redux/itemsSlice';
import {useTypedSelector} from '../../redux/store';
import {RenderRow} from '../../components/RenderRow';
import {Counter} from '../../components/Counter';
import {styles} from './styles';

export default function Main(): JSX.Element {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const {items, loading, error, currentPage, totalItems, totalPages} =
    useTypedSelector(state => state.items);
  const [visibleItems, setVisibleItems] = useState<Item[]>(items);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'sort'>('asc');

  useEffect(() => {
    dispatch(fetchItemsRequest(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filteredItems = items.filter(({name}) =>
        name.toLowerCase().includes(lowerQuery),
      );
      setVisibleItems(filteredItems);
    } else {
      setVisibleItems(items);
    }
  }, [query, items]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      dispatch(fetchItemsRequest(page));
    }
  };

  const handleQuery = (text: string) => {
    setQuery(text);
  };

  const keyExtractor = (item: Item) => item.name;

  const renderPagination = () => {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    const handlePrevPage = () => {
      if (currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    };

    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>
          {startIndex}-{endIndex} of {totalItems}
        </Text>
        <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1}>
          <Text style={styles.paginationArrow}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}>
          <Text style={styles.paginationArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onClearFansPressed = () => {
    dispatch(setAllItemsNotSelected());
    dispatch(clearFans());
  };

  const onSortPressed = useCallback(() => {
    const unsortedItems = query === '' ? [...items] : [...visibleItems];

    const newSortOrder =
      sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'sort' : 'asc';
    setSortOrder(newSortOrder);

    let sortedItems = [...visibleItems].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'desc') {
        return b.name.localeCompare(a.name);
      } else {
        return 0;
      }
    });

    if (sortOrder === 'sort') {
      sortedItems = [...unsortedItems];
    }

    setVisibleItems(sortedItems);
  }, [items, query, sortOrder, visibleItems]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Fans</Text>
          <Button title="CLEAR FANS" onPress={onClearFansPressed} />
        </View>
        <View style={styles.counters}>
          <Counter text="Female Fans" />
          <Counter text="Male Fans" />
          <Counter text="Others" />
        </View>
        <View style={styles.counterBox}>
          <View style={styles.searchBox}>
            <IconE name="search" size={30} color="#000" />
            <TextInput
              placeholder="Search"
              id="search"
              value={query}
              onChangeText={handleQuery}
            />
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Icon name="heart" size={16} color="#000" style={styles.icon} />
              <Text style={styles.cellName}>Name</Text>
              <TouchableOpacity onPress={onSortPressed}>
                <Icon
                  name={
                    sortOrder === 'asc'
                      ? 'sort-asc'
                      : sortOrder === 'desc'
                      ? 'sort-desc'
                      : 'sort'
                  }
                  size={16}
                  color="#000"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.cell}>Birth Year</Text>
              <Text style={styles.cell}>Gender</Text>
            </View>
            <View>
              <FlatList
                data={visibleItems}
                keyExtractor={keyExtractor}
                renderItem={({item}) => <RenderRow item={item} />}
              />
              {renderPagination()}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
