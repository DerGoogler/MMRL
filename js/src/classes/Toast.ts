import { MMRLObjectAccessor } from "./MMRLObjectAccessor";

interface ToastImpl {

}

class Toast extends MMRLObjectAccessor<ToastImpl> {
    public constructor() {
        super(window["mmrl"] as object);
    }
}