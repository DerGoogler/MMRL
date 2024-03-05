import { IsolatedEvalError } from "./IsolatedEvalError";

class IsoDocument extends Document {
  public constructor() {
    super();
  }

  public write(...text: string[]): void {
    throw new IsolatedEvalError(`"document.write()" has been blacklisted.`);
  }

  public writeln(...text: string[]): void {
    throw new IsolatedEvalError(`"document.writeln()" has been blacklisted.`);
  }
}

export { IsoDocument };
