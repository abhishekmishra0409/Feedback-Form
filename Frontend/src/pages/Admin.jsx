import { useEffect, useState } from "react";
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

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
    }
  },[] ); 

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
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
              handleLogout()
            } else {
              navigate(key);
            }
          }}
          items={data}
        />
      </Sider>
      <Layout>
        <Header
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            maxHeight: "calc(100vh - 112px)", 
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto' ,
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 transparent' 
          }}
        >
        
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
