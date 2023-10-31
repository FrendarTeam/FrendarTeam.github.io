import React from 'react';
import kakaoLogin from 'Assets/Images/kakao-login.png';
import { useSearchParams } from 'react-router-dom';
import { AuthAPI } from 'Scripts/Auth';

export default function Auth() {
    const [query, setQuery] = useSearchParams();

    if (query) {
        const code = query.get('code');

        if (code) {
            console.log(code);
            AuthAPI.getKakaoToken(code)
                .then((accessToken) =>
                    AuthAPI.kakaoLogin(accessToken).then((res) => {
                        console.log(res);
                        // const cookie = cookies.get('accessToken');
                        // console.log(cookie);
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
