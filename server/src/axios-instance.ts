import axios from "axios";
import { TOPVISOR_API_URL, YANDEX_API_URL } from "./config";

export const axiosTopvisorInstance = axios.create({
    baseURL: TOPVISOR_API_URL.baseUrl,
    headers: {
        'Authorization': TOPVISOR_API_URL.authToken,
        'User-Id': TOPVISOR_API_URL.userID,
        'Content-Type':'application/json'
    }
})

export const axiosYandexInstance = axios.create({
    baseURL:YANDEX_API_URL.baseUrl,
    headers: {
        'Authorization': `OAuth ${YANDEX_API_URL.oAuthToken}`,
    }
})