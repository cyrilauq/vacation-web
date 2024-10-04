<script>
import useVacationStore from '../../stores/Vacation'

import { mapState } from 'pinia'

import BasicCard from "@/components/global/BasicCard.vue";
import AddMember from '@/components/forms/AddMember.vue';

export default {
    name: "MembersWrapper",
    components: { BasicCard, AddMember },
    computed: {
        ...mapState(useVacationStore, ['members'])
    },

}
</script>

<template>
    <div>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white max-w-md">These are the vacation's Members</h2>
        <ul class="max-w-md space-y-0 text-gray-500 list-inside dark:text-gray-400 list-none">
            <template v-for="member in members">
            <li class="pb-2">
                <BasicCard :title="`${member.firstname} ${member.name}`" :content="member.email ?? member.mail"/>
            </li>
            </template>
        </ul>

        <span v-if="members === undefined">No members</span>
        <div class="mt-5 add-member">
            <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Add a new member</h3>
            <AddMember :vacation-id="$route.params.id.toString()"></AddMember>
        </div>
    </div>
</template>