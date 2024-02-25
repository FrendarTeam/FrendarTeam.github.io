import './App.css'
import Auth from 'Pages/Auth'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Main from 'Pages/Main'
import ScheduleAdd from 'Pages/ScheduleAdd'
import ScheduleEdit from 'Pages/ScheduleEdit'
import { useAppDispatch, useAppSelector } from 'Hooks/Redux'
import { useEffect } from 'react'
import { set } from 'Features/userSlice'
import { UserAPI } from 'Scripts/User'
import { getDarkMode } from 'Hooks/Dark'

function App() {
    const user = useAppSelector((state) => state.user).value
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const getUser = async () => {
            if (user.userId !== -1 || user.userId == undefined) {
                const user = await UserAPI.getUser()
                dispatch(
                    set({
                        userId: user.id,
                        nickname: user.nickname,
                        profileUrl: user.profileUrl,
                        code: user.code,
                        isNotification: user.isNotificationEnabled,
                    }),
                )

                localStorage.setItem('me', JSON.stringify(user))
            }

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
        }
        const setDarkMode = () => {
            const dark = getDarkMode()
            document.body.style.backgroundColor = dark
                ? 'rgb(51 65 85)'
                : 'white'
            document.body.style.color = dark ? 'white' : 'black'
        }
        setDarkMode()
        getUser()
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
