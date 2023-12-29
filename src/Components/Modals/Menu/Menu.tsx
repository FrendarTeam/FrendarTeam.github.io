import { useEffect, useRef, useState } from 'react'
import './menu-modal.css'
import { CSSTransition } from 'react-transition-group'
import MenuList from './MenuList'
import { useAppSelector } from 'Hooks/Redux'

interface Props {
    handleIsMenuModal: () => void
}

export default function MenuModal(props: Props) {
    const [modal, setModal] = useState(false)
    const nodeRef = useRef(null)

    useEffect(() => {
        setModal(true)
    }, [])
    return (
        <div>
            <div
                id={'ovelay'}
                style={{
                    backgroundColor: ' rgba(0, 0, 0, 0.4)',
                    width: '100%',
                    height: '100%',
                    zIndex: '10',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                }}
                onClick={() => {
                    setModal(false)

                    props.handleIsMenuModal()
                }}
            ></div>
            <CSSTransition
                in={modal}
                nodeRef={nodeRef}
                timeout={200}
                classNames={'menu-modal'}
            >
                <div
                    ref={nodeRef}
                    id={'content'}
                    style={{
                        width: '80%',
                        height: '100%',
                        zIndex: '150',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        // transform: !modal ? 'translate(-100%, 0%)' : '',
                        borderRadius: '10px 0px 0px 10px',
                        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',

                        justifyContent: 'center',
                        overflow: 'auto',
                        backgroundColor: 'white',
                    }}
                >
                    <div className="flex flex-col w-full    h-full justify-center  items-center">
                        <MenuList />
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}
