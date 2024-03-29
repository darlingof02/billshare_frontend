import { getRoles } from '@testing-library/react'
import axios from 'axios'
import WebSockClient from './WebSockClient';
import { API_URL } from './constant'
import PubSub from 'pubsub-js';
// export const USER_NAME_SESSION_Attribute_ID

class Authentication {

    authInterceptor = null;

    register(userInfo) {
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
        axios.interceptors.request.eject(this.authInterceptor);
        WebSockClient.disconnect();
        PubSub.clearAllSubscriptions();
    }

    setupAxiosIntercetors(AuthHeader){

        this.authInterceptor = axios.interceptors.request.use(
            (config) => {
                if(this.isUserLogin())
                    config.headers.authorization = AuthHeader
                return config
            }
        )
        WebSockClient.connect(AuthHeader)
    }
}
export default new Authentication()