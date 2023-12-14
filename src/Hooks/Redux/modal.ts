import { useAppDispatch, useAppSelector } from 'Hooks/Redux'
import { setModal } from 'Features/modal-slice'
import { useEffect } from 'react'

export default function HandleIsModal() {
    const isModal = useAppSelector((state) => state.modal).value
    const dispatch = useAppDispatch()

    const handleIsModal = () => {
        dispatch(setModal({ isModal: !isModal }))
    }

    useEffect(() => {
        handleIsModal()
        return () => {
            handleIsModal()
        }
    }, [])

    return isModal
}
