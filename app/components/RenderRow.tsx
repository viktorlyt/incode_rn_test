import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TableRow from './TableRow';

export const RenderRow: React.FC<{item: Item}> = ({item}) => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onTableRowPressed = () => {
    navigate('Details', {item});
  };

  return (
    <TouchableOpacity onPress={onTableRowPressed}>
      <TableRow item={item} />
    </TouchableOpacity>
  );
};
