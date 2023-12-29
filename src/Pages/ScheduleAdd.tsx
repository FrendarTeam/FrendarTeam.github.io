import Nav from 'Components/Nav'
import React, { useState } from 'react'
import Toggle from 'react-toggle'

export default function ScheduleAdd() {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [participants, setParticipants] = useState([])

    const handleIsPrivate = () => {
        setIsPrivate(!isPrivate)
    }

    // 폼 제출 핸들러
    const handleClick = (event: any) => {
        const submitForm = {
            title,
            location,
            startTime,
            endTime,
            isPrivate,
        }
        console.log('submitForm', submitForm)
    }

    return (
        <div>
            <Nav />
            <div className="flex w-full flex-col  items-center justify-center h-full gap-2">
                <div className="flex flex-col  w-4/5">
                    <label htmlFor="title" className="header">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="rounded p-2divide-slate-800	  border	 text-2xl"
                    />

                    <label htmlFor="location" className="header mt-4">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="rounded p-2divide-slate-800 border p-2  text-base"
                    />

                    <label htmlFor="startTime" className="header mt-4">
                        Start Time
                    </label>
                    <input
                        id="startTime"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="rounded p-2 text-xl"
                    />

                    <label htmlFor="endTime" className="header mt-4">
                        End Time
                    </label>
                    <input
                        id="endTime"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="rounded p-2 text-xl"
                    />

                    <div className="flex flex-row justify-between mt-4">
                        <label htmlFor="isPrivate" className="header">
                            공개 여부
                        </label>
                        <Toggle
                            id="isPrivate"
                            defaultChecked={false}
                            onChange={handleIsPrivate}
                        />
                    </div>

                    {/* 참여자 리스트 관리 로직 추가 필요 */}
                    <div className="flex flex-col mt-4">
                        <p className="header">참여자</p>
                        {/* 참여자 관리 로직 */}
                    </div>

                    <button
                        type="button"
                        onClick={handleClick}
                        className="mt-4 rounded bg-blue-500 text-white p-2"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
