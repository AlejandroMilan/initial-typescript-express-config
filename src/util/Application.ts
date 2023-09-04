import express, { Application as ExpressApplication } from "express";
import EnviromentConfig from "./EnviromentConfig";

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

interface ApplicationParams {
  enviromentConfig: EnviromentConfig;
}

class Application {
  private readonly _instance: ExpressApplication;
  private readonly _enviromentConfig: EnviromentConfig;

  constructor(params: ApplicationParams) {
    this._instance = express();
    this._enviromentConfig = params.enviromentConfig;
    
    this.startMiddlewares();
    this.enableCors();
    this.registerRouters();
    this.connectMongoDatabase().then(() => {
      this.startListening();
    });
  }

  get instance(): ExpressApplication {
    return this._instance;
  }

  private startListening() {
    this._instance.listen(this._enviromentConfig.portValue || 3000, "0.0.0.0", () => {
      console.log(`App listening on port ${this._enviromentConfig.portValue}`);
    });
  }

  private registerRouters() {
    this._instance.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });
  }

  private startMiddlewares() {
    this._instance.use(bodyParser.urlencoded({ extended: true }));
    this._instance.use(bodyParser.json());
    this._instance.use(helmet());
    this._instance.use(morgan("dev"));
  }

  private enableCors() {
    this._instance.use(cors());
  }

  private connectMongoDatabase(): Promise<void> {
    const connectionString = `mongodb+srv://${this._enviromentConfig.dbUserValue}:${this._enviromentConfig.dbPasswordValue}@${this._enviromentConfig.dbUrlValue}/${this._enviromentConfig.dbNameValue}?retryWrites=true&w=majority`;
    return new Promise((resolve, reject) => {
      mongoose
        .connect(connectionString, {})
        .then(() => {
          console.log(`Connected to ${this._enviromentConfig.dbNameValue}`);
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
export default Application;
