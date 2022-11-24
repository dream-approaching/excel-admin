import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { getExcelBuffer } from '@/utils';
import Excel from 'exceljs';

const Admin: React.FC = () => {
  const [workbooks, setWorkbooks] = useState(null);
  const props: UploadProps = {
    name: 'file',
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        // console.log('%c zjs read:', 'color: #fff;background: #b457ff;', read);
        const arrayBuffer = await getExcelBuffer(info.file.originFileObj);
        console.log('%c zjs arrayBuffer:', 'color: #fff;background: #b457ff;', arrayBuffer);
        // 从文件读取
        const workbook = new Excel.Workbook();
        // console.log('%c zjs Excel:', 'color: #fff;background: #b457ff;', Excel);
        // console.log('%c zjs workbook1:', 'color: #fff;background: #b457ff;', workbook);
        await workbook.xlsx.load(arrayBuffer);
        workbook.eachSheet(function (worksheet, sheetId) {
          worksheet.unprotect();
          console.log(
            '%c zjs worksheet, sheetId:',
            'color: #fff;background: #b457ff;',
            worksheet,
            sheetId,
          );
          // worksheet.columns
          console.log(
            '%c zjs worksheet.columns:',
            'color: #fff;background: #b457ff;',
            worksheet.columns,
          );
          //   worksheet.addRow([322, 'Sam', new Date()]);
          worksheet.duplicateRow(7, 1, true);
          //   worksheet.insertRow(2, [12312, '', '', '', '', '', '', '美元', '', '', '', '', '7']);
          const rowValues = [];
          rowValues[11] = '零售客户';
          // insert new row and return as row object
          const insertedRow = worksheet.insertRow(14, rowValues);
          console.log('%c zjs insertedRow:', 'color: #fff;background: #b457ff;', insertedRow);
          // worksheet.addRow([{}, {}]);
          // ...
        });
        setWorkbooks(workbook);
        // console.log('%c zjs workbook2:', 'color: #fff;background: #b457ff;', workbook);
        // console.log('%c zjs workbook:', 'color: #fff;background: #b457ff;', workbook);
        // const workbook = await importExcel(info.file.originFileObj);
        // console.log('%c zjs workbook:', 'color: #fff;background: #b457ff;', workbook);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const writeFile = (fileName, content) => {
    let a = document.createElement('a');
    let blob = new Blob([content], { type: 'text/plain' });

    a.download = fileName;
    a.href = URL.createObjectURL(blob);

    a.click();
  };
  const handleDownload = () => {
    console.log('%c zjs workbooks:', 'color: #fff;background: #b457ff;', workbooks);
    console.log('%c zjs workbooks.xlsx:', 'color: #fff;background: #b457ff;', workbooks.xlsx);
    workbooks.xlsx.writeBuffer().then((buffer) => {
      writeFile(`test.xlsx`, buffer);
    });
  };

  return (
    <PageContainer content={'test'}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
      <Button onClick={handleDownload}>写入</Button>
    </PageContainer>
  );
};
export default Admin;
