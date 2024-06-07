import { StateCreator } from "zustand";
import { Tdata } from "../../../lib/types";

export interface TitemStore {
  genrePage: number;
  genreArray: number[];
  currentSet: number;
  currentPages: number[];
  reset: boolean;
  genre: Tdata[];
  changeSection: string;
  setGenrePage: (value: number) => void;
  setGenreArray: (value: number[]) => void;
  setCurrentSet: (value: number) => void;
  setCurrentPages: (value: number[]) => void;
  setReset: (value: boolean) => void;
  setGenre: (value: Tdata[]) => void;
  setChangeSection: (value: string) => void;
}

export const useItemStore: StateCreator<TitemStore, [], [], TitemStore> = (
  set
) => ({
  genrePage: 1,
  setGenrePage: (value) => {
    set(() => ({ genrePage: value }));
  },
  genreArray: [],
  setGenreArray: (value) => {
    set(() => ({ genreArray: value }));
  },
  currentSet: 1,
  setCurrentSet: (value) => {
    set(() => ({ currentSet: value }));
  },
  currentPages: [],
  setCurrentPages: (value) => {
    set(() => ({ currentPages: value }));
  },
  reset: false,
  setReset: (value) => {
    set(() => ({ reset: value }));
  },
  genre: [],
  setGenre: (value) => {
    set(() => ({ genre: value }));
  },
  changeSection: "news",
  setChangeSection: (value) => {
    set(() => ({ changeSection: value }));
  },
});
