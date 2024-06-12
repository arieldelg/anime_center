const httpClientData = {
  get: async (url: string) => {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  },
  // post: async (url: string) => {
  //   const response = await fetch(url);
  //   const { data } = await response.json();
  //   return data;
  // },
};

export { httpClientData };
