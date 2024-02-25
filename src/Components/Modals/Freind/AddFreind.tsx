import { FriendAPI } from 'Scripts/Freind'
import React from 'react'

interface Props {
    handleFreinds: () => void
}

export default function AddFreind(props: Props) {
    const submitFreindCode = async () => {
        const code = document.getElementsByName('code')[0] as HTMLInputElement
        await FriendAPI.addFriend(code.value)
        props.handleFreinds()
    }

    return (
        <div className="flex justify-center items-center w-full ">
            <div className="flex  justify-around w-full">
                <input
                    name="code"
                    className=" border-4 rounded-xl	border-slate-300 w-3/5	"
                />
                <div className="border-2 w-16 h-10 flex justify-center rounded-xl">
                    <button onClick={() => submitFreindCode()}>추가</button>
                </div>
            </div>
        </div>
    )
}
