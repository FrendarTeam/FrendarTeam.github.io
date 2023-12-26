import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './schedule-modal.css'
import Schedule from './ScheduleList'

interface Props {
    scheduleId: number
    handleIsScheduleModal: () => void
}
export default function ScheduleModal(props: Props) {
    const [modal, setModal] = useState(false)
    const nodeRef = useRef(null)

    useEffect(() => {
        setModal(true)
    }, [])

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
                    setTimeout(() => {
                        props.handleIsScheduleModal()
                    }, 200)
                }}
            ></div>
            {/* content */}
            <CSSTransition
                in={modal}
                nodeRef={nodeRef}
                timeout={200}
                classNames={'schedule-modal'}
            >
                <div
                    ref={nodeRef}
                    id={'content'}
                    style={{
                        width: '100%',
                        height: '60%',

                        zIndex: 100,
                        position: 'fixed',
                        bottom: '0',
                        left: '0',
                        // transform: !modal ? 'translate(-100%, 0%)' : '',
                        borderRadius: '50px 50px 0px 0px',
                        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',

                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'auto',
                        backgroundColor: 'white',
                    }}
                >
                    <div
                        className="flex 
                    flex-col
                    w-full
                    h-full
                    justify-center
                    "
                    >
                        <Schedule scheduleId={props.scheduleId} />
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}
