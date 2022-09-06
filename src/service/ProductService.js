import {BASE_URL} from "./config/ApiConfig";
import axios from "axios";
import authHeader from "./auth-header";

const fetchRequest = axios.create({
    headers: {
        "content-type": "application/json",
        "Authorization": authHeader()
    }
})

export const createProduct = async (data, hairType, productType, productLine) => {
    return await fetchRequest
        .post(BASE_URL + "/products", {
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.picture && data.picture.file.response,
            productType,
            productLine,
            hairType
        },
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateProduct = async (data,hairType, productType, productLine) => {
    var temp = null;
    if (data.picture.file === undefined) {
        temp = data.picture
    } else {
        temp = data.picture.file.response
    }
    return await fetchRequest
        .put(BASE_URL + "/products/update/" + data.id, {
            id: Number(data.id),
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: temp,
            productType,
            productLine,
            hairType
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};