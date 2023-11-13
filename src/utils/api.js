import Axios from "axios";
import { getAuthToken, removeAuthToken } from "./auth";

const axios = Axios.create({
    baseURL: "https://innate-confirmed-tulip.glitch.me"
});
/* 
const axios = Axios.create({
    baseURL: "http://localhost:3000"
});
 */

export const login = async credentials => {
    return new Promise( async (resolve, reject) => {
        try {
            const response = await axios.post(`/user/login`, credentials);
        
            localStorage.setItem("user_img", JSON.stringify(response.data.userImg.data));
    
            resolve(response.data.token);
        } catch (error) {
            reject();
        }
    });
}

export const register = async credentials => {
    return new Promise( async (resolve, reject) => {
        try {
            const response = await axios.post(`/user/registrar`, credentials);

            resolve(response.data);            
        } catch (error) {
            reject();
        }
    });
}

export const getComida = async (body) => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.get(`/comida`, body);

        if (response.status !== 200) reject(new Error("Erro ao buscar dados."));
        resolve(response.data);
    });
}

export const logout = async () => {
    removeAuthToken();
}

export const createComida = async (body) => {
    try {
        const headers = { 'Authorization': getAuthToken() }
        const response = await axios.post(`/comida`, body, { headers });

        if (response.status !== 201) throw new Error("Error");
    } catch (error) {
        console.log(error.message);
    }
}

export const updateData = async (body) => {
    return new Promise( async (resolve, reject) => {
        try {
            const headers = { 'Authorization': getAuthToken() };

            const response = await axios.put(`/user`, body, { headers });
            
            resolve(response.data);
        } catch (error) {
            console.log(error)
            reject();
        }
    });
};

export const updateImage = async (img) => {
    return new Promise( async (resolve, reject) => {
        try {
            const headers = { 'Authorization': getAuthToken() };

            const response = await axios.patch(`/user`, img, { headers });
    
            localStorage.setItem("user_img", JSON.stringify(response.data.data));
    
            resolve();
        } catch (error) {
            reject();
        }
    });
};

export const getSpent = async () => {
    return new Promise( async (resolve, reject) => {
        const headers = { 'Authorization': getAuthToken() };

        const response = await axios.get(`/user`, { headers });

        if (response.status !== 200) reject(new Error("Erro ao receber gasto"));

        resolve(response.data);
    });
};

export const activateApi = async () => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.get(`/user/permission`);

        if (response.status !== 200) reject(new Error("Erro ao ativar API"));

        resolve(response.data);
    });
};
