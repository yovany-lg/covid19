const cache = new Map();

const has = key => cache.has(key);
const get = key => cache.get(key);
const set = (key, value) => cache.set(key, value);

export default { has, get, set };
