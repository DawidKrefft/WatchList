export type Movie = {
  id: number;
  poster_path?: string;
  title: string;
  release_date: string | Date;
  genre_ids?: number[];
};

export type Genre = {
  id: number;
  name: string;
};
