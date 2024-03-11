import axios from './index'
import baseAxios from 'axios'
export class AuthAPI {
    static kakaoLogin = async (code: string) => {
        const result = await axios.post('/auth/login/kakao', { token: code })
        return result
    }

    static getKakaoToken = async (code: string) => {
        const getTokenUrl = 'https://kauth.kakao.com/oauth/token'
        try {
            const result = await baseAxios.post(
                getTokenUrl,
                {
                    grant_type: 'authorization_code',
                    client_id: process.env.REACT_APP_KAKAO_CLIENT,
                    redirect_uri: `http://localhost:3000/auth`,
                    code,
                    client_secret: process.env.REACT_APP_SECRET,
                },
                {
                    headers: {
                        'Content-type':
                            'application/x-www-form-urlencoded;charset=utf-8',
                    },
                },
            )
            return result.data.access_token
        } catch (err) {
            console.log(err)
        }
    }

    static logout = async () => {
        try {
            const result = await axios.post('/auth/logout')
            console.log(result)
            return result
        } catch (err) {
            console.log(err)
        }
    }
}
