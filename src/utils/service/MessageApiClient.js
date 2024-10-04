import redaxios from "redaxios";

import { Vacation } from '../../module/vacation'
import { ResponseError } from "@/utils/error/ResponseError";

import { Message } from "../../module/message";
import { TypeMessage } from "../../module/typeMessage";

export class MessageApiClient {
    constructor(token) {
        this._axios = redaxios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    async getMessage(vacationId) {
        return await this._axios.get(`tchat/vacation/${vacationId}/message`)
            .then(response => {
                if (response.ok) {
                    return response.data
                } else {
                    throw new Error(response.data.message)
                }
            })
            .catch(error => new Message(TypeMessage.ERROR, error))
    }

    async sendMessage(vacationId, message) {
        return await this._axios.post(`tchat/vacation/${vacationId}/message`, {
            vacationId: vacationId,
            content: message
        })
            .then(response => {
                if (response.ok) {
                    return new Message(TypeMessage.SUCCESS, "Message successfully sent")
                } else {
                    throw new Error(response.data.message)
                }
            })
            .catch(error => new Message(TypeMessage.ERROR, error))
    }
}