import ActivitiesWrapper from '../components/vacation/ActivitiesWrapper.vue'
import MembersWrapper from '../components/vacation/MembersWrapper.vue'
import Planning from '../components/vacation/Planning.vue'
import Tchat from '../components/vacation/Tchat.vue'
import Vacation from '../views/Vacation.vue'
import AddVacation from '../views/AddVacation.vue'

export const vacationRoutes = [
    {
        path: "/vacation/:id",
        name: "vacation",
        component: Vacation,
        children: [
            {
                path: "planning",
                name: "vacation_planning",
                component: Planning,
            },
            {
                path: "activities",
                name: "vacation_activities",
                component: ActivitiesWrapper,
            },
            {
                name: "vacation_home",
                path: "",
                component: ActivitiesWrapper,
            },
            {
                name: "vacation_members",
                path: "members",
                component: MembersWrapper,
            },
            {
                name: "tchat",
                path: "tchat",
                component: Tchat,
            }
        ],
        meta: { requiresAuth: true },
    },
    {
        path: "/add-vacation",
        name: "add-vacation",
        component: AddVacation,
        meta: { requiresAuth: true },
    },
    {
        path: "/accept-invitation/:invitationId",
        name: "accept-invitation",
        component: () => import('../views/AcceptInvitation.vue')
    }
]