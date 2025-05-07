const storage = {
  save: (name: string, data: unknown) => {
    globalThis.localStorage.setItem(name, JSON.stringify(data));
  },
  remove: (name: string) => {
    globalThis.localStorage.removeItem(name);
  },
  get: (name: string) => {
    return JSON.parse(globalThis.localStorage.getItem(name) as string);
  },
};

export { storage };
