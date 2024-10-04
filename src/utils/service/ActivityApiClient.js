import redaxios from "redaxios";

import { Message } from "@/module/message";
import { TypeMessage } from "@/module/typeMessage";

export class ActivityApiClient {
    constructor(token) {
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
     * Add an activity to a vacation.
     * 
     * @param {Number} vacationId   Id of the vacation to wich we want to add an activity
     * @param {String} title        Title of the activity we want to add
     * @param {String} place        Place where the activity will be
     * @param {String} description  Description of the vacation
     * @param {Number} lon          Longitude of the place
     * @param {Number} lat          Latitude of the place
     * @returns {Message}           A message that tells if an error occured or if everything goes fine.
     */
    async addActivity(vacationId, title, place, description, lon, lat) {
        return await this._axios.post(`/vacationactivities`, {
            vacationId,
            "activities": [
                {
                    title,
                    description,
                    longitude: lon,
                    latitude: lat,
                    place
                }
            ]
        })
            .then(response => {
                if (response.ok) {
                    return response.data.activities
                } else {
                    return new Message(TypeMessage.ERROR, "Erro while adding the activity")
                }
            })
            .catch(error => new Message(TypeMessage.ERROR, error))
    }

    async planActivity(activityId, dateBegin, dateEnd) {
        return await this._axios.put(`/VacationActivities/${activityId}/planning`, {
            dateTimeBegin: dateBegin,
            dateTimeEnd: dateEnd
        }).then(response => {
            if (response.ok) {
                return new Message(TypeMessage.SUCCESS, "Activity planned")
            } else {

            }
        }).catch(error => new Message(TypeMessage.ERROR, error))
    }
}