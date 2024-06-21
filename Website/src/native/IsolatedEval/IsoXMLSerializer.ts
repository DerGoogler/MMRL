import { SuFile } from "@Native/SuFile";
import { IsolatedEvalError } from "./IsolatedEvalError";

class IsoXMLSerializer extends XMLSerializer {
  public constructor() {
    super();
  }

  public serializeToFile(fileName: string, root: Node): void {
    if (typeof fileName !== "string") throw new IsolatedEvalError("'fileName' isn't a string");

    const file = new SuFile(fileName);

    const xml = this.serializeToString(root);

    if (typeof xml === "string") {
      file.write(xml);
    }
  }
}

export { IsoXMLSerializer };
