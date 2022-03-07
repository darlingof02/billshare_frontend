import axios from "axios";
import { API_URL } from "./constant";

class UserService {
    getUserBasicInfo() {
        return axios({
            url: API_URL+"/userInfo",
            method: "get",
        })
    }
}

export default new UserService()