import { useEffect } from 'react'
import kakaoLogin from 'Assets/Images/kakao-login.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthAPI } from 'Scripts/Auth'
import { Cookies } from 'react-cookie'
import { UserAPI } from 'Scripts/User'
import { useAppDispatch } from 'Hooks/Redux'
import { set } from 'Features/userSlice'

const cookies = new Cookies()

export default function Auth() {
    const [query, setQuery] = useSearchParams()

    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const accessToken = cookies.get('AccessToken')
    const refreshToken = cookies.get('RefreshToken')

    useEffect(() => {
        if (accessToken && refreshToken) {
            const getUser = async () => {
                const user = await UserAPI.getUser()

                dispatch(
                    set({
                        userId: user.id,
                        nickname: user.nickname,
                        profileUrl: user.profileUrl,
                        code: user.code,
                    }),
                )
                localStorage.setItem(
                    'me',
                    JSON.stringify({
                        userId: user.id,
                        nickname: user.nickname,
                        profileUrl: user.profileUrl,
                        code: user.code,
                    }),
                )
                navigate('/schedule/' + user.id)
            }
            getUser()
        }
    }, [])

    if (query) {
        const code = query.get('code')

        if (code) {
            AuthAPI.getKakaoToken(code)
                .then((accessToken) =>
                    AuthAPI.kakaoLogin(accessToken).then((res) => {
                        const tokens = res.data.data.tokens
                        // 쿠키에 토큰 저장
                        document.cookie = `AccessToken=${tokens.accessToken}`
                        document.cookie = `RefreshToken=${tokens.refreshToken}`
                        navigate(0)
                    }),
                )
                .catch((err) => console.log(err))
        }
    }

    const clickKakaoLogin = () => {
        const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY

        const redirectUri = 'http://localhost:3000/auth'
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`
        const handleLogin = () => {
            window.location.href = kakaoURL
        }
        handleLogin()
    }

    return (
        <div className="flex justify-center items-center  w-full h-full">
            <div className="flex">
                <button onClick={() => clickKakaoLogin()}>
                    <img src={kakaoLogin} />
                </button>
            </div>
        </div>
    )
}
