import React, { useState } from 'react'
import ScheduleModal from './Modals/Schdules/ScheduleModal'

interface Props {
    time: string
    title: string
    color?: string
}

export default function Schedule(props: Props) {
    const [isScheduleModal, setIsScheduleModal] = useState<boolean>(false)

    const handleIsScheduleModal = async () => {
        setIsScheduleModal(!isScheduleModal)
    }

    return (
        <div className="px-5 pt-3 flex flex-row">
            {isScheduleModal && (
                <ScheduleModal handleIsScheduleModal={handleIsScheduleModal} />
            )}
            <div className="flex basis-[30%]">{props.time}</div>
            <div className="flex flex-col basis-[90%]">
                <div className="flex flex-row items-center basis-[30%]">
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
