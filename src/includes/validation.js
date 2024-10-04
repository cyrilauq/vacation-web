import {
    Form,
    Field,
    ErrorMessage,
    defineRule,
    configure
} from 'vee-validate'
import {
    required,
    min,
    max,
    alpha_spaces as alphaSpaces,
    email,
    min_value as minVal,
    max_value as maxVal,
    confirmed,
    not_one_of as excluded
} from '@vee-validate/rules'

export default {
    /**
     *
     * @param {*} app       Vue application
     */
    install(app) {
        app.component('Form', Form)
        app.component('Field', Field)
        app.component('ErrorMessage', ErrorMessage)

        /**
         * 1st arg for the rule name(can give anything we want), 2nd arg is for the function that'll perform the validation
         */
        defineRule('required', required)
        defineRule('tos_required', required)
        defineRule('min', min)
        defineRule('max', max)
        defineRule('alpha_spaces', alphaSpaces)
        defineRule('email', email)
        defineRule('min_value', minVal)
        defineRule('max_value', maxVal)
        defineRule('passwords_mismatch', confirmed)
        /*
         *  By adding to rules with different name, it allow us to override their message and create message for generics and specifics inputs
         */
        defineRule('excluded', excluded)
        defineRule('country_excluded', excluded)

        configure({
            /* 
                The context argument if given by default to the function all we need to do is to write the content of generateMessage 
                We can only override message of rule registered globally and that returns a boolean
            */
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    min: `The field ${ctx.field} has to be minimum ${ctx.rule.params[0]}.`,
                    max: `The field ${ctx.field} has to be maximum ${ctx.rule.params[0]}..`,
                    alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
                    email: `${ctx.value} isn't a valid email.`,
                    min_value: `The field ${ctx.field} is too low.`,
                    max_value: `The field ${ctx.field} is too high.`,
                    excluded: `You are not allowed to use ${ctx.value} as a value for the field ${ctx.field}.`,
                    passwords_mismatch: "The passwords don't match."
                }

                const message = messages[ctx.rule.name]
                    ? messages[ctx.rule.name]
                    : `The field ${ctx.field} isn't valid.`

                return message
            },
            validateOnBlur: true /* Will tell to validate the form when a blur event is triggered */,
            validateOnChange: true /* Will tell to validate the form when a change event is triggered */,
            validateOnInput: false,
            validateOnModelUpdate: true /* Will tell to validate the form when the model change inside the v-model directive */
        })
    }
}