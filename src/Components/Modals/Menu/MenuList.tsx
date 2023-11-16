import React, { useCallback, useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // for ES6 modules

export default function MenuList() {
    const [isAlarmToggle, setIsAlarmToggle] = useState<boolean>(false);

    const handleAlarmToggle = useCallback(() => {
        setIsAlarmToggle(!isAlarmToggle);
    }, [isAlarmToggle]);

    return (
        <div className="flex  h-full flex-col  w-full pt-8  pb-8">
            <div className="flex flex-col items-center justify-around h-2/5   w-full ">
                <div
                    className="
                        flex  
                        flex-col
                        justify-around
                        items-center
                        "
                >
                    <img
                        className="flex h-32 w-32 object-cover rounded-full"
                        src="data:image/jpeg;base64,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"
                        alt="d"
                    ></img>
                </div>

                <div className="flex  ">여기는 닉네임</div>
            </div>
            <div className="flex flex-col h-3/5 items-center justify-around bg-slate-400  w-full">
                <div className="flex"> 회원정보 변경</div>
                <div className="flex">
                    알림 설정
                    <Toggle
                        id="cheese-status"
                        defaultChecked={isAlarmToggle}
                        onChange={handleAlarmToggle}
                    />
                    <label htmlFor="cheese-status"></label>
                </div>
                <div className="flex"> color</div>
                <div className="flex"> 로그아웃</div>
            </div>
        </div>
    );
}
