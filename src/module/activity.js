export class Activity {
    constructor(object = { title, description, beginDate, endDate, beginTime, endTime, place }) {
        this.title = object.title
        this.description = object.description
        this.beginDate = object.beginDate
        this.endDate = object.endDate
        this.beginTime = object.beginTime
        this.endTime = object.endTime
        this.place = place
    }
}