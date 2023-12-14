import { useCallback, useState } from 'react'

import { setModal } from 'Features/modal-slice'
import freindIcon from 'Assets/Images/freind.png'
import FrenidModal from './Modals/Freind/FrenidModal'
import MenuModal from './Modals/Menu/Menu'
import { useAppDispatch, useAppSelector } from 'Hooks/Redux'

export default function Nav() {
    const [isFreindModal, setIsFreindModal] = useState<boolean>(false)
    const [isMenuModal, setIsMenuModal] = useState<boolean>(false)
    const isModal = useAppSelector((state) => state.modal).value.isModal

    const dispatch = useAppDispatch()

    const handleIsFreindModal = useCallback(() => {
        dispatch(
            setModal({
                isModal: !isModal,
            }),
        )
        setIsFreindModal(!isFreindModal)
    }, [isFreindModal])

    const handleIsMenuModal = useCallback(() => {
        setIsMenuModal(!isMenuModal)
    }, [isMenuModal])

    return (
        <div>
            {/* 친구 목록 모달 */}
            {isFreindModal && (
                <FrenidModal handleIsFreindModal={handleIsFreindModal} />
            )}
            {/* 메뉴 모달 */}
            {isMenuModal && <MenuModal handleIsMenuModal={handleIsMenuModal} />}
            <div className="flex flex-row justify-between items-center px-5 py-3">
                <div
                    className="flex flex-row items-center"
                    onClick={() => {
                        handleIsFreindModal()
                    }}
                >
                    <img
                        src={freindIcon}
                        className="w-8 h-8"
                        alt={'freing icon'}
                    />
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
    )
}
