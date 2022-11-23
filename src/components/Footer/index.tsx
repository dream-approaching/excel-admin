import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
const Footer: React.FC = () => {
  const defaultMessage = '自己出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Excel Admin',
          title: 'Excel Admin',
          href: 'https://github.com/dream-approaching/excel-admin',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/dream-approaching/excel-admin',
          blankTarget: true,
        },
        {
          key: 'Excel Admin',
          title: 'Excel Admin',
          href: 'https://github.com/dream-approaching/excel-admin',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
