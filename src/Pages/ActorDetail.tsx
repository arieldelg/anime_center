import { useLocation } from "react-router-dom";
import { Location } from "../lib/types";
import { useEffect, useState } from "react";

const ActorDetail = () => {
  const url: Location = useLocation();
  const { id } = url.state;
  const [actorData, setActorData] = useState();
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/people/${id}/full`)
      .then((res) => {
        if (res.status >= 400 && res.status < 500)
          console.log("ERROR ON THE RESPONSE FETCH ACTOR VOICE");
        if (!res.ok) return;
        return res.json();
      })
      .then((data) => {
        setActorData(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section>
      <div>
        <img src={da} alt="" />
      </div>
    </section>
  );
};

export default ActorDetail;
