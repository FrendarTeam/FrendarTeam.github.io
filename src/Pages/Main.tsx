import 'react-calendar/dist/Calendar.css'
import 'Assets/Css/Calendar.css'

import { useAppDispatch, useAppSelector } from 'Hooks/Redux'
import { set } from 'Features/userSlice'

import Calendar from 'react-calendar'
import Schedule from 'Components/Schedule'
import Nav from 'Components/Nav'
import { useEffect } from 'react'
import { UserAPI } from 'Scripts/User'

export default function Main() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user)
    useEffect(() => {
        const getUser = async () => {
            const user = await UserAPI.getUser()
            dispatch(
                set({
                    userId: user.id,
                    nickname: user.nickname,
                    profileUrl: user.profileUrl,
                    code: user.code,
                    isNotification: user.isNotificationEnabled,
                }),
            )
        }
        if (!user.value.userId) {
            getUser()
        }
    }, [])

    return (
        <div className="flex flex-col flex-1">
            <Nav />
            <div className="flex justify-center">
                <Calendar
                    formatDay={(locale, date) => {
                        if (date.getDate() < 10) {
                            return '0' + date.getDate().toString()
                        }
                        return date.getDate().toString()
                    }}
                    navigationLabel={({ date, label, locale, view }) => {
                        return `${date.getFullYear()} - ${date.getMonth() + 1} `
                    }}
                    next2Label={null}
                    prev2Label={null}
                    calendarType="iso8601"
                    defaultView="month"
                />
            </div>
            <Schedule time={'19:00 PM'} title={''} />
            <Schedule time={'07:00 AM'} title={'테스트 일정'} />
        </div>
    )
}
