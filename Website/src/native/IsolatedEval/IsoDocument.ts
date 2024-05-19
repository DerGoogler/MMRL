import { IsolatedFunctionBlockError } from "./IsolatedFunctionBlockError";

class IsoDocument extends Document {
  public constructor() {
    super();
  }

  public write(...text: string[]): void {
    throw new IsolatedFunctionBlockError("document.write()");
  }

  public writeln(...text: string[]): void {
    throw new IsolatedFunctionBlockError("document.writeln()");
  }
}

export { IsoDocument };
