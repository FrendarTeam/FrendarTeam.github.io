import React from 'react';
import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';
import Schedule from 'Components/Schedule';
import Nav from 'Components/Nav';
import { AuthAPI } from 'Scripts/Auth';

export default function Main() {
    const logout = async () => {
        await AuthAPI.logout();
    };

    logout();
    return (
        <div className="flex flex-col flex-1">
            <Nav />
            <Calendar />
            <Schedule time={'19:00 PM'} title={'테스트 일정'} />
            <Schedule time={'07:00 AM'} title={'테스트 일정'} />
        </div>
    );
}
