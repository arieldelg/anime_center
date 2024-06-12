import express from "express";
import { dataActor, dataPopularityAnime } from "../services";
import { About, Voice, infoActorType } from "../lib/types";

const router = express.Router();

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  // ! fetching data of actor

  const data = await dataActor(id);

  // ! variables that going to change

  let actorAbout: About | "No info";
  let age: number | "No info";
  let birthday: string | "No info";

  // ! conditional to calculate Birthday
  if (data.birthday !== undefined) {
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

  // ! conditional if there is no about info and spliting about info and returning an object of it
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

  // ! function to sort and check if repeated id Anime exist
  const newArray: Voice[] = [];

  const dataSorted = data.voices.sort((a, b) => a.role.localeCompare(b.role));

  dataSorted.forEach((element, index1) => {
    let indexArray = newArray.length;

    if (newArray.length === 0) {
      newArray.push(element);
    }

    if (index1 < dataSorted.length) {
      for (let index = indexArray; indexArray > 0; index--) {
        if (element.anime.mal_id === newArray[index - 1].anime.mal_id) {
          newArray[index - 1].roleArray = [
            newArray[index - 1].role,
            element.role,
          ];
          newArray[index - 1].voiceArray = [
            newArray[index - 1].character.name,
            element.character.name,
          ];
          return;
        } else {
          if (index - 1 === 0) {
            newArray.push(element);
            return;
          }
        }
      }
    }
  });

  // ! return array of id Anime Actor Voice
  let idArray: number[] = [];
  data.voices.forEach((element) => {
    idArray.push(element.anime.mal_id);
  });

  // ! object to return all info
  const infoActor: infoActorType = {
    id: data.mal_id,
    images: data.images,
    name: data.name,
    popularity: idArray,
    voices: newArray,
  };

  // ! returning response
  res.json({ actorAbout, age, birthday, infoActor });
});

router.post("/anime", async (req, res) => {
  const data = req.body;
  const popularity = await dataPopularityAnime(data);
  console.log(popularity, "undefined");
  // const data = await dataActor(id);

  // const arrayAnime = () => {
  //   let idAnime: number[] = [];
  //   data.voices.forEach((element) => {
  //     idAnime.push(element.anime.mal_id);
  //   });
  //   return idAnime;
  // };
  // const print = arrayAnime();

  // const newArray = await dataPopularityAnime(print);
  // console.log(newArray);

  res.send("hola");
});

router.post("/", async (_, res) => {
  res.send("es el post");
});

export default router;
