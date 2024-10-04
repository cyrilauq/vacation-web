<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <Form :validation-schema="schema" :initial-values="inputDefault" class="space-y-4 md:space-y-6" @submit="onSubmit">
            <slot name="form"></slot>
            <slot name="buttons"></slot>
        </Form>
    </div>
</template>

<script>
    import FormField from './FormField.vue'

    export default {
        name: "FormLayout",
        props: {
            schema: {
                type: Object,
                required: false,
            },
            inputDefault: {
                type: Object,
                required: false,
            },
            onSubmit: {
                type: Function,
                required: false,
            }
        },
        components: { FormField }
    }
</script>