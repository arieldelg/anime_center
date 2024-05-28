import { useLocation } from "react-router-dom";
import { ActorVoice, ActorVoiceData, Location } from "../lib/types";
import { useEffect, useState } from "react";

const ActorDetail = () => {
  const url: Location = useLocation();
  const { id } = url.state;
  const [actorData, setActorData] = useState<ActorVoice>();
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
        const test = new Date(dayMonthYear);
        const day = dayMonthYear.split("-")[2];
        const month = dayMonthYear.split("-")[1];
        const year = dayMonthYear.split("-")[0];
        // const getDay = new Date(0, 0, Number(day)).getDate();
        // const getMonth = new Date(0, Number(month), 0).getMonth() + 1;
        // const getYear = new Date(Number(year), 0, 0).getFullYear();
        console.log(day);
        console.log(month);
        console.log(year);
        // console.log(getYear);
        console.log(test);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(actorData);
  return (
    <section className="w-full h-full">
      <div className="w-full h-96 flex items-center justify-center">
        <img src={actorData?.images.jpg.image_url} alt={actorData?.name} />
      </div>
      <div>
        <div>
          <h2>Name</h2>
          <p>{actorData?.name}</p>
        </div>
        <div>
          <h2>birthday</h2>
          <p>{}</p>
        </div>
      </div>
    </section>
  );
};

export default ActorDetail;
