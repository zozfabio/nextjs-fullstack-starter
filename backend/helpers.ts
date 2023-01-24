export const sleep = (miliseconds: number) =>
  new Promise((res) => setTimeout(res, miliseconds))
