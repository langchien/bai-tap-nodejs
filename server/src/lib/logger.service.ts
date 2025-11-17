import chalk from 'chalk'

class Logger {
  private wrapperFunction(message: string, colorFn: (msg: string) => string, options?: any) {
    const timestamp = new Date().toISOString()
    console.log(colorFn(`[${timestamp}] ${message}`))
    if (options) console.log(options)
  }
  public info(message: string, options?: any) {
    this.wrapperFunction(message, chalk.blue, options)
  }
  public success(message: string, options?: any) {
    this.wrapperFunction(message, chalk.green, options)
  }
  public error(message: string, options?: any) {
    this.wrapperFunction(message, chalk.red, options)
  }
  public warn(message: string, options?: any) {
    this.wrapperFunction(message, chalk.yellow, options)
  }
  public debug(message: string, options?: any) {
    this.wrapperFunction(message, chalk.green, options)
  }
  public pending(message: string, options?: any) {
    this.wrapperFunction(message, chalk.magenta, options)
  }
}

export const logger = new Logger()
