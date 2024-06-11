import { ActorVoice, ActorVoiceData } from "../lib/types";

const httpClientData = {
  actorFullData: async (url: string): Promise<ActorVoice> => {
    const response = await fetch(url);
    const { data }: ActorVoiceData = await response.json();
    return data;
  },
};

export { httpClientData };
