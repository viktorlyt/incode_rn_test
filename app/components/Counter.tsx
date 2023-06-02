import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTypedSelector} from '../redux/store';

export const Counter = ({text}: {text: string}) => {
  const {femaleFans, maleFans, otherFans} = useTypedSelector(
    state => state.counters,
  );

  let count;

  if (text === 'Female Fans') {
    count = femaleFans;
  } else if (text === 'Male Fans') {
    count = maleFans;
  } else {
    count = otherFans;
  }

  return (
    <View style={styles.counterBox}>
      <Text style={styles.text_counterBoxNumber}>{count}</Text>
      <Text style={styles.text_counterBox}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterBox: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  text_counterBoxNumber: {
    fontSize: 26,
    color: 'black',
  },
  text_counterBox: {
    color: 'black',
  },
});
