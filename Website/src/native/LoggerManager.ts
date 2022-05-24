class LoggerManager {
  private tag: string;
  
  constructor(tag: string) {
    this.tag = tag;
  }

  public info(message: any, ...optionalParams: any[]) {
    console.info(`%c[${this.tag}]`, "color: #0693e3", message, ...optionalParams);
  }
  public warn(message: any, ...optionalParams: any[]) {
    console.info(`%c[${this.tag}]`, "color: orange", message, ...optionalParams);
  }
  public error(message: any, ...optionalParams: any[]) {
    console.info(`%c[${this.tag}]`, "color: #d44950", message, ...optionalParams);
  }
}

export default LoggerManager;
