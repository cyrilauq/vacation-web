import { defineStore } from "pinia"
import { Vacation } from '@/module/vacation'

export default defineStore("vacation", {
    state: () => ({
        vacation: new Vacation({
            name: "The name",
            description: "The description",
            date_begin: "The dateBegin",
            date_end: "The dateEnd",
            time_begin: "The timeBegin",
            time_end: "The timeEnd",
            place: "The place",
            latitude: "The latitude",
            longitude: "The longitude",
            userName: "The ownerName",
            isPublished: false
        }),
        activities: [],
        members: [],
        planning: []
    }),
    actions: {
        publish() {
            this.vacation.isPublished = true
        },
        setVacation(vacation) {
            if (vacation !== undefined) {
                this.vacation = vacation
                this.activities = []
                this.members = []
            }
        },
        setActivities(activities) {
            if (activities !== undefined) {
                this.activities = activities
            }
        },
        setMembers(members) {
            if (members !== undefined) {
                this.members = members
            }
        },
        addActivities(activity) {
            if (activity !== undefined) {
                this.activities.push(activity)
            }
        },
        addMembers(member) {
            if (member !== undefined) {
                this.members.push(member)
            }
        },
        setPlanning(planning) {
            if (planning !== undefined) {
                this.planning = planning
            }
        },
        addPlanning(activity) {
            if (activity !== undefined) {
                this.planning.push(activity)
            }
        },
    }
})