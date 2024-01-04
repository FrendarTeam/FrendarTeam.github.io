import { useAppDispatch, useAppSelector } from 'Hooks/Redux'
import { UserAPI } from 'Scripts/User'
import React, { useCallback, useState } from 'react'
import Toggle from 'react-toggle'
import 'react-toggle/style.css' // for ES6 modules
import mainColors from 'Types/Enum/main-color'
import MainColor from './MainColor'
import { set } from 'Features/userSlice'

export default function MenuList() {
    const isNotification = useAppSelector(
        (state) => state.user.value.isNotification,
    )
    const [isAlarmToggle, setIsAlarmToggle] = useState<boolean>(
        isNotification ? isNotification : false,
    )

    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user)

    const handleAlarmToggle = useCallback(async () => {
        setIsAlarmToggle(!isAlarmToggle)
        dispatch(
            set({
                ...user.value,
                isNotification: !isAlarmToggle,
            }),
        )
        await UserAPI.updateAlarmToggle()
    }, [isAlarmToggle])

    const handleColor = useCallback(async (color: string) => {
        await UserAPI.updateMainColor(color)
    }, [])

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
                        src={user.value.profileUrl}
                        alt="d"
                    ></img>
                </div>

                <div className="flex  ">{user.value.nickname}</div>
            </div>
            <div className="flex flex-col h-3/5 items-center justify-around   w-full">
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
                <div className="flex flex-col items-center">
                    color
                    <div className="flex flex-row gap-3">
                        {['black', 'white'].map((color) => {
                            return (
                                <MainColor
                                    key={color}
                                    color={color}
                                    handleColor={handleColor}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="flex"> 로그아웃</div>
            </div>
        </div>
    )
}
