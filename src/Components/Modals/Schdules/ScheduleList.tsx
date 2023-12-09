import { ScheduleData } from 'Types/Schedule/scheduleData'
import React, { useEffect, useState } from 'react'

export default function ScheduleList() {
    const [scheduleData, setScheduleData] = useState<ScheduleData>()

    useEffect(() => {
        const getScheduleData = async () => {
            // const scheduleData = await ScheduleData.getScheduleData()
            const mockData: ScheduleData = {
                title: 'title',
                location: 'location',
                startTime: new Date(),
                endTime: new Date(),
                isPrivate: false,
                freinds: [
                    {
                        nickname: 'user1',
                    },
                    {
                        nickname: 'user2',
                    },
                ],
            }
            setScheduleData(mockData)
        }
        getScheduleData()
    }, [])

    if (!scheduleData) return <></>

    return (
        <div className="flex w-full flex-col items-center">
            <div className="flex  flex-col w-4/5 ">
                <p>Title</p>
                <p
                    style={{
                        fontSize: '30px',
                    }}
                >
                    {scheduleData.title}
                </p>
            </div>
        </div>
    )
}
