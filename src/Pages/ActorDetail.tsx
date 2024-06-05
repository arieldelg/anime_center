import { useLocation, useNavigate } from "react-router-dom";
import { ActorVoice, ActorVoiceData, Location } from "../lib/types";
import { useEffect, useState } from "react";
import { titles } from "../stylesTailwind/variables";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

type About = {
  Height?: string;
  Hobbies?: string;
  Hometown: string;
  Instagram?: string;
  Profile?: string;
  Skills_and_Abilities?: string;
  Twitter: string;
  ["Personal info"]: string;
};

const ActorDetail = () => {
  const url: Location = useLocation();
  const { id } = url.state;
  const navigate = useNavigate();
  const [actorData, setActorData] = useState<ActorVoice>();
  const [birthday, setBirthday] = useState<string>("");
  const [age, setAge] = useState<number | "No info">(0);
  const [actorAbout, setActorAbout] = useState<About | "No info">();

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/people/${id}/full`)
      .then((res) => {
        if (res.status >= 400 && res.status < 500)
          console.log("ERROR ON THE RESPONSE FETCH ACTOR VOICE");
        if (!res.ok) return;
        return res.json();
      })
      .then((data: ActorVoiceData) => {
        setActorData(data.data);
        if (data.data.birthday !== null) {
          const datesplit = data.data.birthday.split("T");
          const dayMonthYear = datesplit[0];
          const day = dayMonthYear.split("-")[2];
          const month = dayMonthYear.split("-")[1];
          const year = dayMonthYear.split("-")[0];
          const nowDate = new Date();
          setBirthday(`${day}/${month}/${year}`);
          const restYear = nowDate.getFullYear() - Number(year);
          const actualMonth = nowDate.getMonth();
          if (actualMonth < Number(month)) {
            setAge(restYear - 1);
          } else {
            setAge(restYear);
          }
        } else {
          setAge("No info");
          setBirthday("No info");
        }
        if (data.data.about !== null) {
          const infoSplit = data.data.about.split("\n");
          let object = {} as About;
          infoSplit.forEach((element) => {
            let newSplit = [];
            if (!element.includes(": ") && element.length > 0) {
              object = {
                ...object,
                "Personal info": element,
              };
            } else {
              newSplit = element.split(": ");
              const key = newSplit[0];
              if (newSplit[0].length > 100) {
                const newJoin = newSplit.join(": ");
                object = {
                  ...object,
                  "Personal info": newJoin,
                };
              } else if (key.length !== 0 && !key.includes("Profile")) {
                if (key.includes("&amp;")) {
                  const newKey = key.replace("&amp;", "&");
                  object = {
                    ...object,
                    [newKey]: newSplit[1].trimStart(),
                  };
                } else {
                  object = {
                    ...object,
                    [key]: newSplit[1].trimStart(),
                  };
                }
              }
            }
          });
          setActorAbout(object);
        } else {
          setActorAbout("No info");
        }
      })
      .catch((error) => console.log(error));
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

  if (actorData !== undefined && actorAbout !== undefined)
    return (
      <section className="w-full h-full px-4">
        <div className="bg-gray-800 w-full h-14 fixed top-0 left-0 flex items-center space-x-4 px-4">
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
                      {/* {element.title === "Instagram" ||
                  element.title === "Twitter" ? (
                    <Link to={`https://${element.value}`}>click</Link>
                  ) : (
                    <p>sdlkads</p>
                  )} */}
                      <p className="text-center text-base">{element.value}</p>
                    </div>
                  );
                })
              : "No info"}
          </div>
        </div>
      </section>
    );
};

export default ActorDetail;
