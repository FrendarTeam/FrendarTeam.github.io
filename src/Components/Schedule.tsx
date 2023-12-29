import React, { useCallback, useState } from 'react'
import ScheduleModal from './Modals/Schdules/ScheduleModal'
import HandleIsModal from 'Hooks/Redux/modal'
// import HandleIsModal from 'Hooks/Redux/modal'

interface Props {
    scheduleId: number
    time: string
    title: string
    color?: string
}

export default function Schedule(props: Props) {
    const [isScheduleModal, setIsScheduleModal] = useState<boolean>(false)
    const { handleModal } = HandleIsModal()

    const handleIsScheduleModal = useCallback(() => {
        handleModal()
        const time = setTimeout(() => {
            setIsScheduleModal(!isScheduleModal)
        }, 200)

        return () => clearTimeout(time)
    }, [isScheduleModal])

    return (
        <div className="px-5 pt-3 flex flex-row">
            {isScheduleModal && (
                <ScheduleModal
                    scheduleId={props.scheduleId}
                    handleIsScheduleModal={handleIsScheduleModal}
                />
            )}
            <div className="flex    font-light text-sm basis-[30%]">
                {props.time}
            </div>
            <div className="flex flex-col basis-[90%]  w-full">
                <div className="flex flex-row items-center  basis-[30%]">
                    <div
                        style={{
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        }}
                    />
                </div>
                <div className="w-full flex basis-20">
                    <div
                        className="w-full h-full rounded-lg"
                        style={{
                            backgroundColor: props.color
                                ? props.color
                                : 'rgba(0,0,0,0.1)',
                        }}
                        onClick={() => {
                            handleIsScheduleModal()
                        }}
                    >
                        {props.title}
                    </div>
                </div>
            </div>
        </div>
    )
}
