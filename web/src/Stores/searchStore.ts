import { StateCreator } from "zustand";

export interface TsearchStore {
  search: string;
  setSearch: (value: string) => void;
}

export const useSearchStore: StateCreator<
  TsearchStore,
  [],
  [],
  TsearchStore
> = (set) => ({
  search: "",
  setSearch: (value) => {
    set(() => ({ search: value }));
  },
});
