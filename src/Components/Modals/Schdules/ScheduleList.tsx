import { formatDate } from 'Scripts/Common'
import { ScheduleData } from 'Types/Schedule/scheduleData'
import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import './schedule.css'
import { ScheduleAPI } from 'Scripts/Schdule'
import { useParams } from 'react-router-dom'

interface Props {
    scheduleId: number
}

export default function Schedule(props: Props) {
    const [scheduleData, setScheduleData] = useState<ScheduleData>()
    const { userId } = useParams()
    useEffect(() => {
        const getScheduleData = async () => {
            const scheduleData = await ScheduleAPI.getSchedule(
                props.scheduleId,
                Number(userId),
            )

            const mockData: ScheduleData = {
                id: 0,
                title: '프렌더 회식',
                location: '서울특별시 강남구 어딘가 건물',
                startTime: new Date(),
                endTime: new Date(),
                isPrivate: false,
                hostId: 2,
                color: 'yellow',
                participants: [
                    {
                        userId: 1,
                        nickname: 'SUMIN',
                    },
                    {
                        userId: 2,
                        nickname: 'gwon',
                    },
                ],
            }
            setScheduleData(mockData)
        }
        getScheduleData()
    }, [])

    const handleAlarmToggle = async () => {
        setScheduleData((prev) => {
            if (prev) {
                return {
                    ...prev,
                    isPrivate: !prev.isPrivate,
                }
            }
            return prev
        })
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
            <div className="flex  flex-col w-4/5 ">
                <p className="header">Title</p>
                <p
                    style={{
                        fontSize: '30px',
                    }}
                >
                    {scheduleData.title}
                </p>
            </div>
            <div className="flex  flex-col w-4/5 ">
                <p className="header">Location</p>
                <p
                    style={{
                        fontSize: '24px',
                    }}
                >
                    {scheduleData.location}
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
                        {formatDate(scheduleData.startTime)}
                    </p>
                </div>
                <div className="flex flex-col w-full">
                    <p className="header">End Time</p>
                    <p
                        style={{
                            fontSize: '16px',
                        }}
                    >
                        {formatDate(scheduleData.endTime)}
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
                    defaultChecked={scheduleData.isPrivate}
                    onChange={handleAlarmToggle}
                />
            </div>
            <div className="flex flex-col w-4/5">
                <div className="flex">
                    <p className="header">참여자</p>
                </div>
                <div className="flex flex-row gap-4">
                    {scheduleData.participants.map((participant) => {
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
