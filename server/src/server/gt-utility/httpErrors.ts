import { Response, NextFunction } from "express";

abstract class HTTPClientError extends Error {
    readonly statusCode!: number;
    readonly name!: string;
  
    constructor(message: object | string) {
      if (message instanceof Object) {
        super(JSON.stringify(message));
      } else {
        super(message);
      }
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }

  class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;
  
    constructor(message: string | object = "Bad Request") {
      super(message);
    }
  }
  
  class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;
  
    constructor(message: string | object = "Not found") {
      super(message);
    }
  }
  

  export const notFoundError = (err: Error, res: Response, next: NextFunction) => {
      throw new HTTP404Error("Method not found.");
  };
  
  export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
      console.warn(err);
      res.status(err.statusCode).send(err.message);
    } else {
      next(err);
    }
  };
  
  export const serverError = (err: Error, res: Response, next: NextFunction) => {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(500).send(err.stack);
    }
  };
