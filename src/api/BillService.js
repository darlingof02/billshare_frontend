import axios from "axios";
import { API_URL } from "./constant";



class BillService {
    getBillsByEmail(email) {
        return axios.get(
            `${API_URL}/owned_bills`,
        )
    }
}

export default new BillService()