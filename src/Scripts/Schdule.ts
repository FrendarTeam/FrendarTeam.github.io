import { ScheduleData, Schedules } from 'Types/Schedule/scheduleData'
import axios from './index'

export class ScheduleAPI {
    static getSchedules = async (
        userId: number,
        startTime: string,
        endTime: string,
    ): Promise<Schedules> => {
        const schedules = await axios.get('/task/date', {
            params: {
                userId,
                startTime,
                endTime,
            },
        })
        return schedules.data.data
    }

    static getSchedule = async (
        scheduleId: number,
        userId: number,
    ): Promise<ScheduleData> => {
        console.log(scheduleId, userId)
        const schedule = await axios.get('/task/detail', {
            params: {
                id: scheduleId,
                userId,
            },
        })
        return schedule.data.data
    }
}
