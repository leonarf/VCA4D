/* eslint-disable no-console */
/* global process __dirname */
import { processUploadedExcelFile } from "@utils/import/generic.js";
import * as XLSX from 'xlsx';
import fs from "fs";
import { amendDataFile } from "../import/generic";
import jsonData from "../../../data/data.json";

const DATA_JSON_PATH = `${__dirname}/../../../data/data.json`;

parseStudyXlsx(...process.argv.slice(2));

function parseStudyXlsx(...args) {
  if (args[0] === "--all") {
    processAllFiles(args[1])
  } else {
    processSingleFile(args[0]);
  }
}

function processAllFiles(dirPath) {
  const filePaths = findAllFilesPaths(dirPath);

  filePaths.forEach(filePath => {
    const { errors } = processFile(`${dirPath}/${filePath}`);
    if (errors.length !== 0) {
      console.log(`${errors.length} errors on ${filePath}`);
    }
  });
}

function findAllFilesPaths(rootPath) {
  return fs.readdirSync(rootPath, { recursive: true }).filter(isStudyDataName);

  function isStudyDataName(fileName) {
    const fileNameSuffix = fileName.split("-").slice(-1)[0];
    return [
      "eco.xlsx",
      "social.xlsx",
      "acv.xlsx"
    ].includes(fileNameSuffix);
  }
}

function processSingleFile(xlsxPath) {
  const { errors } = processFile(xlsxPath);
  logErrors(errors);
}

function processFile(xlsxPath) {
  const file = findFile(xlsxPath);
  const { data: studyData, errors } = processUploadedExcelFile(file);
  const newDataJson = amendDataFile(jsonData, studyData)

  fs.writeFileSync(buildJsonPath(xlsxPath), stringifyJson(studyData));
  fs.writeFileSync(DATA_JSON_PATH, newDataJson);

  return { errors };
}

function buildJsonPath(xlsxPath) {
  return xlsxPath.replace(/\.xlsx$/, ".json");
}

function logErrors(errors) {
  errors.forEach(error => {
    console.log(`Error[${error.level}] on spreadsheet "${error.spreadsheet}":`);
    console.log(error.message);
    console.log("");
  })
}

function stringifyJson(jsonData) {
  return JSON.stringify(jsonData, null, 2);
}
function findFile(xlsxPath) {
  const file = fs.readFileSync(xlsxPath);
  return XLSX.read(file);
}
