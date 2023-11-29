import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        
        // check if string only contains whitespace
        // if validaton check fails -> return validation errors
        // if validation check passes -> return null
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return { 'notOnlyWhitespace': true };
        }
        else {
            // valid, return null
            return null;
        }
    }
}
