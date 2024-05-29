import { useLocation } from "react-router-dom";
import { ActorVoice, ActorVoiceData, Location } from "../lib/types";
import { useEffect, useState } from "react";
import { titles } from "../stylesTailwind/variables";

type About = {
  Height: string;
  Hobbies: string;
  Hometown: string;
  Instagram: string;
  Profile: string;
  Skills_and_Abilities: string;
  Twitter: string;
};

const ActorDetail = () => {
  const url: Location = useLocation();
  const { id } = url.state;
  const [actorData, setActorData] = useState<ActorVoice>();
  const [birthday, setBirthday] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [actorAbout, setActorAbout] = useState<About>();
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
        const infoSplit = data.data.about.split("\n");
        let object = {} as About;
        infoSplit.forEach((element) => {
          const newSplit = element.split(":");
          const key = newSplit[0];
          if (key.length !== 0 && !key.includes("Profile")) {
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
        });
        setActorAbout(object);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleMapObject = () => {
    const mapObject: { title: string; value: string }[] = [];
    let key: keyof About;
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
    return mapObject;
  };

  if (actorData !== undefined && actorAbout !== undefined)
    return (
      <section className="w-full h-full px-2">
        <div className="w-full h-96 flex items-center justify-center">
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
          <div className="w-full grid grid-cols-3 gap-y-6 gap-x-2">
            {handleMapObject().map((element, index) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  <h2 className={`${titles} text-center`}>{element.title}</h2>
                  <p className="text-center">{element.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
};

export default ActorDetail;
