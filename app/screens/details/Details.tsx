import React from 'react';
import {ScrollView, View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './styles';

type DetailsProps = {
  route: {
    params: {
      item: Item;
    };
  };
};

const Details: React.FC<DetailsProps> = function ({route}) {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {item} = route.params;

  const onBackArrowPressed = () => {
    navigate('Main');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Pressable onPress={onBackArrowPressed}>
          <Text style={styles.text}>
            name: <Text style={styles.text1}>{item.name}</Text>
          </Text>
          <Text style={styles.text}>
            birth_year: <Text style={styles.text1}>{item.birth_year}</Text>
          </Text>
          <Text style={styles.text}>
            gender: <Text style={styles.text1}>{item.gender}</Text>
          </Text>
          <Text style={styles.text}>
            mass: <Text style={styles.text1}>{item.mass}</Text>
          </Text>
          <Text style={styles.text}>
            height: <Text style={styles.text1}>{item.height}</Text>
          </Text>
          <Text style={styles.text}>
            eye_color: <Text style={styles.text1}>{item.eye_color}</Text>
          </Text>
          <Text style={styles.text}>
            hair_color: <Text style={styles.text1}>{item.hair_color}</Text>
          </Text>
          <Text style={styles.text}>
            skin_color: <Text style={styles.text1}>{item.skin_color}</Text>
          </Text>
          <Text style={styles.text}>
            created: <Text style={styles.text1}>{item.created}</Text>
          </Text>
          <Text style={styles.text}>
            edited: <Text style={styles.text1}>{item.edited}</Text>
          </Text>
          <Text style={styles.text}>
            homeworld: <Text style={styles.text1}>{item.homeworld}</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Details;
