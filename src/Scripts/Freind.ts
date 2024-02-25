import { Freinds } from 'Types/Freind/freinds'
import axios from './index'

export class FriendAPI {
    static getFriends = async (): Promise<Freinds[]> => {
        try {
            const freind = await axios.get('/friend')
            const data: Freinds[] = freind.data.data.friends

            return data
        } catch (err) {
            console.log(err)
            throw Error("Can't get freinds")
        }
    }

    static addFriend = async (code: string): Promise<boolean> => {
        try {
            await axios.post('/friend', { code })

            return true
        } catch (err) {
            throw Error("Can't add freind")
        }
    }

    static delete = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/friend?id=${id}`)

            return true
        } catch (err) {
            throw Error("Can't delete freind")
        }
    }
}
