import xlsx from 'xlsx';

import { config } from '../config';

export const createCsv = async (data) => {
	try {
		let workBook = xlsx.utils.book_new();
		const workSheet = xlsx.utils.json_to_sheet(data);
		const sheetName = 'users';
		xlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
		const fileName = `data-${new Date().getTime()}.xls`;
		let exportFileName = `./${config.EXCEL_OUTPUT_DIR_NAME}/${fileName}`;
		xlsx.writeFile(workBook, exportFileName);
		return fileName;
	} catch (ex) {
		const err = `Failed to create csv,Error:${ex}`;
		console.error(err);
		return null;
	}
};

export const getCsvData = async (fileName = 'data.xlsx') => {
	try {
		const filePath = path.resolve(__dirname, fileName);
		const workbook = xlsx.readFile(filePath);
		const rowData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames]);
		return rowData;
	} catch (ex) {
		const err = `Failed to create csv,Error:${ex}`;
		console.error(err);
		return null;
	}
};
