import {
    AddSchedule,
    ScheduleData,
    Schedules,
} from 'Types/Schedule/scheduleData'
import axios from './index'

export class ScheduleAPI {
    static getAllUserScheduleDates = async (
        userId: number,
        selectedDate: string,
    ): Promise<Schedules> => {
        const startMonth = new Date(selectedDate).getMonth() + 1

        const endMonth = new Date(selectedDate).getMonth() + 2

        const startTime = `${new Date(selectedDate).getFullYear()}-${
            startMonth < 10 ? `0${startMonth}` : startMonth
        }-01`
        const endTime = `${new Date(selectedDate).getFullYear()}-${
            endMonth < 10 ? `0${endMonth}` : endMonth
        }-01`

        const scheduleDates = await axios.get('/task/date', {
            params: {
                startTime: new Date(startTime).toISOString(),
                endTime: new Date(endTime).toISOString(),
                userId,
            },
        })
        return scheduleDates.data.data
    }

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
        console.log(schedules)
        return schedules.data.data
    }

    static getSchedule = async (
        scheduleId: number,
        userId: number,
    ): Promise<ScheduleData> => {
        const schedule = await axios.get('/task/detail', {
            params: {
                id: scheduleId,
                userId,
            },
        })
        return schedule.data.data
    }

    static addSchedule = async (addSchedule: AddSchedule): Promise<boolean> => {
        try {
            await axios.post('/task', {
                ...addSchedule,
            })
            return true
        } catch (e) {
            return false
        }
    }

    static updateSchedule = async (
        scheduleId: number,
        updateSchedule: AddSchedule,
    ): Promise<boolean> => {
        try {
            await axios.put('/task', {
                id: scheduleId,
                ...updateSchedule,
            })
            return true
        } catch (e) {
            return false
        }
    }

    static deleteSchedule = async (scheduleId: number): Promise<boolean> => {
        try {
            await axios.delete('/task', {
                params: {
                    id: scheduleId,
                },
            })
            return true
        } catch (e) {
            return false
        }
    }
}
