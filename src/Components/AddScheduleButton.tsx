import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddScheduleButton() {
    const navigate = useNavigate()

    const handleIsAddScheduleModal = () => {
        navigate('/schedule/add')
    }

    return (
        <div
            className="
        flex    
        fixed
        right-5
        bottom-5
        w-16
        h-16
        bg-lime-400
        rounded-full
        "
            onClick={handleIsAddScheduleModal}
        >
            <div
                className="
            flex
            items-center
            justify-center
            
            w-full
            text-3xl
            "
            >
                +
            </div>
        </div>
    )
}
