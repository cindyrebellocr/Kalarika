// Resolves a file in /public/assets so it works from any base path.
export const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;
