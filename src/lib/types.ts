export type Tdata = {
  count: number;
  mal_id: number;
  name: string;
  url: string;
};

export type TcategoryMovieData = {
  data: TAnimeGenerics[];
  pagination: Tpagination;
};

export type TSearchAnimeData = {
  data: TAnimeGenerics[];
  pagination: Tpagination;
};

export type TAnimePage = {
  data: TAnimeGenerics[];
  pagination: Tpagination;
};

export type Tpagination = {
  current_page?: number;
  has_next_page: boolean;
  items?: {
    count?: number;
    total?: number;
    per_page?: number;
  };
  last_visible_page: number;
};

/* */
//Anime that gives you recomendation but user indivudualy not by global score

export type Trecomendation = {
  // this would be on data: Trecomendation[] in case we use it
  mal_id: string;
  entry: Entry[];
  content: string;
  date: Date;
  user: User;
};

type Entry = {
  mal_id: number;
  url: string;
  images: Images; // shared
  title: string;
};

type User = {
  url: string;
  username: string;
};

export type TAnimeGenerics = {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Demographic[];
  licensors: Demographic[];
  studios: Demographic[];
  genres: Demographic[];
  explicit_genres: any[];
  themes: Demographic[];
  demographics: Demographic[];
};

type Aired = {
  from: Date;
  to: Date;
  prop: Prop;
  string: string;
};

type Prop = {
  from: From;
  to: From;
};

type From = {
  day: number;
  month: number;
  year: number;
};

type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

type Demographic = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Title = {
  type: string;
  title: string;
};

type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: SizeImages;
};

type Images = {
  jpg: SizeImages;
  webp: SizeImages;
};

type SizeImages = {
  image_url: string;
  small_image_url: string;
  medium_image_url?: string;
  large_image_url: string;
  maximum_image_url?: string;
};

// anime cast
export type Data = {
  data: CharacterAnime[];
};

export type CharacterAnime = {
  character: Character;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
};

type VoiceActor = {
  person: Person;
  language: string;
};

type Person = {
  mal_id: number;
  url: string;
  images: PersonImages;
  name: string;
};

type PersonImages = {
  jpg: Jpg;
};

type Character = {
  mal_id: number;
  url: string;
  images: CharacterImages;
  name: string;
};

type CharacterImages = {
  jpg: Jpg;
  webp: Webp;
};

type Jpg = {
  image_url: string;
};

type Webp = {
  image_url: string;
  small_image_url: string;
};

// Anime FULL

export type DataAnimeFULL = {
  data: AnimeFULL;
};

export type AnimeFULL = {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Demographic[];
  licensors: Demographic[];
  studios: Demographic[];
  genres: Demographic[];
  explicit_genres: any[];
  themes: Demographic[];
  demographics: Demographic[];
  relations: any[];
  theme: Theme;
  external: External[];
  streaming: External[];
};

type External = {
  name: string;
  url: string;
};

type Theme = {
  openings: string[];
  endings: string[];
};

// type useLocation

export interface Location<State = IDLocation> extends Path {
  state: State;
  key: string;
}

type IDLocation = {
  id: number;
};

type Path = {
  pathname: string;
  search: string;
  hash: string;
};

//type Actor Voice

export type ActorVoiceData = {
  data: ActorVoice;
};

export type ActorVoice = {
  mal_id: number;
  url: string;
  website_url: null;
  images: ActorImages;
  name: string;
  given_name: string;
  family_name: string;
  alternate_names: any[];
  birthday: string;
  favorites: number;
  about: string;
  anime: AnimeElement[];
  manga: any[];
  voices: Voice[];
};

type AnimeElement = {
  position: string;
  anime: AnimePositions;
};

type AnimePositions = {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
};

type ActorImages = {
  jpg: Jpg;
};

type Voice = {
  role: string;
  anime: AnimePositions;
  character: Character;
};
