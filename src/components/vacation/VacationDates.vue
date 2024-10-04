<template>
    <span>Duration of the vacation</span>
    <div class="flex">
        <span class="w-16">It starts</span>
        <span class="w-auto">{{ dateBegin }} at {{ timeBegin }}</span>
    </div>
    <div class="flex">
        <span class="w-16">It ends</span>
        <span class="w-auto">{{ dateEnd }} at {{ timeEnd }}</span>
    </div>
</template>

<script>
    export default {
        name: "VacationDate",
        props: {
            dateBegin: String,
            dateEnd: String,
            timeBegin: String,
            timeEnd: String
        }
    }
</script>