/* global process */
import { processUploadedExcelFile } from "@utils/import/generic.js";
import * as XLSX from 'xlsx';
import fs from "fs";

parseStudyXlsx(process.argv[2]);

function parseStudyXlsx(xlsxPath) {
  const xlsx = findFile(xlsxPath);
  // WIP
  processFile(xlsx);
}

function processFile(xlsx) {
  const { data, errors } = processUploadedExcelFile(xlsx);
  logErrors(errors);
  return data;
}

function logErrors(errors) {
  errors.forEach(error => {
    console.log(`Error[${error.level}] on spreadsheet "${error.spreadsheet}":`);
    console.log(error.message);
    console.log("");
  })
}
function findFile(xlsxPath) {
  const file = fs.readFileSync(xlsxPath);
  return XLSX.read(file);
}
