type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  level: LogLevel;
  prefix?: string;
  enableConsole?: boolean;
  enableService?: boolean;
}

class Logger {
  private level: LogLevel;
  private prefix: string;
  private enableConsole: boolean;
  private enableService: boolean;
  
  // Log level priorities
  private levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(options: LoggerOptions) {
    this.level = options.level || 'info';
    this.prefix = options.prefix || 'SlavkoKernel';
    this.enableConsole = options.enableConsole !== false;
    this.enableService = options.enableService || false;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] >= this.levelPriority[this.level];
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${this.prefix}] [${level.toUpperCase()}] ${message}`;
  }

  private async sendToLogService(level: LogLevel, message: string, meta?: Record<string, any>) {
    if (!this.enableService) return;
    
    // INTEGRATION POINT: Send logs to a logging service
    // Examples include:
    // - Sentry
    // - LogRocket
    // - Datadog
    // - CloudWatch Logs
    
    // Example for Sentry:
    /*
    import * as Sentry from '@sentry/nextjs';
    
    if (level === 'error') {
      Sentry.captureException(new Error(message), {
        level: Sentry.Severity.Error,
        extra: meta
      });
    } else {
      Sentry.captureMessage(message, {
        level: level === 'warn' ? Sentry.Severity.Warning : 
               level === 'info' ? Sentry.Severity.Info : 
               Sentry.Severity.Debug,
        extra: meta
      });
    }
    */
  }

  public debug(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('debug')) return;
    
    const formattedMessage = this.formatMessage('debug', message);
    
    if (this.enableConsole) {
      console.debug(formattedMessage, meta || '');
    }
    
    this.sendToLogService('debug', message, meta);
  }

  public info(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('info')) return;
    
    const formattedMessage = this.formatMessage('info', message);
    
    if (this.enableConsole) {
      console.info(formattedMessage, meta || '');
    }
    
    this.sendToLogService('info', message, meta);
  }

  public warn(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('warn')) return;
    
    const formattedMessage = this.formatMessage('warn', message);
    
    if (this.enableConsole) {
      console.warn(formattedMessage, meta || '');
    }
    
    this.sendToLogService('warn', message, meta);
  }

  public error(message: string, meta?: Record<string, any>): void {
    if (!this.shouldLog('error')) return;
    
    const formattedMessage = this.formatMessage('error', message);
    
    if (this.enableConsole) {
      console.error(formattedMessage, meta || '');
    }
    
    this.sendToLogService('error', message, meta);
  }
}

// Create and export a default logger instance
export const logger = new Logger({
  level: (process.env.LOG_LEVEL as LogLevel) || 'info',
  prefix: 'SlavkoKernel',
  enableConsole: process.env.NODE_ENV !== 'production',
  enableService: process.env.NODE_ENV === 'production',
});

// Export the Logger class for creating custom loggers
export { Logger };