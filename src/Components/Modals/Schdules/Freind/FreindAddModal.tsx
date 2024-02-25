import FreindContaiter from 'Components/Modals/Freind/FreindContaiter'
import { FriendAPI } from 'Scripts/Freind'
import { Freinds } from 'Types/Freind/freinds'
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

interface Props {
    handleIsFreindModal: () => void
    handleAddFreind: (freind: Freinds) => void
    existFreindIds: number[]
}

export default function FreindAddModal(props: Props) {
    const [modal, setModal] = useState(false)
    const [friends, setFriends] = useState<Freinds[]>([])

    const nodeRef = useRef(null)

    useEffect(() => {
        const getFreinds = async () => {
            const freindsData = await FriendAPI.getFriends()
            setFriends(freindsData)
        }
        getFreinds()
        setModal(true)
    }, [])

    const handleFreinds = () => {
        const getFreinds = async () => {
            const freindsData = await FriendAPI.getFriends()
            setFriends(freindsData)
        }
        getFreinds()
    }

    return (
        // transition
        <div>
            <div
                id={'ovelay'}
                style={{
                    backgroundColor: ' rgba(0, 0, 0, 0.4)',
                    width: '100%',
                    height: '100vh',
                    zIndex: 10,
                    position: 'fixed',
                    top: '0',
                    left: '0',
                }}
                onClick={(e) => {
                    setModal(false)
                    props.handleIsFreindModal()
                }}
            ></div>
            {/* content */}
            <CSSTransition
                in={modal}
                nodeRef={nodeRef}
                timeout={200}
                classNames={'modal'}
            >
                <div
                    ref={nodeRef}
                    id={'content'}
                    style={{
                        width: '80%',
                        height: '100%',

                        zIndex: 100,
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        borderRadius: '0px 10px 10px 0px',
                        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',

                        justifyContent: 'center',
                        overflow: 'auto',
                        backgroundColor: 'white',
                    }}
                >
                    <div className="flex flex-col w-full    h-full justify-end items-center">
                        <div className="flex w-full h-5/6 flex-col  overflow-scroll items-center">
                            {friends.map((freind) => {
                                let isExist = false
                                if (props.existFreindIds.includes(freind.id)) {
                                    isExist = true
                                }
                                return (
                                    <div
                                        className="flex flex-row w-full items-center  gap-2"
                                        key={freind.id}
                                    >
                                        <FreindContaiter
                                            friendId={freind.friendId}
                                            nickname={freind.nickname}
                                            profileUrl={freind.profileUrl}
                                            handleFreinds={handleFreinds}
                                        />
                                        {!isExist && (
                                            <button
                                                className="
                                        bg-blue-500
                                        text-white
                                        mb-4
                                        rounded-full p-2
                                        
                                        "
                                                onClick={() =>
                                                    props.handleAddFreind(
                                                        freind,
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}
