import axios from "axios";

const apiInstance = axios.create({
  headers: {
    Accept: "application/json",
  },
});

function get(url, config = {}) {
  config.params = config.params || {};
  config.params.jsonRequest = true;
  return apiInstance.get(url, config);
}

export const api = {
  get,
};
