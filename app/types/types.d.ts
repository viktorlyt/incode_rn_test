type RootStackParamList = {
  Main: undefined;
  Details: {item: Item};
};

interface Item {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: [];
  created: string;
  edited: string;
  url: string;
  isSelected: boolean;
}
