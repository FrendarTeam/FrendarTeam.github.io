import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from 'Hooks/Redux';
import { set } from 'Features/userSlice';

import Calendar from 'react-calendar';
import Schedule from 'Components/Schedule';
import Nav from 'Components/Nav';
import { useEffect } from 'react';

export default function Main() {
    console.log(useAppSelector((state) => state.user));
    const userDispatch = useAppDispatch();

    useEffect(() => {
        userDispatch(
            set({
                userId: 1,
                nickname: 'test',
            }),
        );
    }, []);

    return (
        <div className="flex flex-col flex-1">
            <Nav />
            <Calendar />
            <Schedule time={'19:00 PM'} title={'테스트 일정'} />
            <Schedule time={'07:00 AM'} title={'테스트 일정'} />
        </div>
    );
}
