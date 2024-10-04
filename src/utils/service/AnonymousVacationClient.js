import redaxios from "redaxios";
import { ResponseError } from "@/utils/error/ResponseError";

export class AnonymousVacationClient {
    constructor() {
        this._baseUrl = import.meta.env.VITE_BASE_URL
        this._axios = redaxios.create({ fetch })

        this._axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
    }

    /**
     * Login l'utilisateur et lui donne son token
     * @param login
     * @param password
     * @returns {Promise<*>} Le token sous forme de promesse
     * @throws {ResponseError} Une erreur HTTP (401 par exemple)
     * @throws {Error} Une erreur innatendue
     */
    async login(login, password) {
        const result = await this._axios.post("/Auth/login", {
            userName: login,
            password: password
        }).catch(e => {
            if (!e.ok) {
                throw new ResponseError(e.statusText || e.data.message, e.status)
            } else {
                throw new Error(e)
            }
        })
        return result.data;
    }

    /**
     * Enregistre l'utilisateur dans l'API Vacations
     * @param login
     * @param mail
     * @param password
     * @returns {Promise<*>}
     * @throws {ResponseError} Une erreur HTTP (401 par exemple)
     * @throws {Error} Une erreur innatendue
     */
    async register(login, mail, password, name, firstname, image) {
        const formData = new FormData()
        formData.append("username", login)
        formData.append("password", password)
        formData.append("mail", mail)
        formData.append("picturePath", "dummy")
        formData.append("name", name)
        formData.append("firstname", firstname)
        formData.append("file", image)
        return await this._axios.post('/Auth/register', formData).catch(e => {
            if (!e.ok) {
                throw new ResponseError(e.statusText || e.data.message, e.status)
            } else {
                throw new Error(e)
            }
        })
    }

    /**
     * login with oauth google
     * 
     * @param {String} token    Token from oauth google
     * 
     * @returns {User}     User informations
     */
    async loginGoogle(googleToken) {
        return await this._axios.post("/Auth/google", { token: googleToken })
            .then(response => {
                if (response.ok) {
                    return response.data
                } else {
                    return response.data.message
                }
            })
            .catch(error => {
                return `An error occured while performing the connection: ${error}`
            });
    }

    async getUsersByPlace(date) {
        // Format the date as "DD/MM/YYYY"
        const d = new Date(date)

        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
        const year = d.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        const result = await this._axios.get("/Vacations/CountriesStatistics/" + formattedDate).catch(e => {
            if (!e.ok) {
                throw new ResponseError(e.statusText || e.data.message, e.status)
            }
        });

        const content = result.data
        if (Object.keys(content).length === 0) {
            return ""
        } else {
            return content;
        }
    }
}