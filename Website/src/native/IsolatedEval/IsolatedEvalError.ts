class IsolatedEvalError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "IsolatedEvalError";
  }
}

export { IsolatedEvalError };
