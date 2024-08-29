/* global process */
import { processUploadedExcelFile } from "@utils/import/generic.js";
import * as XLSX from 'xlsx';
import fs from "fs";

parseStudyXlsx(process.argv[2]);

function parseStudyXlsx(xlsxPath) {
  const xlsx = findFile(xlsxPath);
  const jsonData = processFile(xlsx);

  fs.writeFileSync(buildJsonPath(xlsxPath), stringifyJson(jsonData));
}

function processFile(xlsxPath) {
  const { data, errors } = processUploadedExcelFile(xlsxPath);
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
