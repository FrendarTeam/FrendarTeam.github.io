type Freinds = {
    nickname: string
}

export interface ScheduleData {
    title: string
    location: string
    startTime: Date
    endTime: Date
    freinds: Freinds[]
    isPrivate: boolean
}
