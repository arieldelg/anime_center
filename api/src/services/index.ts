import { ActorVoice } from "../lib/types";
import { httpClientData } from "../plugins/http-client.plugins";

const dataActor = async (id: string): Promise<ActorVoice> => {
  try {
    const data: ActorVoice = await httpClientData.get(
      `https://api.jikan.moe/v4/people/${id}/full`
    );
    return data;
  } catch (error) {
    throw "papu";
  }
};

export { dataActor };
