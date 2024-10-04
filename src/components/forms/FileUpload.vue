<template>
    <div :data-active="active" 
        @dragenter.prevent="setActive" 
        @dragover.prevent="setActive" 
        @dragleave.prevent="setInactive" 
        @drop.prevent="onDrop"
    >
        <label for="fileUpload" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
                <p v-if="selectedFile" class="w-64 break-words">Selected file: {{ selectedFile.name }}</p>
            </div>
            <input id="fileUpload" type="file" class="hidden" @change="handleFileChange($event)" />
        </label>
    </div>
</template>

<script>
export default {
    name: "FileUpload",
    emits: [
        'files-dropped'
    ],
    data() {
        return {
            events: ['dragenter', 'dragover', 'dragleave', 'drop'],
            active: false,
            inActivteTimeout: null,
            selectedFile: undefined
        }
    },
    methods: {
        clickInput() {
            document.getElementById("fileUpload").click()
        },
        handleFileChange(e) {
            this.selectedFile = e.srcElement.files[0]
            this.$emit('files-dropped', [ ...e.srcElement.files ])
        },
        onDrop(e) {
            this.selectedFile = e.dataTransfer.files[0]
            this.setInactive()
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(e.dataTransfer.files[0]);
            document.getElementById("fileUpload").files = dataTransfer.files;
            this.$emit('files-dropped', [...e.dataTransfer.files])
        },
        preventDefaults(e) {
            e.preventDefault()
        },
        setInactive() {
            this.inActiveTimeout = setTimeout(() => {
                this.active = false
            }, 50)
            this.active = false
        },
        setActive() {
            this.active = true
            clearTimeout(this.inActiveTimeout)
        },
    },
    mounted() {
        this.events.forEach((eventName) => {
            document.body.addEventListener(eventName, this.preventDefaults)
        })
    },
    unmounted() {
        this.events.forEach((eventName) => {
            document.body.removeEventListener(eventName, this.preventDefaults)
        })
    },
}
</script>

<style scoped>

</style>