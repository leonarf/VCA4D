/* global process */
import { processUploadedExcelFile } from "@utils/import/generic.js";
import * as XLSX from 'xlsx';
import fs from "fs";

parseStudyXlsx(...process.argv.slice(2));

function parseStudyXlsx(...args) {
  if (args[0] === "--all") {
    processAllFiles(args[1])
  } else {
    processFile(args[0]);
  }
}


function processAllFiles(dirPath) {
  const filePaths = findAllFilesPaths(dirPath);

  filePaths.forEach(filePath => processFile(`${dirPath}/${filePath}`));
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

function processFile(xlsxPath) {
  const file = findFile(xlsxPath);
  const jsonData = computeJsonData(file);

  fs.writeFileSync(buildJsonPath(xlsxPath), stringifyJson(jsonData));
}

function computeJsonData(file) {
  const { data, errors } = processUploadedExcelFile(file);
  logErrors(errors);

  return data;
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
