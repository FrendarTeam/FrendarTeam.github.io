import 'react-calendar/dist/Calendar.css'
import 'Assets/Css/Calendar.css'

import { useAppDispatch, useAppSelector } from 'Hooks/Redux'
import { set } from 'Features/userSlice'

import Calendar from 'react-calendar'
import Schedule from 'Components/Schedule'
import Nav from 'Components/Nav'
import { useEffect, useState } from 'react'
import { UserAPI } from 'Scripts/User'
import { useParams } from 'react-router-dom'
import { Schedules } from 'Types/Schedule/scheduleData'
import { ScheduleAPI } from 'Scripts/Schdule'
import { formatDate } from 'Scripts/Common'
import AddScheduleButton from 'Components/AddScheduleButton'

export default function Main() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user).value
    const isModal = useAppSelector((state) => state.modal).value.isModal
    const { userId } = useParams()
    const [schedules, setSchedules] = useState<Schedules | null>(null)

    useEffect(() => {
        console.log('isModal', isModal)
    }, [isModal])

    useEffect(() => {
        const getSchedules = async () => {
            const startTime = new Date(
                new Date().getDate() - 1000,
            ).toISOString()
            const endTime = new Date().toISOString()
            const shcedules = await ScheduleAPI.getSchedules(
                Number(userId),
                startTime,
                endTime,
            )
            setSchedules(shcedules)
        }
        getSchedules()
    }, [])

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

        if (!user.userId) {
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
            {schedules &&
                schedules.task.map((schedule) => {
                    return (
                        <Schedule
                            key={schedule.id}
                            scheduleId={schedule.id}
                            time={formatDate(new Date(schedule.startTime))}
                            title={schedule.title}
                        />
                    )
                })}
            {!isModal && <AddScheduleButton />}
        </div>
    )
}
