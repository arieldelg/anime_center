import { useLocation, useNavigate } from "react-router-dom";
import {
  Location,
  Voice,
  About,
  ActorClient,
  infoActorType,
} from "../../../api/src/lib/types";
import { useEffect, useState } from "react";
import { titles } from "../stylesTailwind/variables";
import {
  ArrowUturnLeftIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";

const ActorDetail = () => {
  const url: Location = useLocation();
  const { id } = url.state;
  const navigate = useNavigate();
  const [actorData, setActorData] = useState<infoActorType>();
  const [birthday, setBirthday] = useState<string>("");
  const [age, setAge] = useState<number | "No info">(0);
  const [actorAbout, setActorAbout] = useState<About | "No info">();
  const [voices, setVoices] = useState<Voice[] | undefined>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5174/api/${id}`)
      .then((res) => res.json())
      .then((data: ActorClient) => {
        console.log(data);
        const { actorAbout, age, birthday, infoActor } = data;
        setBirthday(birthday);
        setAge(age);
        setActorAbout(actorAbout);
        setActorData(infoActor);
      });
  }, []);

  const handleMapObject = () => {
    const mapObject: { title: string; value: string | undefined }[] = [];
    let key: keyof About;
    if (actorAbout !== "No info") {
      for (key in actorAbout) {
        if (Object.prototype.hasOwnProperty.call(actorAbout, key)) {
          if (actorAbout !== undefined) {
            const valueActor = actorAbout[key];
            const title = key;
            mapObject.push({ title: title, value: valueActor });
          } else {
            console.log("actorAbout is undefined");
          }
        }
      }
    }
    return mapObject;
  };

  const handleTable = () => {
    const sortArray = actorData?.voices.sort((a, b) =>
      a.role.localeCompare(b.role)
    );
    return sortArray;
  };

  if (actorData !== undefined && actorAbout !== undefined)
    return (
      <section className="w-full h-full px-4">
        <div className="bg-gray-800 w-full h-14 fixed top-0 left-0 flex items-center space-x-4 px-4 z-20">
          <button>
            <ArrowUturnLeftIcon className="w-8" onClick={() => navigate(-1)} />
          </button>
          <h1 className="text-2xl">Actor</h1>
        </div>
        <div className="w-full h-96 flex items-center justify-center mt-14">
          <img src={actorData?.images.jpg.image_url} alt={actorData?.name} />
        </div>
        <div className=" w-full grid grid-cols-3">
          <div className="flex flex-col items-center">
            <h2>Name</h2>
            <p>{actorData?.name}</p>
          </div>
          <div className="flex flex-col items-center">
            <h2>Birthday</h2>
            <p>{birthday}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Age</p>
            <p>{age}</p>
          </div>
        </div>
        <div className="full py-4">
          <h2 className={`${titles} text-center py-2`}>Info</h2>
          <div className="w-full grid grid-cols-2 gap-y-6 gap-x-4">
            {actorAbout !== "No info"
              ? handleMapObject().map((element, index) => {
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <h2 className={`${titles} text-center`}>
                        {element.title}
                      </h2>
                      <p className="text-center text-base">{element.value}</p>
                    </div>
                  );
                })
              : "No info"}
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="w-full border-b-2 border-white/20 relative">
            <h1 className={`${titles}  w-full text-center py-2`}>Voices</h1>
            <button className="absolute top-2 right-0">
              <AdjustmentsHorizontalIcon className="w-8" />
            </button>
          </div>
          {handleTable()?.map((element) => {
            return (
              <div className="w-full" key={element.anime.mal_id}>
                <div className="flex justify-center">
                  <img
                    src={element.anime.images.jpg.image_url}
                    alt={element.anime.title}
                  />
                </div>
                <table className="w-full table-fixed my-4">
                  <thead className="border-b-[1px] h-[80px] border-white/30">
                    <tr>
                      <th scope="col" className="w-1/4 bg-gray-800">
                        Role
                      </th>
                      <th className="w-2/4">Anime</th>
                      <th className="w-1/4 bg-gray-800">Voice</th>
                    </tr>
                  </thead>
                  <tbody className="h-[122px]">
                    {element.roleArray !== undefined ? (
                      element.roleArray.map((element2, index) => {
                        return (
                          <tr key={index} className="">
                            <td className="text-center bg-gray-800">
                              {element2}
                            </td>
                            <td className="text-center">
                              {element.anime.title}
                            </td>
                            {element.voiceArray !== undefined && (
                              <td className="text-center bg-gray-800">
                                {element.voiceArray[index]}
                              </td>
                            )}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td scope="row" className="text-center bg-gray-800">
                          {element.role}
                        </td>
                        <td className="text-center">{element.anime.title}</td>
                        <td className="text-center bg-gray-800">
                          {element.character.name}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

        <div></div>
      </section>
    );
};

export default ActorDetail;
