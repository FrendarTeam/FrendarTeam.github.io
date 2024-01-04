import React from 'react'

interface Props {
    nickname: string
    profileUrl: string
    handleDelete: () => void
}

export default function Participation(props: Props) {
    return (
        <div className="flex flex-col relative">
            <div>
                <img
                    src={props.profileUrl}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                />
                <p>{props.nickname}</p>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '0px',
                }}
                className=" rounded-full bg-slate-300 w-5 h-5 flex justify-center items-center"
                onClick={props.handleDelete}
            >
                x
            </div>
        </div>
    )
}
