import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Upload } from 'antd';
import { useEffect } from 'react';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { getExcelBuffer } from '@/utils';
import Excel from 'exceljs';

const Admin: React.FC = () => {
  const props: UploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
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
          console.log(
            '%c zjs worksheet, sheetId:',
            'color: #fff;background: #b457ff;',
            worksheet,
            sheetId,
          );
          // ...
        });
        // console.log('%c zjs workbook2:', 'color: #fff;background: #b457ff;', workbook);
        // console.log('%c zjs workbook:', 'color: #fff;background: #b457ff;', workbook);
        // const workbook = await importExcel(info.file.originFileObj);
        // console.log('%c zjs workbook:', 'color: #fff;background: #b457ff;', workbook);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    // const workbook = new Excel.Workbook();
    // console.log('%c zjs Excel:', 'color: #fff;background: #b457ff;', Excel);
    // console.log('%c zjs workbook:', 'color: #fff;background: #b457ff;', workbook);
  }, []);

  return (
    <PageContainer content={'test'}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    </PageContainer>
  );
};
export default Admin;
