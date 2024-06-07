import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { paginationArray } from "../Functions/Functions.ts";
import AllAnime from "./AllAnime";
import { useBoundStore } from "../Stores/boundleStore.js";
import { TcategoryMovieData } from "../lib/types.ts";

const CategoryMovie = () => {
  const url = useLocation();
  const [info, setInfo] = useState<TcategoryMovieData | null>(null);
  const genrePage = useBoundStore((state) => state.genrePage);
  const setReset = useBoundStore((state) => state.setReset);
  const setGenreArray = useBoundStore((state) => state.setGenreArray);
  useEffect(() => {
    setReset(false);
    try {
      fetch(
        `https://api.jikan.moe/v4/anime?genres=${url.state.id}&page=${genrePage}`
      )
        .then((response) => response.json())
        .then((data) => {
          setInfo(data);
          if (genrePage === 1) {
            const newArray = paginationArray(data.pagination.last_visible_page);
            setGenreArray(newArray);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [url.state.id, genrePage]);
  return (
    <>
      CategoryMovie {url.state.name}
      {info !== null && <AllAnime anime={info.data} info={info} />}
    </>
  );
};

export default CategoryMovie;
