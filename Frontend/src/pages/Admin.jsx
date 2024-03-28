import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { FaSignOutAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";


const { Header, Sider, Content } = Layout;

const LayoutD = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const data = [
    {
      key: "",
      icon: <PiStudentBold className="fs-5" />,
      label: "Student Feedback",
    },
    {
      key: "facultyFeedback",
      icon: <FaUser className="fs-5"/>,
      label: "Faculty Feedback",
    },
    {
      key: "alumniFeedback",
      icon: <FaGraduationCap className="fs-5" />,
      label: "Alumni Feedback",
    },
    {
      key: "signout",
      icon: <FaSignOutAlt className="fs-5" />,
      label: "SignOut",
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">Admin</span>
            <span className="lg-logo">Admin Data</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[data.key]}
          onClick={({ key }) => {
            if (key === "signout") {
                navigate('/login')
            //   handleSignOut();
            } else {
              navigate(key);
            }
          }}
          items={data}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* <div >
            <div  style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
              <div >
                {user ? (
                  <>
                    <h5 style={{height:'100%', fontSize:"17px"}}  className="mb-0">{user.name}</h5>         
                  </>
                ) : (
                  <h5 className="mb-0">{user.email}</h5>  
                )}
              </div>
            </div>
          </div> */}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutD;
