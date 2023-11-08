import React, { useEffect } from 'react';
import kakaoLogin from 'Assets/Images/kakao-login.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthAPI } from 'Scripts/Auth';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export default function Auth() {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');

    useEffect(() => {
        if (accessToken && refreshToken) {
            navigate('/main');
        }
    }, []);

    if (accessToken && refreshToken) {
        navigate('/main');
    }

    if (query) {
        const code = query.get('code');

        if (code) {
            console.log(code);
            AuthAPI.getKakaoToken(code)
                .then((accessToken) =>
                    AuthAPI.kakaoLogin(accessToken).then((res) => {
                        const tokens = res.data.data.tokens;
                        // 쿠키에 토큰 저장
                        document.cookie = `AccessToken=${tokens.accessToken}`;
                        document.cookie = `RefreshToken=${tokens.refreshToken}`;
                    }),
                )
                .catch((err) => console.log(err));
        }
    }

    const clickKakaoLogin = () => {
        const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;

        const redirectUri = 'http://localhost:3000/auth';
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
        const handleLogin = () => {
            window.location.href = kakaoURL;
        };
        handleLogin();
    };

    return (
        <div className="">
            <button onClick={() => clickKakaoLogin()}>
                <img src={kakaoLogin} />
            </button>
        </div>
    );
}
