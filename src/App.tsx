import './App.css'
import Auth from 'Pages/Auth'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Main from 'Pages/Main'
import ScheduleAdd from 'Pages/ScheduleAdd'
import ScheduleEdit from 'Pages/ScheduleEdit'
import { useAppDispatch } from 'Hooks/Redux'
import { useEffect } from 'react'
import { set } from 'Features/userSlice'

function App() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const me = localStorage.getItem('me')
        if (!me) {
            navigate('/auth')
            return
        }

        if (me) {
            const user = JSON.parse(me)
            dispatch(
                set({
                    userId: user.id,
                    nickname: user.nickname,
                    profileUrl: user.profileUrl,
                    code: user.code,
                    isNotification: user.isNotificationEnabled,
                }),
            )
        }
    }, [dispatch])

    return (
        <Routes>
            <Route path="/">
                <Route path="auth" element={<Auth />} />
                <Route path="schedule">
                    <Route path="add" element={<ScheduleAdd />} />
                    <Route path="edit/:scheduleId" element={<ScheduleEdit />} />
                    <Route path=":userId" element={<Main />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
