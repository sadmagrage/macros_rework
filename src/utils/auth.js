import axios from "axios";
import jwt_decode from "jwt-decode";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(token);
};

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export const isAuthenticated = () => {
  const token = getAuthToken();

  return token !== null && token !== 'undefined' && !isTokenExpired(token);
};
