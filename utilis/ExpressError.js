

class ExpressError extends Error {
    constructor(messege, statusCode) {
        super();
        this.message = messege;
        this.statusCode = statusCode;
    }
}
module.exports = ExpressError;