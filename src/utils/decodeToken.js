import jwtDecode from "jwt-decode";
import { imageBufferToUrl } from "./imageBufferToUrl";
import { getAuthToken } from "./auth";

export const decodeToken = () => {
    const { data } = jwtDecode(getAuthToken());

    data["img"] = imageBufferToUrl(JSON.parse(localStorage.getItem("user_img")));

    return data;
}