import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

export const getAuthToken = () => {
  return Cookies.get("token");
};

export const setAuthToken = (token) => {
  Cookies.set("token", token, { expires: 120 / (24 * 60) });
};

export const removeAuthToken = () => {
  Cookies.remove("token");
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
