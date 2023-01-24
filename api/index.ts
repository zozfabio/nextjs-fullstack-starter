export const getJson = (path: string) =>
  fetch(`/api${path}`).then((res) => res.json())
