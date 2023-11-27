import axios from 'axios'
import { Cookies } from 'react-cookie'

const instance = axios.create({
    // baseURL: process.env.REACT_APP_API_SERVER_URI,
    baseURL: 'http://43.201.107.192:5000',
    withCredentials: true,
})

instance.interceptors.request.use(
    (config: any) => {
        //request 에 쿠키 넣기
        const cookies = new Cookies()
        config.headers = {
            AccessToken: cookies.get('AccessToken'),
            RefreshToken: cookies.get('RefreshToken'),
        }

        return config
    },
    (err) => {
        return Promise.reject(err)
    },
)

export default instance
