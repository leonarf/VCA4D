/* global process */
import { processUploadedExcelFile } from "@utils/import/generic.js";
import * as XLSX from 'xlsx';
import fs from "fs";

parseStudyXlsx(process.argv[2]);

function parseStudyXlsx(xlsxPath) {
  const xlsx = findFile(xlsxPath);
  // WIP
  console.log(processUploadedExcelFile(xlsx));
}

function findFile(xlsxPath) {
  const file = fs.readFileSync(xlsxPath);
  return XLSX.read(file);
}
