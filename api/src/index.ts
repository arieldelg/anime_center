import express from "express";
import cors from "cors";
import { About, ActorVoiceData, Voice } from "./lib/types";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", cors(), async (_, res) => {
  res.send({ message: "Hola desde el servidor!" });
});

app.get("/api/:actorId", async (req, res) => {
  let { actorId } = req.params;

  const results = await fetch(
    `https://api.jikan.moe/v4/people/${actorId}/full`
  );
  const { data }: ActorVoiceData = await results.json();

  let actorAbout: About | "No info";
  let age: number | "No info";
  let birthday: string | "No info";
  if (data.birthday !== null) {
    const datesplit = data.birthday.split("T");
    const dayMonthYear = datesplit[0];
    const day = dayMonthYear.split("-")[2];
    const month = dayMonthYear.split("-")[1];
    const year = dayMonthYear.split("-")[0];
    const nowDate = new Date();
    birthday = `${day} / ${month} / ${year}`;
    const restYear = nowDate.getFullYear() - Number(year);
    const actualMonth = nowDate.getMonth();
    if (actualMonth < Number(month)) {
      age = restYear - 1;
    } else {
      age = restYear;
    }
  } else {
    age = "No info";
    birthday = "No info";
  }
  if (data.about !== null) {
    const infoSplit = data.about.split("\n");
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
    actorAbout = object;
  } else {
    actorAbout = "No info";
  }

  const newArray: Voice[] = [];
  data.voices.forEach((element, index1) => {
    let indexArray = newArray.length;
    if (newArray.length === 0) {
      newArray.push(element);
    }

    if (index1 < data.voices.length) {
      for (let index = indexArray; indexArray > 0; index--) {
        if (element.anime.mal_id === newArray[indexArray - 1].anime.mal_id) {
          newArray[index - 1].roleArray = [
            element.role,
            newArray[index - 1].role,
          ];
          newArray[index - 1].voiceArray = [
            element.character.name,
            newArray[index - 1].character.name,
          ];
          newArray[index - 1].role = "Main";
          return;
        } else {
          if (index - 1 <= 0) {
            newArray.push(element);
            return;
          }
        }
      }
    }
  });

  const infoActor = {
    id: data.mal_id,
    images: data.images,
    name: data.name,
    popularity: data.favorites,
    voices: newArray,
  };

  res.json({ actorAbout, age, birthday, infoActor });
  // res.json({ data });

  // })
  // .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log("dasda");
});
