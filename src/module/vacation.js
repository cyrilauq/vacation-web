export class Vacation {

    constructor(object = { name, description, date_begin, time_begin, date_end, time_end, place, longitude, latitude, userName, isPublished, picturePath, }) {
        this.name = object.name
        this.description = object.description
        this.date_begin = object.date_begin
        this.time_begin = object.time_begin
        this.date_end = object.date_end
        this.time_end = object.time_end
        this.place = object.place
        this.latitude = object.latitude
        this.longitude = object.longitude
        this.userName = object.userName
        this.isPublished = object.isPublished
        this.picturePath = object.picturePath
        this.country = object.country
    }

}