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
}
