import { ActorVoiceData } from "../lib/types";

const httpClientData = {
  actorFullData: async (url: string) => {
    const response = await fetch(url);
    const { data }: ActorVoiceData = await response.json();
    return data;
  },
};

export { httpClientData };
