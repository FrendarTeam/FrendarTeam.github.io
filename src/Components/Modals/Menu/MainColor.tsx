import { color } from 'Types/Enum/main-color'
import React from 'react'

interface Props {
    color: color
    handleColor: (color: string) => void
}

export default function MainColor(props: Props) {
    const handleColor = (color: string) => {
        props.handleColor(color)
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
            
            w-10 h-10 rounded-full
            "
        ></div>
    )
}
