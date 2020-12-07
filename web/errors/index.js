class InvalidConfig extends Error {
    constructor(args){
        super(args);
        this.name = "InvalidConfig"
    }
}

module.exports = {
    InvalidConfig
}