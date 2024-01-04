import { useAppDispatch, useAppSelector } from 'Hooks/Redux'
import { setModal } from 'Features/modal-slice'
import { useCallback } from 'react'

export default function HandleIsModal() {
    const isModal = useAppSelector((state) => state.modal).value.isModal
    const dispatch = useAppDispatch()
    const handleModal = () => {
        dispatch(setModal({ isModal: !isModal }))
    }

    return { isModal, handleModal }
}
