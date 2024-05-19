import { IsolatedEvalError } from "./IsolatedEvalError";

class IsolatedFunctionBlockError extends IsolatedEvalError {
  constructor(message?: string) {
    message = `${message} has been blacklisted`;
    super(message);
    this.name = "IsolatedFunctionBlockError";
  }
}

export { IsolatedFunctionBlockError };
