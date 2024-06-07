import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { paginationArray } from "../Functions/Functions.ts";
import AllAnime from "./AllAnime";
import { useBoundStore } from "../Stores/boundleStore.js";
import { TAnimeGenerics, TSearchAnimeData } from "../lib/types.ts";

const SearchPage = () => {
  const genrePage = useBoundStore((state) => state.genrePage);
  const setGenreArray = useBoundStore((state) => state.setGenreArray);
  const search = useBoundStore((state) => state.search);
  const setSearch = useBoundStore((state) => state.setSearch);
  const [info, setInfo] = useState<TSearchAnimeData | null>(null);
  const [anime, setAnime] = useState<TAnimeGenerics[]>([]);
  const [debaunceSearch] = useDebounce(search, 300);
  useEffect(() => {
    try {
      if (debaunceSearch.length > 0) {
        fetch(
          `https://api.jikan.moe/v4/anime?q=${debaunceSearch}&page=${genrePage}`
        )
          .then((response) => response.json())
          .then((data) => {
            const newArray: TAnimeGenerics[] = [...data.data];
            let array: TAnimeGenerics[] = [];
            newArray.forEach((element) => {
              if (array.length === 0) {
                return array.push(element);
              } else if (element.mal_id !== array[array.length - 1].mal_id) {
                return array.push(element);
              }
              return array;
            });
            setAnime(array);
            console.log(data);
            setInfo(data);
            if (genrePage === 1) {
              const arrayNumberPagination = paginationArray(
                data.pagination.last_visible_page
              );
              setGenreArray(arrayNumberPagination);
            }
          });
      } else if (debaunceSearch.length === 0) {
        setAnime([]);
        setInfo(null);
        setGenreArray([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [debaunceSearch, genrePage]);
  console.log(anime);
  return (
    <section className="w-full h-full ">
      <div className="w-full bg-teal-400 h-[200px]">
        <input
          name="animeSearch"
          id="animeSearch"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-full px-4 text-4xl font-medium outline-none"
        />
      </div>
      {info !== null && <AllAnime info={info} anime={anime} />}
    </section>
  );
};

export default SearchPage;
