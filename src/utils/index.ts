// import * as XLSX from 'xlsx';
import type { UploadFile } from 'antd/lib/upload';

export const getExcelBuffer = (file: UploadFile['originFileObj']): Promise<Buffer> => {
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
