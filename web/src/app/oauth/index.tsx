

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message, Spin, Card, Result } from 'antd';
import {  LoadingOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { 
    OpenAI
 } from '@lobehub/icons';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {

    const handleOAuth = async () => {
      try {
        const token = searchParams.get('token');

        if(token){
            localStorage.setItem('token',token);
        }
        navigate('/');
        
      } catch (error) {
        message.error('授权失败：' + (error as Error).message);
        navigate('/');
      }
    };

    handleOAuth();
  }, [searchParams, navigate]);

  // 自定义 Loading 图标
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }} className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card
        style={{
          width: 400,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '8px'
        }}
        className="flex flex-col items-center" // 添加居中样式
      >
        <Result
          className="flex flex-col items-center" // 添加居中样式
          icon={
            <div className="flex flex-col items-center justify-center"> {/* 修改为flex布局 */}
              <Icon style={{
                    fontSize: 48,
                    marginBottom: 24,
                    display: 'block' // 确保图标块级显示
                  }} component={OpenAI} />
              <Spin indicator={antIcon} />
            </div>
          }
          title={
            <div className="text-center text-xl font-medium">
              正在处理授权
            </div>
          }
          subTitle={
            <div className="text-center space-y-2">
              <p className="text-gray-500">请稍候，我们正在验证您的身份</p>
              <p className="text-gray-400 text-sm">
                TokenAI
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default OAuthCallback;