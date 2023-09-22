import { API_CONFIG } from "../config";

export const checkServer = () => {
  if (window.navigator.onLine) {
    try {
      return fetch(API_CONFIG.baseUrl).then((response) => {
        if (!response.ok) {
          throw new Error("could not get items");
        }
        return true;
      });
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
