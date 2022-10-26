export const initialValidationFunc = {
    parameters: {},
    action: () => {},
}

export const initialFormValue = {
    name : "",
    value : "",
    validation : {
        message: "",
        isValid: true
    },
    validationFunc : [],
}


export const requiredValidation = (value, name, parameters) => {
    if (value) {
        return {
            message: "",
            isValid: true
        }
    }else {
        return {
            message: `${name} harus diisi`,
            isValid: false
        }
    }
}

export const emailValidation = (value, name) => {
    const isValid = String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (isValid) {
        return {
            message: "",
            isValid: true
        }
    }else {
        return {
            message: `format ${name} tidak sesuai : harus menggunakan format email`,
            isValid: false
        }
    }
}

export const minMaxValidation = (value, name, parameters) => {

    for (const[key, val] of Object.entries(parameters)) {
        switch (key) {
            case "max":
                if (value.length > val) {
                    return {
                        message: `${name} tidak boleh lebih dari ${val}`,
                        isValid: false
                    }
                } 
                break;
            case "min":
                if (value.length < val) {
                    if (val === 1){
                        return {
                            message: `${name} harus diisi`,
                            isValid: false
                        }
                    }else {
                        return {
                            message: `${name} tidak boleh kurang dari ${val}`,
                            isValid: false
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
    
    return {
        message: "",
        isValid: true
    }
}