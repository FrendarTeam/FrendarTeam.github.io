// import 'react-calendar/dist/Calendar.css'
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
    const [isDark, setIsDark] = useState(false)
    const isModal = useAppSelector((state) => state.modal).value.isModal

    const [schedules, setSchedules] = useState<Schedules | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const [allUserScheduleDates, setAllUserScheduleDates] = useState<Schedules>(
        {
            task: [],
        },
    )

    useEffect(() => {
        const today = new Date(selectedDate.setHours(9, 0, 0, 0)).toISOString()
        const tomorrow = new Date(
            selectedDate.setDate(selectedDate.getDate() + 1),
        ).toISOString()
        const getSchedules = async () => {
            const startTime = today
            const endTime = tomorrow
            const shcedules = await ScheduleAPI.getSchedules(
                Number(user.userId),
                startTime,
                endTime,
            )
            setSchedules(shcedules)
        }
        getSchedules()
    }, [selectedDate])

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

        const getIsDark = () => {
            const color = localStorage.getItem('color')
            if (color === 'black') {
                setIsDark(true)
            } else {
                setIsDark(false)
            }
        }

        const getAllUserScheduleDates = async () => {
            const allUserScheduleDates =
                await ScheduleAPI.getAllUserScheduleDates(
                    Number(user.userId),
                    selectedDate.toISOString(),
                )
            setAllUserScheduleDates(allUserScheduleDates)
        }

        if (!user.userId) {
            getUser()
        }
        getIsDark()
        getAllUserScheduleDates()
    }, [user])

    return (
        <div
            className={`flex flex-col flex-1
            ${isDark ? 'bg-slate-700   text-slate-300' : ''}
        `}
        >
            <Nav />

            <div className="flex justify-center ">
                <Calendar
                    className={`${isDark ? 'bg-slate-800 text-slate-300' : ''}`}
                    formatDay={(locale, date) => {
                        if (date.getDate() < 10) {
                            return '0' + date.getDate().toString()
                        }
                        return date.getDate().toString()
                    }}
                    navigationLabel={({ date, label, locale, view }) => {
                        return `${date.getFullYear()} - ${date.getMonth() + 1} `
                    }}
                    onClickDay={(value) => {
                        const date = new Date(value).toISOString()
                        setSelectedDate(new Date(date))
                    }}
                    tileClassName={({ date, view }) => {
                        if (allUserScheduleDates) {
                            const isSchedule = allUserScheduleDates.task.some(
                                (schedule) => {
                                    const startTime = new Date(
                                        new Date(schedule.startTime).setHours(
                                            0,
                                            0,
                                            0,
                                            0,
                                        ),
                                    )
                                    const endTime = new Date(
                                        new Date(schedule.endTime).setHours(
                                            0,
                                            0,
                                            0,
                                            0,
                                        ),
                                    )

                                    // console.log('fail')
                                    // console.log('date :', date)
                                    // console.log('startTime :', startTime)
                                    // console.log('endTime :', endTime)
                                    return (
                                        new Date(date) >= startTime &&
                                        new Date(date) <= endTime
                                    )
                                },
                            )
                            // console.log(isSchedule, date)
                            if (isSchedule) {
                                return 'has-schedule'
                            }
                        }
                        return ''
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
                            color={schedule.color}
                        />
                    )
                })}
            {!isModal && <AddScheduleButton />}
        </div>
    )
}
