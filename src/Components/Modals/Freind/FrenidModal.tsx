import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import AddFreind from '../Buttons/AddFreind';
import FreindContaiter from './FreindContaiter';
import './freind-modal.css';
import { CSSTransition } from 'react-transition-group';

interface Props {
    handleIsFreindModal: () => void;
}

export default function FrenidModal(props: Props) {
    const [modal, setModal] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        setModal(true);
    }, []);

    return (
        // transition
        <div
            id={'ovelay'}
            style={{
                backgroundColor: ' rgba(0, 0, 0, 0.4)',
                width: '100%',
                height: '100vh',
                zIndex: '10',
                position: 'fixed',
                top: '0',
                left: '0',
            }}
            onClick={() => {
                setModal(false);
                setTimeout(() => {
                    props.handleIsFreindModal();
                }, 200);
            }}
        >
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
                        zIndex: '150',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        // transform: !modal ? 'translate(-100%, 0%)' : '',
                        borderRadius: '0px 10px 10px 0px',
                        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',

                        justifyContent: 'center',
                        overflow: 'auto',
                        backgroundColor: 'white',
                    }}
                >
                    <div className="flex flex-col w-full    h-full justify-end items-center">
                        <div className="flex w-5/6 items-center   h-1/5">
                            <AddFreind />
                        </div>
                        <div className="flex w-full h-5/6 flex-col  overflow-scroll items-center">
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                            <FreindContaiter />
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}
