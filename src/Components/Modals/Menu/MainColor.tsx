import { color } from 'Types/Enum/main-color'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    color: color
    handleColor: (color: string) => void
}

export default function MainColor(props: Props) {
    const navigate = useNavigate()
    const handleColor = (color: string) => {
        props.handleColor(color)
        if (color === 'black') {
            localStorage.setItem('color', 'black')
        }
        if (color === 'white') {
            localStorage.setItem('color', 'white')
        }
        navigate(0)
    }
    return (
        <div
            onClick={() => {
                handleColor(props.color)
            }}
            style={{
                backgroundColor: props.color,
            }}
            className="
                border-2 border-slate-400
            w-10 h-10 rounded-full
            "
        ></div>
    )
}
