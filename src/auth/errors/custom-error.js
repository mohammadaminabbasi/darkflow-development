
class CustomError extends Error {
    
    constructor(message) {
       super(message);
       this.statusCode = null;
       Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    serializeErrors() {};
}


module.exports = CustomError;