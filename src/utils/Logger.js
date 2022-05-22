class Logger {
    constructor(tag) {
        this.tag = tag
    }

    info(message, ...optionalParams) {
        console.info("%c[" + this.tag + "]", "color: #0693e3", message, ...optionalParams)
    }
    warn(message, ...optionalParams) {
        console.info("%c[" + this.tag + "]", "color: orange", message, ...optionalParams)
    }
    error(message, ...optionalParams) {
        console.info("%c[" + this.tag + "]", "color: #d44950", message, ...optionalParams)
    }
}

export default Logger