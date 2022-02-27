import { getRoles } from '@testing-library/react'
import axios from 'axios'
import { API_URL } from './constant'
// export const USER_NAME_SESSION_Attribute_ID

class Authentication {

    register(userInfo) {
        console.log("fuck")
        console.log(userInfo)
        return axios({
            url: API_URL + '/create_user',
            method: 'post',
            data: userInfo
        })
    }

    executeJWTAuthService(email, password) {
        return axios.post(
            `${API_URL}/authenticate`,
            {
                'email': email,
                'password': password,
            }
        )
    }

    isUserLogin() {
        return localStorage.getItem('localEmail')
    }

    logout() {
        localStorage.removeItem('localEmail')
    }

    setupAxiosIntercetors(AuthHeader){

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLogin())
                    config.headers.authorization = AuthHeader
                return config
            }
        )
    }
}
export default new Authentication()