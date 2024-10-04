import redaxios from "redaxios";

import { Vacation } from '@/module/vacation'
import { ResponseError } from "@/utils/error/ResponseError";

import { Message } from "@/module/message";
import { TypeMessage } from "@/module/typeMessage";

export class VacationApiClient {
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
     * Get the vacations for the user (intented use is for the dashboard)
     * @param token
     * @returns {Promise<string|*|string>}
     */
    async getVacations(token) {
        const result = await this._axios.get("/Vacations/User").catch(e => {
            if (!e.ok) {
                throw new ResponseError(e.statusText || e.data.message, e.status)
            }
        })

        const vacation_array = result.data
        if (vacation_array.length === 0) {
            return ""
        } else {
            return vacation_array
        }
    }

    /**
     * Get activities for the given vacationId
     * @param vacationId
     * @param token
     * @returns {Promise<any|string>}
     */
    async getActivities(vacationId) {
        try {
            const response = await this._axios.get(`/Vacation/${vacationId}/activities`)
            if (!response.ok) {
                throw new Error(e.statusText || e.data.message, e.status)
            }
            return response.data
        } catch (err) {
            return new Message(TypeMessage.ERROR, err.message)
        }
    }

    /**
     * Get the users associated with the given vacation ID
     * @param vacationId
     * @param token
     * @returns {Promise<any|string>}
     */
    async getMembers(vacationId) {
        try {
            const response = await this._axios.get(`/Vacations/${vacationId}/Members`)
            if (!response.ok) {
                throw new Error(e.statusText || e.data.message, e.status)
            }
            return response.data
        } catch (err) {
            return new Message(TypeMessage.ERROR, err.message)
        }
    }

    /**
     * Send the Vacation form to the api and retrieve the result of the request
     *
     * @param {Vacation} vacation     The vacation to send to the api
     *
     * @returns {String} Le résultat de la requête
     */
    async addVacation(vacation, uid, image) {
        const formData = new FormData()
        formData.append("title", vacation.name)
        formData.append("description", vacation.description)
        formData.append("place", vacation.place)
        formData.append("latitude", vacation.latitude)
        formData.append("longitude", vacation.longitude)
        formData.append("dateBegin", vacation.date_begin)
        formData.append("hourBegin", vacation.time_begin)
        formData.append("dateEnd", vacation.date_end)
        formData.append("hourEnd", vacation.time_end)
        formData.append("country", vacation.country)
        formData.append("userId", uid)
        formData.append("file", image)
        return await this._axios.post("/Vacations", formData)
            .then(response => {
                if (response.ok) {
                    return "Vacation added"
                } else {
                    return response.data.message
                }
            })
            .catch(error => {
                console.error(error);
                return response.data.message
            });
    }

    async addMember(userId, vacationId) {
        return await this._axios.post("/Vacations/members", {
            vacationId: vacationId,
            membersUid: [userId]
        }).then(response => {
            if (response.ok) {
                return response
            } else {
                throw new ResponseError(response.statusText || response.data.message, response.status)
            }
        }).catch(e => {
            if (!e.ok) {
                throw new ResponseError(e.statusText || e.data.message, e.status)
            }
        })
    }

    /**
     * Publish the given vacation.
     * 
     * @param {String} vacationId   Id of the vacation
     * @param {String} token        Token of the user
     * 
     * @returns {Promise<Message>}
     */
    async publish(vacationId) {
        return await this._axios.put(`/Vacations/${vacationId}`,
            {
                id: vacationId,
                isPublished: true
            }
        )
            .then(response => {
                if (response.ok) {
                    return new Message(TypeMessage.SUCCESS, "Vacation published")
                } else {
                    return new Message(TypeMessage.ERROR, response.data.message)
                }
            })
            .catch(error => {
                console.error(error);
                return new Message(TypeMessage.ERROR, "An error occured while performing the connection")
            })
    }

    /**
     * Get and return the vacation for the given id.
     *
     * @param {String} vacationId   Id of the vacation
     *
     * @returns {Promise<Vacation>} Object that represents the vacation
     */
    async getVacationById(vacationId) {
        return this._axios.get(`/vacations/${vacationId}`)
            .then(response => {
                if (response.ok) {
                    return response.data
                } else {
                    throw new Error(response.data.message)
                }
            })
            .then(result => {
                return new Vacation({
                    name: result.title,
                    description: result.description,
                    date_begin: result.dateBegin,
                    date_end: result.dateEnd,
                    time_begin: result.timeBegin,
                    time_end: result.timeEnd,
                    place: result.place,
                    latitude: result.latitude,
                    longitude: result.longitude,
                    userName: result.ownerName,
                    isPublished: result.isPublished,
                    picturePath: result.picturePath
                })
            })
            .catch(error => new Message(TypeMessage.ERROR, error))
    }

    /**
     * Get and return the planning of the vacation for the given id.
     *
     * @param {String} vacationId   Id of the vacation
     *
     * @returns {Promise<Vacation>} Promise with an object that represents the vacation
     */
    async getPlanningForVacation(vacationId) {
        return this._axios.get(`/vacation/${vacationId}/planning`)
            .then(response => {
                if (response.ok) {
                    return response.data
                } else {
                    throw new Error(response.data.message)
                }
            })
            .then(result => {
                return result.map(r => {
                    return { title: r.title, description: r.description, beginDate: r.beginDate, endDate: r.endDate, beginTime: r.beginTime, endTime: r.endTime, place: r.place }
                })
            })
            .catch(error => new Message(TypeMessage.ERROR, error))
    }

    async exportPlanning(vacationId) {
        return await this._axios.get(`/vacation/${vacationId}/planning/ics`, {
            responseType: 'blob'
        })
            .then(response => {
                // Extract the filename from the Content-Disposition header
                const filename = vacationId

                // Create a blob with the response content
                const blob = new Blob([response.data], { type: 'text/calendar' })

                // Create a link element to trigger the download
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = filename

                // Append the link to the document and trigger the download
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                return new Message(TypeMessage.SUCCESS, "Planning exported")
            })
            .catch(error => new Message(TypeMessage.ERROR, error))
    }

    async acceptInvitation(vacationId, invitationId) {
        try {
            let result = await this._axios.put(`${import.meta.env.VITE_BASE_URL}/vacations/${vacationId}/invitation/${invitationId}`, {
                isAccepted: true
            })
            return new Message(TypeMessage.SUCCESS, "Invitation accepted")
        } catch (err) {
            return new Message(TypeMessage.ERROR, err)
        }
    }
}