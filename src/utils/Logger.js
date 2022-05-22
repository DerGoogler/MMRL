class Logger {
    constructor(tag) {
        this.tag = tag
    }

    log(...message) {
        console.log("[" + this.tag + "]", ...message)
    }

    info(...message) {
        console.info("[" + this.tag + "]", ...message)
    }
    warn(...message) {
        console.warn("[" + this.tag + "]", ...message)
    }

    error(...message) {
        console.error("[" + this.tag + "]", ...message)
    }

    debug(...message) {
        console.debug("[" + this.tag + "]", ...message)
    }
}

export default Logger