const CustomError = require('./custom-error');

class RequestValidationError extends CustomError {
    
    constructor(errors) {
       super('Invalid request parameters');
       this.statusCode = 400;
       this.errors = errors
       
       Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
  
    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param };
        });
    };
}


module.exports = RequestValidationError;