type Freinds = {
    nickname: string
}

export interface ScheduleData {
    id: number
    title: string
    location: string
    startTime: Date
    endTime: Date
    hostId: number
    participants: {
        userId: number
        nickname: string
    }[]
    color: string
    isPrivate: boolean
}

export interface Schedules {
    task: {
        id: number
        title: string
        location: string
        startTime: string
        endTime: string
        hostId: number
        color: string
        isPrivate: boolean
    }[]
}
