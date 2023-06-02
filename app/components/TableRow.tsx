import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  decrementFemaleFans,
  decrementMaleFans,
  decrementOtherFans,
  incrementFemaleFans,
  incrementMaleFans,
  incrementOtherFans,
} from '../redux/countersSlice';
import {toggleItemSelection} from '../redux/itemsSlice';
import {Item} from '../types/types';

export default function TableRow({item}: {item: Item}) {
  const dispatch = useDispatch();

  const onHeartPressed = item.isSelected
    ? () => {
        if (item.gender === 'female') {
          dispatch(decrementFemaleFans());
        } else if (item.gender === 'male') {
          dispatch(decrementMaleFans());
        } else {
          dispatch(decrementOtherFans());
        }
        dispatch(toggleItemSelection(item.name));
      }
    : () => {
        if (item.gender === 'female') {
          dispatch(incrementFemaleFans());
        } else if (item.gender === 'male') {
          dispatch(incrementMaleFans());
        } else {
          dispatch(incrementOtherFans());
        }
        dispatch(toggleItemSelection(item.name));
      };

  return (
    <View style={styles.tableRow}>
      <Pressable>
        <Icon
          name={item.isSelected ? 'heart' : 'heart-o'}
          size={16}
          color="red"
          style={styles.icon}
          onPress={onHeartPressed}
        />
      </Pressable>
      <Text style={styles.cellName}>{item.name}</Text>
      <Text style={styles.cell}>{item.birth_year}</Text>
      <Text style={styles.cell}>{item.gender}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  cellName: {
    flex: 2,
    padding: 3,
    paddingLeft: 10,
    color: '#000000',
  },
  cell: {
    flex: 1,
    padding: 3,
    paddingLeft: 10,
    color: '#000000',
  },
});
