export const throwError = error => {
    if (error.response) {
        const { status, data: respData } = error.response
        const { message, ...data } = respData

        throw {
            status,
            data,
            message,
        }

    } else if (error.request) {
        throw {
            status: null,
            message: 'No response.'
        }
    } else {
        throw {
            status: null,
            message: 'Something went wrong. Please try again later.'
        }
    }
}