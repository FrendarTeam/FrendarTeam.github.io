import { formatDate } from 'Scripts/Common'
import { ScheduleData } from 'Types/Schedule/scheduleData'
import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import './schedule.css'
import { ScheduleAPI } from 'Scripts/Schdule'
import { useNavigate, useParams } from 'react-router-dom'
import pencil from 'Assets/Images/pencil.png'
import trash from 'Assets/Images/trash.png'
import { getDarkMode } from 'Hooks/Dark'

interface Props {
    scheduleId: number
}

export default function Schedule(props: Props) {
    const [scheduleData, setScheduleData] = useState<ScheduleData>()
    const navigate = useNavigate()

    const { userId } = useParams()
    useEffect(() => {
        const getScheduleData = async () => {
            const scheduleData = await ScheduleAPI.getSchedule(
                props.scheduleId,
                Number(userId),
            )

            setScheduleData(scheduleData)
        }
        getScheduleData()
    }, [])

    const handleAlarmToggle = async () => {
        setScheduleData((prev) => {
            if (prev) {
                return {
                    ...prev,
                    isPrivate: !prev.task.isPrivate,
                }
            }
            return prev
        })
    }

    const handleDelete = async () => {
        const confirm = window.confirm('일정을 삭제하시겠습니까?')
        if (confirm) {
            const isSuccessDelete = await ScheduleAPI.deleteSchedule(
                props.scheduleId,
            )
            if (isSuccessDelete) {
                alert('일정 삭제 성공!')
            }

            if (!isSuccessDelete) {
                alert('에러가 발생했습니다!')
            }
            navigate(0)
        }
    }

    if (!scheduleData) return <></>

    return (
        <div
            className="
        flex
        w-full 
        flex-col 
        items-center
        gap-2
        "
        >
            <div
                style={{
                    width: '80%',
                }}
            >
                <div className="flex flex-row justify-end gap-3">
                    <img
                        src={pencil}
                        className=" w-6"
                        alt="pencil"
                        onClick={() =>
                            navigate(
                                '/schedule/edit/' +
                                    props.scheduleId +
                                    '?userId=' +
                                    userId,
                            )
                        }
                    />
                    <img
                        src={trash}
                        className="w-6"
                        alt="trash"
                        onClick={handleDelete}
                    />
                </div>
            </div>
            <div className="flex  flex-col w-4/5 ">
                <p className="header">Title</p>
                <p
                    style={{
                        fontSize: '30px',
                    }}
                >
                    {scheduleData.task.title}
                </p>
            </div>
            <div className="flex  flex-col w-4/5 ">
                <p className="header">Location</p>
                <p
                    style={{
                        fontSize: '24px',
                    }}
                >
                    {scheduleData.task.location}
                </p>
            </div>
            <div className="flex  flex-row w-4/5 ">
                <div className="flex flex-col w-full">
                    <p className="header">Start Time</p>
                    <p
                        style={{
                            fontSize: '16px',
                        }}
                    >
                        {formatDate(new Date(scheduleData.task.startTime))}
                    </p>
                </div>
                <div className="flex flex-col w-full">
                    <p className="header">End Time</p>
                    <p
                        style={{
                            fontSize: '16px',
                        }}
                    >
                        {formatDate(new Date(scheduleData.task.endTime))}
                    </p>
                </div>
            </div>
            <div
                className="
            flex 
            flex-row 
            w-4/5
            justify-between
            "
            >
                <p className="header">공개 여부</p>
                <Toggle
                    id="cheese-status"
                    defaultChecked={scheduleData.task.isPrivate}
                    onChange={handleAlarmToggle}
                />
            </div>
            <div className="flex flex-col w-4/5">
                <div className="flex">
                    <p className="header">참여자</p>
                </div>
                <div className="flex flex-row gap-4">
                    {scheduleData.task.participants.map((participant) => {
                        return (
                            <div
                                key={participant.userId}
                                style={{
                                    fontSize: '16px',
                                    // border: '1px solid black',
                                    padding: '6px 15px',
                                    borderRadius: '50px',
                                    backgroundColor: '#EAEAEA',
                                }}
                            >
                                {participant.nickname}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
