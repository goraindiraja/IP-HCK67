
const errorHandler = (error, req, res, next) => {
    let status = error.status || 500
    let message = error.name || "Internal Server Error"

    switch(message){

        case "InvalidInput":
            status = 400
            message = "Email / Password is required"
        break

        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = error.errors[0].message
        break

        case "InvalidUser":
            status = 401
            message = "Invalid Email / Password"
        break

        case "InvalidToken":
        case "JsonWebTokenError": 
            status = 401
            message = "Unauthenticated"
        break

        case "NotFound":
            status = 404
            message = "Data Not Found"
        break
    }

    res.status(status).json({message})
}

module.exports = errorHandler