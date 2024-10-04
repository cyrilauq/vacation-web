import redaxios from "redaxios";

export class ContactApiClient {
    constructor() {
        this._baseUrl = import.meta.env.VITE_BASE_URL
        this._axios = redaxios.create({ fetch, responseType: 'json' })

        this._axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
    }

    /**
     * Send the contact form to the api and retrieve the result of the request
     * 
     * @param {String} name         Name of the person that wants to send the form
     * @param {String} firstname    Firstname of the person that wants to send the form
     * @param {String} message      Message written by the person.
     * @param {String} mail         Mail of the person that send the forms
     * 
     * @returns {String} Le résultat de la requête
     */
    async contact(name, firstname, mail, message) {
        return await this._axios.post("/mail", { senderName: name, senderFirstName: firstname, senderMail: mail, message: message })
            .then(response => {
                if (response.ok) {
                    return "Mail send"
                } else {
                    return response.data.message
                }
            })
            .catch(error => {
                return "An error occured while performing the connection"
            });
    }
}