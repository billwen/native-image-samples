import fs from 'node:fs';
import path from 'node:path';
import express from 'express';

import { CountdownOptions, HexadecimalColor, NativeImage } from '@billwen/native-image';
import {countdownService} from "./countdown-service";

// Prepare output folder
const outputFolder = "../outputs";
const outputFolderPath = path.resolve(__dirname, outputFolder);
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

const outputFileName = "countdown.gif";
const outputFilePath: string = path.resolve(outputFolderPath, outputFileName);



// const image = new NativeImage();
// const template = NativeImage.createCountdownAnimation(countdownOptions);
// const start = Date.now();
// template.renderCountdownAnimation({days: 1, hours: 2, minutes: 3, seconds: 4}, 60, outputFilePath);
// const pt = Date.now() - start;
//
// //emptyImage.save(outputFilePath);
// console.log(`Processing time ${pt}`);

const app = express();

const countdownHandler = countdownService();

// Port number can not be 0.
const port = parseInt(process.env.PORT || "3000", 10) || 3000;

app.get("/s/v1/countdown", countdownHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);});
