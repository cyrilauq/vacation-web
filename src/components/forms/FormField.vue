<template>
    <div>
        <label :for="inputName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ labelName }}</label>
        <Field v-if="inputType !== 'textarea'" :id="inputName" :type="inputType" :name="inputName" :placeholder="placeholder" @blur="emitInputChange" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <Field v-else as="textarea" type="text" :id="inputName" :name="inputName" :placeholder="placeholder" @blur="emitInputChange" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <ErrorMessage :name="inputName"/>
    </div>
</template>

<script>
    export default {
        name: "FormField",
        emits: [ 'inputBlur' ],
        props: {
            inputName: String,
            inputId: String,
            inputType: {
                type: String,
                required: false,
                default: 'text'
            },
            labelName: String,
            placeholder: String
        },
        methods: {
            emitInputChange(value) {
                this.$emit('inputBlur', value.srcElement.value);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>