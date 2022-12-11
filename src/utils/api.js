import { ERROR_MESSAGE } from './constants.js';

import { API_KEY } from '../../apikey.js';

const API_END_POINT = `https://www.omdbapi.com?apikey=${API_KEY}`;

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE.BAD_REQUEST);
    }

    return await res.json();
  } catch (e) {
    console.error(e);
  }
};
