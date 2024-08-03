import { SuFile } from "@Native/SuFile";
import { IsolatedEvalError } from "./IsolatedEvalError";

class IsoAudio extends Audio {
  public type: string;
  public autoplay: boolean = false;
  public controls: boolean = false;

  public constructor(src?: string, type: string = "audio/wav") {
    if (typeof src !== "string") throw new IsolatedEvalError("Source is not a string in Audio class");
    super(src);
    this.type = type;

    const file = new SuFile(src);

    if (file.exist()) {
      this.src = `data:${this.type};base64,${file.readAsBase64()}`;
    }
  }

  public isPlaying() {
    return !this.paused;
  }
}

export { IsoAudio };
