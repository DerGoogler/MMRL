import { SuFile } from "@Native/SuFile";
import { IsolatedEvalError } from "./IsolatedEvalError";

class IsoDOMParser extends DOMParser {
  public constructor() {
    super();
  }

  public parseFromFile(fileName: string, type: DOMParserSupportedType = "application/xml"): Document {
    if (typeof fileName !== "string") throw new IsolatedEvalError("'fileName' isn't a string");
    const file = new SuFile(fileName);

    if (file.exist()) {
      return this.parseFromString(file.read(), type);
    } else {
      throw new IsolatedEvalError(`Unable to find '${fileName}'`);
    }
  }
}

export { IsoDOMParser };
