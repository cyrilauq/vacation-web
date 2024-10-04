import redaxios from "redaxios";
import { ResponseError } from "@/utils/error/ResponseError";

export class UserApiClient {
    constructor(token = "") {
        this._axios = redaxios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
            fetch,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * Get an array of members that match the given value (name, firstname or mail)
     * @param value
     * @returns {Promise<*|string>}
     */
    async searchMembers(value) {
        const result = await this._axios.get("Users/list/" + value).catch(e => {
            if (!e.ok) {
                throw new ResponseError(e.statusText || e.data.message, e.status)
            }
        })

        const members_array = result.data.result
        if (members_array.length === 0) {
            return ""
        } else {
            return members_array
        }
    }

    async getInvitations() {
        try {
            const response = await this._axios.get(`/users/invitations`)
            if (!response.ok) {
                throw new Error(e.statusText || e.data.message, e.status)
            }
            return response.data
        } catch (err) {
            return new Message(TypeMessage.ERROR, err.message)
        }
    }
}