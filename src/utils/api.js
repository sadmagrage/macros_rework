import Axios from "axios";
import { getAuthToken, removeAuthToken } from "./auth";

const axios = Axios.create({
    baseURL: "https://innate-confirmed-tulip.glitch.me",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.defaults.withCredentials= true;

export const login = async credentials => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.post(`/user/login`, credentials);

        if (response.status !== 200) reject("Erro ao fazer login");

        const token = response.data;
        resolve(token);
    });
}

export const register = async credentials => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.post(`/user/registrar`, credentials);

        if (response.status !== 201) reject(new Error("Erro ao registrar"));

        resolve(response.data);
    })
}

export const getData = async () => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.get(`/user/data`, { "Authorization": getAuthToken() });

        if (response.status !== 200) reject(new Error("Erro na busca de dados."));

        resolve(response.data);
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
        const response = await axios.post(`/comida`, body, { "Authorization": getAuthToken() });

        if (response.status !== 201) throw new Error("Error");
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUserSettings = async (body) => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.post(`/user/update`, body, { "Authorization": getAuthToken() });
        
        if (response.status !== 200) reject(new Error("Erro ao atualizar configurações do usuário"));
        resolve();
    });
};

export const updateUserImg = async (img) => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.post(`/user/alter_img`, { "img": img }, { "Authorization": getAuthToken() });
        
        if (response.status !== 200) reject(new Error("Erro ao trocar imagem"));
        resolve();
    });
};

export const getSpent = async () => {
    return new Promise( async (resolve, reject) => {
        const response = await axios.get(`/user/calculate`, { "Authorization": getAuthToken() });

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