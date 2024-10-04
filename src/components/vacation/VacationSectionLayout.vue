<template>
    <div>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white max-w-md">{{ title }}</h2>
        <slot name="content"></slot>
        <slot name="messages"></slot>
    </div>
</template>

<script>
    export default {
        name: "VacationSectionLayout",
        props: {
            title: String
        }
    }
</script>