/**
   * @param id
   * @param callback HTMLElement
   *
   * @description
   * Usage
   * ```ts
   * // Id's
   * tools.ref("element", (element: HTMLElement) => { element.style.display = "none" })
   *
   * // Refs
   * tools.ref(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
   * ```
   */
   function /*public static*/ ref(id/*: string | React.RefObject<any>*/, callback/*: (...props: any) => void*/) {
    if (typeof id == "string") {
        var element/*: HTMLElement | null*/;
        if ((element = document.getElementById(id))) {
            if (typeof callback == "function") {
                callback(element);
            }
        }
    } else {
        var reff/*: React.RefObject<any>*/;
        if ((reff = id)) {
            if (reff && reff.current) {
                if (typeof callback == "function") {
                    const ref/*: typeof reff*/ = reff.current;
                    callback(ref);
                }
            }
        }
    }
}

export default ref