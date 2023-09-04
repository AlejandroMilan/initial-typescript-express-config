import { config } from "dotenv";
import OperationalError from "./OperationalError";

interface IEnviromentConfig {
  port?: number;
  enviroment?: string;
  databaseName?: string;
  databaseUser?: string;
  databasePassword?: string;
  databaseUrl?: string;
  jwtKey?: string;
  masterToken?: string;
}

class EnviromentConfig {
  private readonly _config: IEnviromentConfig;

  constructor(enviromentConfig?: IEnviromentConfig) {
    config();
    this._config = {
      port: enviromentConfig?.port || (process.env.PORT as unknown as number),
      enviroment: enviromentConfig?.enviroment || process.env.ENVIROMENT,
      databaseName: enviromentConfig?.databaseName || process.env.DATABASE_NAME,
      databaseUser: enviromentConfig?.databaseUser || process.env.DATABASE_USER,
      databasePassword: enviromentConfig?.databasePassword || process.env.DATABASE_PASSWORD,
      databaseUrl: enviromentConfig?.databaseUrl || process.env.DATABASE_URI,
      jwtKey: enviromentConfig?.jwtKey || process.env.JTK_PSK,
      masterToken: enviromentConfig?.masterToken || process.env.MASTER_TOKEN,
    };

    this.ensureConfigIsComplete();
  }

  private ensureConfigIsComplete(): void {
    if (!this._config.port) throw new OperationalError("Application port is requiered");
    if (!this._config.enviroment) throw new OperationalError("Application port is requiered");
    if (!this._config.databaseName) throw new OperationalError("DB name is requiered");
    if (!this._config.databaseUser) throw new OperationalError("DB user is requiered");
    if (!this._config.databasePassword) throw new OperationalError("DB password port is requiered");
    if (!this._config.databaseUrl) throw new OperationalError("DB URL is requiered");
    if (!this._config.jwtKey) throw new OperationalError("JWT key is requiered");
    if (!this._config.masterToken) throw new OperationalError("Master token is requiered");
  }

  get portValue() {
    return this._config.port;
  }

  get enviromentValue() {
    return this._config.enviroment;
  }

  get dbNameValue() {
    return this._config.databaseName;
  }

  get dbUserValue() {
    return this._config.databaseUser;
  }

  get dbUrlValue() {
    return this._config.databaseUrl;
  }

  get dbPasswordValue() {
    return this._config.databasePassword;
  }

  get jwtKeyValue() {
    return this._config;
  }

  get masterTokenValue() {
    return this._config.masterToken;
  }
}

export default EnviromentConfig;
