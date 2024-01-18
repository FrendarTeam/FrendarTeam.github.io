import FrenidModal from 'Components/Modals/Freind/FrenidModal'
import FreindAddModal from 'Components/Modals/Schdules/Freind/FreindAddModal'
import Nav from 'Components/Nav'
import Participation from 'Components/Schedule/Participation'
import { useAppSelector } from 'Hooks/Redux'
import HandleIsModal from 'Hooks/Redux/modal'
import { ScheduleAPI } from 'Scripts/Schdule'
import { UserAPI } from 'Scripts/User'
import mainColor from 'Types/Enum/main-color'
import { color } from 'Types/Enum/main-color'
import { Freinds } from 'Types/Freind/freinds'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Toggle from 'react-toggle'

export default function ScheduleEdit() {
    const { scheduleId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const userId = searchParams.get('userId')

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [startTime, setStartTime] = useState<any>('')
    const [endTime, setEndTime] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [participants, setParticipants] = useState<Freinds[]>([])
    const [color, setColor] = useState<color>('')

    const user = useAppSelector((state) => state.user).value
    const navigete = useNavigate()

    const [isFreindModal, setIsFreindModal] = useState<boolean>(false)

    console.log(startTime)

    useEffect(() => {
        const handleForm = async () => {
            if (!scheduleId || !Number(scheduleId) || !userId) {
                navigete('/schedule/' + user.userId)
            }
            const schedule = await ScheduleAPI.getSchedule(
                Number(scheduleId),
                Number(userId),
            )

            function convertToShortISO(isoString: string) {
                const date = new Date(isoString)
                return date.toISOString().slice(0, 16)
            }

            setTitle(schedule.task.title)
            setLocation(schedule.task.location)
            setStartTime(convertToShortISO(schedule.task.startTime))
            setEndTime(convertToShortISO(schedule.task.endTime))
            setIsPrivate(schedule.task.isPrivate)
            // setParticipants(schedule.task.participants)
            setColor(schedule.task.color)

            for (const participant of schedule.task.participants) {
                const user = await UserAPI.getUser(participant.userId)
            }
        }

        handleForm()
        return () => {}
    }, [])

    const { handleModal } = HandleIsModal()

    const handleIsPrivate = () => {
        setIsPrivate(!isPrivate)
    }

    // 폼 제출 핸들러
    const handleClick = useCallback(async () => {
        const submitForm = {
            title,
            location,
            startTime,
            endTime,
            isPrivate,
            participants: participants.map((participant) => participant.id),
            color,
        }

        const isEmptyValue = Object.values(submitForm).some(
            (value) => value === '',
        )

        if (isEmptyValue) {
            alert('빈칸을 채워주세요')
            return
        }

        const isSuccessAddSchedule = await ScheduleAPI.addSchedule(submitForm)

        if (isSuccessAddSchedule) {
            alert('일정 추가 성공!')
        }

        if (!isSuccessAddSchedule) {
            alert('에러가 발생했습니다!')
        }

        navigete('/schedule/' + user.userId)
    }, [title, location, startTime, endTime, isPrivate, participants, color])

    const handleIsFreindModal = useCallback(() => {
        setIsFreindModal(!isFreindModal)
        handleModal()
        const time = setTimeout(() => {
            setIsFreindModal(!isFreindModal)
        }, 200)

        return () => clearTimeout(time)
    }, [isFreindModal])

    const handleAddFreind = (freind: Freinds) => {
        console.log('click')
        setParticipants((prev) => [...prev, freind])
    }

    const handleDeleteFreind = (freindId: number) => {
        setParticipants((prev) =>
            prev.filter((participant) => participant.id !== freindId),
        )
    }

    const handleSelectColor = (color: string) => {
        setColor(color)
    }

    return (
        <div>
            <Nav />
            {isFreindModal && (
                <FreindAddModal
                    handleIsFreindModal={handleIsFreindModal}
                    handleAddFreind={handleAddFreind}
                    existFreindIds={participants.map(
                        (participant: Freinds) => participant.id,
                    )}
                />
            )}
            {/* 참여자 목록 모달 */}

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

                        <div
                            className="
                                flex w-full
                                justify-start
                                h-2/5
                                gap-3
                            "
                        >
                            {participants.map((participant) => {
                                return (
                                    <Participation
                                        key={participant.id}
                                        nickname={participant.nickname}
                                        profileUrl={participant.profileUrl}
                                        handleDelete={() => {
                                            handleDeleteFreind(participant.id)
                                        }}
                                    />
                                )
                            })}
                            <button
                                type="button"
                                className="rounded w-1/5 h-9 bg-blue-500 text-white p-2"
                                onClick={() => handleIsFreindModal()}
                            >
                                추가
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="color" className="header">
                            Color
                        </label>
                        <div className="flex flex-row justify-between">
                            {mainColor.map((c) => {
                                const isSelectedColor = color === c
                                return (
                                    <div key={c}>
                                        {isSelectedColor && (
                                            <div
                                                className="
                                                w-10 h-10 rounded-full
                                                border-2
                                                border-blue-500

                                                "
                                                style={{
                                                    backgroundColor: c,
                                                }}
                                                onClick={() =>
                                                    handleSelectColor(c)
                                                }
                                            ></div>
                                        )}
                                        {!isSelectedColor && (
                                            <div
                                                className="
                                                w-10 h-10 rounded-full
                                                
                                                "
                                                style={{
                                                    backgroundColor: c,
                                                }}
                                                onClick={() =>
                                                    handleSelectColor(c)
                                                }
                                            ></div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
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
