import { useCallback, useRef } from "react";
import { TAnimeGenerics, TAnimePage } from "../../../api/src/lib/types";
import React from "react";
import { Link } from "react-router-dom";

type AnimeRecomendationsProps = {
  allInfo: TAnimePage;
  recommendations: TAnimeGenerics[];
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  hasNextPage: boolean;
};

const AnimeRecomendations = ({
  recommendations,
  setPageNum,
  hasNextPage,
}: AnimeRecomendationsProps) => {
  const intObserver = useRef<null | IntersectionObserver>(null);
  const lastPostRef = useCallback(
    (post: HTMLElement) => {
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((post) => {
        if (post[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [hasNextPage, setPageNum]
  );
  const content = recommendations.map((element, i) => {
    if (recommendations.length === i + 1) {
      return (
        <figure
          key={element.mal_id}
          ref={lastPostRef}
          className="flex flex-col items-center w-full h-full"
        >
          <Link to={`/${element.title}`} state={element}>
            <div className="h-[287px] flex">
              <img
                src={element.images.jpg.image_url}
                alt={element.title}
                height={280}
                width={190}
              />
            </div>
          </Link>
          <p>{element.title}</p>
        </figure>
      );
    }
    <input type="text" />;
    return (
      <figure
        key={element.mal_id}
        className="flex flex-col items-center w-full h-full"
      >
        <Link to={`/${element.title}`} state={{ id: element.mal_id }}>
          <div className="h-[287px] flex">
            <img
              src={element.images.jpg.image_url}
              alt={element.title}
              height={280}
            />
          </div>
        </Link>
        <p>{element.title}</p>
      </figure>
    );
  });
  if (recommendations.length > 0) {
    return (
      <section className="w-full h-full px-4 ">
        <h1 className="text-2xl font-bold pb-4">Our Recommendations</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 pb-20">{content}</div>
      </section>
    );
  }
};

export default AnimeRecomendations;
