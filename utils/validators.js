export const validateRegisterInput = (
    email, 
    password, 
    confirmPassword
    ) => {
    const errors = {}

    if(email.trim() === ''){
        errors.email = 'El correo electrónico no puede estar vacio.'
    } else {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!email.match(regEx)){
            errors.email = 'Ingrese un correo electrónico válido.'
        }
    }

    if(password === ''){
        errors.password = 'La contraseña no puede estar vacio.'
    } else if( password !== confirmPassword){
        errors.confirmPassword = 'Las contraseñas no son iguales.'
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}

export const validateLoginInput = (email, password) => {
    const errors = {}

    if(email.trim() === ''){
        errors.email = 'El correo no debe estar vacío'
    }
    if(password.trim() === ''){
        errors.password = 'La contraseña no deber estar vacía'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}