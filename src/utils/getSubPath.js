function getSubPath(url) {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url
}

export default getSubPath