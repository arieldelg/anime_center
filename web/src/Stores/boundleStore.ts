import { create } from "zustand";
import { TitemStore, useItemStore } from "./itemsStore";
import { TsearchStore, useSearchStore } from "./searchStore";
import { persist } from "zustand/middleware";

export const useBoundStore = create<TitemStore & TsearchStore>()(
  persist(
    (...a) => ({
      ...useItemStore(...a),
      ...useSearchStore(...a),
    }),
    {
      name: "anime_store",
      partialize: (state) => ({
        genrePage: state.genrePage,
        genreArray: state.genreArray,
        currentPages: state.currentPages,
        currentSet: state.currentSet,
        search: state.search,
      }),
    }
  )
);
