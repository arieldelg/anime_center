import { ActorVoice } from "../lib/types";
import { httpClientData } from "../plugins/http-client.plugins";

const dataActor = async (id: string): Promise<ActorVoice> => {
  try {
    const data = await httpClientData.actorFullData(
      `https://api.jikan.moe/v4/people/${id}/full`
    );
    return data;
  } catch (error) {
    throw `Actor con el id de ${id} no existe`;
  }
};

export { dataActor };
