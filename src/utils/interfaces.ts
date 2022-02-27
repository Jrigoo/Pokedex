export interface IPokemons {
  id: number;
  name: string;
  type: number;
  order: number;
  image: string;
}

export interface IStats {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface IAbilities {
  ability: {
    name: String;
    url: String;
  };
  is_hidden: Boolean;
  slot: number;
}

export interface ITypes {
  slot: number;
  type: { name: string; url: string };
}

export interface IPokemon {
  id: number;
  name: string;
  type: number;
  order: number;
  image: string;
  abilities: Array<IAbilities>;
  height: number;
  stats: Array<IStats>;
  types: Array<ITypes>;
  weight: number;
}
