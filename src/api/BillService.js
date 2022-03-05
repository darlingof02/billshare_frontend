import axios from "axios";
import { API_URL } from "./constant";



class BillService {
    getBillsByEmail(email) {
        return axios.get(
            `${API_URL}/owned_bills`,
        )
    }

    getIndebtByBill(id) {
        return axios.get(
            `${API_URL}/owned_bills/${id}`,
        )
    }

    getBillById(id) {
        return axios.get(
            `${API_URL}/bills/${id}`,
        )
    }
}

export default new BillService()