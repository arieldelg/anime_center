import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  AnimeFULL,
  CharacterAnime,
  Data,
  DataAnimeFULL,
  Location,
} from "../lib/types";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import "./AnimeDetail.css";
import { titles } from "../stylesTailwind/variables";

type Scroll = {
  y: number;
  yLast: number;
};

const AnimeDetail = () => {
  const url: Location = useLocation();
  const { id } = url.state;
  const navigate = useNavigate();

  const [scrollData, setScrollData] = useState<Scroll>({
    y: 0,
    yLast: 0,
  });
  const [hideShadow, setHideShadow] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [characters, setCharacters] = useState<CharacterAnime[]>([]);
  const [animeFUll, setAnimeFULL] = useState<AnimeFULL>();
  const [test, setTest] = useState<number>(0);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const handleScroll = () => {
      setScrollData((prev) => {
        return {
          y: window.scrollY,
          yLast: prev.y,
        };
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollData.y > scrollData.yLast) {
      if (scrollData.y > 700) {
        setTest(1);
      }
      if (scrollData.y <= 700) {
        const inicial = Math.round((scrollData.y * 100) / 700) / 100;
        setTest(inicial);
      }
      if (scrollData) setHideShadow("scrollDown");
    }
    if (scrollData.y < scrollData.yLast) {
      if (scrollData.y <= 700) {
        const inicial = Math.round((scrollData.y * 100) / 700) / 100;
        setTest(inicial);
      }
    }
    if (scrollData.y === 0) setHideShadow("initialPosition");
  }, [scrollData]);

  useEffect(() => {
    const request1 = fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    ).then((res) => {
      if (res.status < 500 && res.status >= 400)
        console.log("ERROR ON THE RESPONSE CHARACTERS");
      if (!res.ok) return;
      return res.json();
    });
    const request2 = fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then(
      (res) => {
        if (res.status < 500 && res.status >= 400)
          console.log("ERROR ON THE RESPONSE ANIME FULL");
        if (!res.ok) return;
        return res.json();
      }
    );
    Promise.all([request1, request2])
      .then(([data1, data2]: [Data, DataAnimeFULL]) => {
        setCharacters(data1.data);
        setAnimeFULL(data2.data);
        let newText: string = data2.data.synopsis;
        let output: string | string[] = "";
        if (newText.includes("[Written by MAL Rewrite]")) {
          output = newText
            .split(`\n\n`)
            .slice(0, output.length - 1)
            .join(" ");
          setText(output);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleText = () => {
    let trimText: string = "";
    if (text.length > 250) {
      trimText = text.substring(0, 250);
    }
    return `${trimText}...   `;
  };

  const handleBackend = (id: number) => {
    fetch("http://localhost:5174/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  };

  if (animeFUll !== undefined)
    return (
      <section className="w-screen h-screen">
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(36,36,36,1), rgba(36,36,36,${test}))`,
          }}
          id="scrollShadow"
          className={`fixed z-20 top-0 left-0 w-full h-20 flex px-4`}
        >
          <ArrowLeftIcon className="w-8" onClick={() => navigate(-1)} />
        </div>

        <figure className="fixed top-0 left-0 w-full h-3/4 flex flex-col items-center -z-10">
          <div className=" w-full h-full">
            <img
              src={animeFUll.images.webp.large_image_url}
              alt={animeFUll.title}
              className="h-full object-cover"
            />
          </div>
        </figure>

        <div
          className={`z-10 overflow-y-visible h-1/4 absolute bottom-0 rounded-md w-full ${
            hideShadow === "scrollDown" ? "shadow-top-anime" : null
          }`}
        >
          <div className="bg-color-anime rounded-xl pt-2 px-4 pb-4">
            <h1 className=" text-4xl font-bold pb-2">{animeFUll.title}</h1>

            <div className="grid grid-cols-3 py-4 items-center">
              <div className="flex flex-col items-center">
                <p className={titles}>Raiting</p>
                <p>{animeFUll.score}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center">
                  <p className={titles}>Status</p>
                  <p>{animeFUll.status}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className={titles}>Year</p>
                <p>{animeFUll.year}</p>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-3 pb-4">
              <div className="flex flex-col items-center">
                <p className={titles}>Type</p>
                <p>{animeFUll.type}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className={titles}>Episodes</p>
                <p>{animeFUll.episodes}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className={titles}>Duration</p>
                <p>{animeFUll.duration}</p>
              </div>
            </div>

            <div className="w-full py-4 flex flex-col items-center">
              <p className={titles}>Genres</p>
              <div className="w-full flex space-x-4 justify-center py-2">
                {animeFUll.genres.map((element) => {
                  return (
                    <p key={element.mal_id} className="text-xl">
                      {element.name}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className={titles}>Where to watch</p>
              <div className="py-2 flex flex-col items-center">
                <div className="w-16 h-16">
                  <img
                    src={
                      "https://seeklogo.com/images/C/crunchyroll-logo-ED92B45335-seeklogo.com.png"
                    }
                    alt={animeFUll.streaming[0]?.name}
                    className="rounded-lg"
                  />
                </div>
                <p className="text-lg font-bold">
                  {animeFUll.streaming[0]?.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-2 py-4">
              <p className={titles}>Synopsis</p>
              <p className="text-justify">
                {showMore ? text : handleText()}
                <button
                  className="relative transition-all"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  <ChevronDownIcon
                    className={`w-8 absolute -bottom-3 ${
                      showMore
                        ? " rotate-90 duration-300"
                        : "rotate-0 duration-300"
                    }`}
                  />
                </button>
              </p>
            </div>

            <div className="pt-2">
              <p className={titles}>Characters/Actors</p>
              <div className="w-auto h-[298px] mt-4 overflow-x-auto overscroll-x-contain flex space-x-4 relative">
                {characters.map((element) => {
                  if (element.voice_actors.length === 0) {
                    return (
                      <div
                        key={element.character.name}
                        className="w-[148px] h-full rounded-lg flex-none"
                      >
                        <div className="h-[75%] w-full">
                          <img
                            className="w-full h-full object-cover rounded-lg"
                            src="https://previews.123rf.com/images/blankstock/blankstock1903/blankstock190304614/124535633-no-o-detente-icono-de-informaci%C3%B3n-t%C3%A9cnica-se%C3%B1al-de-instrucci%C3%B3n-prohibido-s%C3%ADmbolo-de-parada-de.jpg"
                            alt={element.voice_actors[0]?.person.name}
                          />
                        </div>
                        <p className="text-center">{element.character.name}</p>
                      </div>
                    );
                  } else {
                    return (
                      // here controls the width
                      <div
                        key={element.character.name}
                        className=" w-[148px] h-full rounded-lg flex-none"
                      >
                        {/* here controls the height */}
                        <div className="h-[75%] w-full">
                          <Link
                            to={`/actordb/${element.voice_actors[0]?.person.name}`}
                            state={{
                              id: element.voice_actors[0].person.mal_id,
                            }}
                            onClick={() =>
                              handleBackend(
                                element.voice_actors[0].person.mal_id
                              )
                            }
                          >
                            <img
                              className="w-full h-full object-fill rounded-lg"
                              src={
                                element.voice_actors[0]?.person.images.jpg
                                  .image_url
                              }
                              alt={element.voice_actors[0]?.person.name}
                            />
                          </Link>
                        </div>
                        <p className="text-center">
                          {element.character.name} /{" "}
                          {element.voice_actors[0]?.person.name}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AnimeDetail;
