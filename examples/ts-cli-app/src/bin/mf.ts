#!/usr/bin/env node

import path from "path";
import {getExpandedEnvVars} from "../lib/envVars.js";
import {dirname} from "platypus-tools";
import { Command } from 'commander';
import StartMFDev from "../lib/startMFDev.js";
import StopMFDev from "../lib/stopMFDev.js";
import RestartMFDev from "../lib/restartMFDev.js";

const rootPath = path.join(dirname(import.meta.url), '/../../');
const envFilePath = path.normalize(rootPath + './.env');

const envVars = getExpandedEnvVars(envFilePath);

if (!envVars) {
    console.log('No env vars found');
    process.exit(1);
}

if (!("DEFAULT_PATH_TO_DEV_ENVIRONMENT_REPO" in envVars)) {
    throw new Error("DEFAULT_PATH_TO_DEV_ENVIRONMENT_REPO is not defined in .env file");
}

const program = new Command();

program.name('mf').description('mf dev tools').version('0.0.1');

program
    .command('start')
    .description('Start Mediafactory local dev environment')
    .option('-p, --path <name>', 'path to local dev environment repository')
    .action((options) => {
        const path = options.path ?? envVars.DEFAULT_PATH_TO_DEV_ENVIRONMENT_REPO;
        StartMFDev(path);
    });

program
    .command('stop')
    .description('Stop Mediafactory local dev environment')
    .option('-p, --path <name>', 'path to local dev environment repository')
    .action((options) => {
        const path = options.path ?? envVars.DEFAULT_PATH_TO_DEV_ENVIRONMENT_REPO;
        StopMFDev(path);
    });

program
    .command('restart')
    .description('Restart Mediafactory local dev environment')
    .option('-p, --path <name>', 'path to local dev environment repository')
    .action((options) => {
        const path = options.path ?? envVars.DEFAULT_PATH_TO_DEV_ENVIRONMENT_REPO;
        RestartMFDev(path);
    });

program.parse(process.argv);