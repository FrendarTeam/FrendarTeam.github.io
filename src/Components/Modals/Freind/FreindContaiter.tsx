import { FriendAPI } from 'Scripts/Freind'
import React from 'react'

interface Props {
    friendId: number
    nickname: string
    profileUrl: string
    handleFreinds: () => void
}

export default function FreindContaiter(props: Props) {
    const handleDeleteFreind = async () => {
        // 삭제의 여부 확인
        const isDelete = window.confirm('친구를 삭제하시겠습니까?')
        if (!isDelete) return

        await FriendAPI.delete(props.friendId)

        props.handleFreinds()
    }

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
                <div className="  flex items-center  ">
                    <button
                        className="border-2 rounded-xl border-slate-400 bg-red-300 p-1 text-sm"
                        onClick={handleDeleteFreind}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    )
}
