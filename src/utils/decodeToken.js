import jwtDecode from "jwt-decode";
import { getAuthToken } from "./auth";

export const decodeToken = () => {
    const { data } = jwtDecode(getAuthToken());

    return data;
}