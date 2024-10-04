import redaxios from "redaxios";

export class GeocodingApiClient {
    constructor() {
        this._baseUrl = "https://maps.googleapis.com/maps/api/geocode";
        this._axios = redaxios.create({ fetch, responseType: 'json' });

        this._axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/geocode";
    }

    /**
     * Send the Vacation form to the api and retrieve the result of the request
     * 
     * @param {Vacation} Vacation     The vacation to send to the api
     * 
     * @returns {number, number} Le résultat de la requête
     */
    async getPositionOf(place) {
        return await this._axios.get(`/json?address="${place}"&key=${import.meta.env.VITE_GEOCODING_API_KEY}`)
            .then(response => {
                let results = response.data.results;
                if (response.ok && results.length > 0) {
                    let first = results[0];
                    return {
                        lng: first.geometry.location.lng,
                        lat: first.geometry.location.lat,
                        country: first.address_components[5].long_name
                    };
                } else {
                    return response.data.message;
                }
            })
            .catch(err => { message: "error while performing the connection" });
    }
}