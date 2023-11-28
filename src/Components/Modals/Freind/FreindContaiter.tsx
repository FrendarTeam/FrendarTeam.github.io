import React from 'react'

interface Props {
    nickname: string
    profileUrl: string
}

export default function FreindContaiter(props: Props) {
    return (
        <div className="w-5/6 mb-4">
            <div
                className="
        flex 
       
        h-20
        rounded-xl border-2
        border-slate-400
        flex-row
        justify-around
        "
            >
                <div
                    id="profile-image-container"
                    className="flex items-center "
                >
                    <img
                        className="h-16 w-16  object-cover rounded-full"
                        src={props.profileUrl}
                        alt="profile"
                    />
                </div>
                <div
                    id="profile-info-container"
                    className="flex flex-col justify-center"
                >
                    <div className="flex flex-col ">
                        <div className="flex">{props.nickname}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
