import React, { useCallback, useState } from 'react';
import ReactModal from 'react-modal';
import freindIcon from 'Assets/Images/freind.png';
import FrenidModal from './Modals/FrenidModal';

export default function Nav() {
    const [isFreindModal, setIsFreindModal] = useState<boolean>(false);
    const [isMenuModal, setIsMenuModal] = useState<boolean>(false);

    const handleIsFreindModal = useCallback(() => {
        setIsFreindModal(!isFreindModal);
    }, [isFreindModal]);

    const handleIsMenuModal = useCallback(() => {
        setIsMenuModal(!isMenuModal);
    }, [isMenuModal]);

    return (
        <div>
            {/* 친구 목록 모달 */}
            {isFreindModal && (
                <FrenidModal handleIsFreindModal={handleIsFreindModal} />
            )}
            <div className="flex flex-row justify-between items-center px-5 py-3">
                <div
                    className="flex flex-row items-center"
                    onClick={() => {
                        handleIsFreindModal();
                    }}
                >
                    <img src={freindIcon} className="w-8 h-8" />
                </div>
                {/* 햄버거 버튼 */}
                <div
                    className="flex flex-col h-4  justify-between"
                    onClick={() => handleIsMenuModal()}
                >
                    <div className="w-5 h-0.5  bg-slate-400" />
                    <div className="w-5 h-0.5 bg-slate-400" />
                    <div className="w-5 h-0.5 bg-slate-400" />
                </div>
            </div>
        </div>
    );
}
