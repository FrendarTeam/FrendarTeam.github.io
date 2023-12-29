import './App.css'
import Auth from 'Pages/Auth'
import { Route, Routes } from 'react-router-dom'
import Main from 'Pages/Main'
import ScheduleAdd from 'Pages/ScheduleAdd'

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route path="auth" element={<Auth />} />
                <Route path="schedule">
                    <Route path="add" element={<ScheduleAdd />} />
                    <Route path=":userId" element={<Main />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
