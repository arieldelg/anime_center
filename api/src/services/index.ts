import { ActorVoice } from "../lib/types";
import { httpClientData } from "../plugins/http-client.plugins";

const dataActor = async (id: string): Promise<ActorVoice> => {
  try {
    const data: ActorVoice = await httpClientData.get(
      `https://api.jikan.moe/v4/people/${id}/full`
    );
    return data;
  } catch (error) {
    throw "error en services/index.ts function dataActor";
  }
};

const dataPopularityAnime = async (array: number[]) => {
  let fetchPromise: string[] = [];
  for (let index = 0; index < array.length; index++) {
    const id = array[index];
    fetchPromise.push(`https://api.jikan.moe/v4/anime/${id}`);
    // const data: TAnimeGenerics = await httpClientData.get(
    //   `https://api.jikan.moe/v4/anime/${id}`
    // );
  }

  const data = await Promise.all(
    fetchPromise.map((element) => fetch(element).then((res) => res.json()))
  );
  console.log(data);
  // console.log(fetchPromise, "adentro");
  // return popularity;
};

export { dataActor, dataPopularityAnime };
