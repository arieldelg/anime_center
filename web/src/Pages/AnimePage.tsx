import { useEffect, useState } from "react";
import GenresComponentCellphone from "../Components/GenresComponentCellphone";
import AnimeRecomendations from "../Components/AnimeRecomendations";
import { TAnimeGenerics, TAnimePage } from "../../../lib/types";

const AnimePage = () => {
  const [recommendations, setRecommendations] = useState<TAnimeGenerics[]>([]);
  const [allInfo, setAllInfo] = useState<TAnimePage | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(`https://api.jikan.moe/v4/top/anime?page=${pageNum}`, { signal })
      .then((res) => res.json())
      .then((data: TAnimePage) => {
        setRecommendations((prev) => [...prev, ...data.data]);
        setHasNextPage(Boolean(data.data.length));
        setAllInfo(data);
      })
      .catch((e) => {
        if (signal.aborted) return;
        console.log({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum]);

  return (
    <section className="flex flex-col">
      <GenresComponentCellphone />
      {allInfo !== null && (
        <AnimeRecomendations
          recommendations={recommendations}
          allInfo={allInfo}
          setPageNum={setPageNum}
          hasNextPage={hasNextPage}
        />
      )}
    </section>
  );
};

export default AnimePage;
