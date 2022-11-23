// import * as XLSX from 'xlsx';

export const getExcelBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onload = (e) => {
      const { result } = e.target;
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
