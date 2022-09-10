import {existsSync} from "fs";
import {errorLog} from "platypus-tools";
import dotenv from 'dotenv';
import {expand} from 'dotenv-expand';

type envVarsObject = { [p: string]: string };

/**
 * Returns object of expanded environment variables
 * @param envFilePath
 */
export const getExpandedEnvVars = (envFilePath: string): envVarsObject | void => {
    if (!existsSync(envFilePath)) {
        errorLog('.env file not found');
        errorLog(`${envFilePath} not found`);
        return;
    }

    const myEnv = dotenv.config({ path: envFilePath });
    return expand(myEnv).parsed;
};