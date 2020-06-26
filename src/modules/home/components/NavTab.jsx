import React from "react";
import { TabBar } from "antd-mobile";

const TabBarData = [
  {
    title: "Life",
    key: "Life",
    icon: "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
    selectedIcon:
      "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
  },
  {
    title: "Koubei",
    key: "Koubei",
    icon: "https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg",
    selectedIcon:
      "https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg",
  },
];

{/* <div
  style={{
    width: "22px",
    height: "22px",
    background:
      "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
  }}
/>; */}

const NavTab = () => {
  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      tabBarPosition="bottom"
      hidden={false}
    >
      {TabBarData.map((tabItem) => {
        return (
          <TabBar.Item
            title={tabItem.title}
            key={tabItem.key}
            icon={{
              uri: tabItem.icon,
            }}
            selectedIcon={{
              uri: tabItem.selectedIcon,
            }}
            selected
            badge={1}
            onPress={() => {}}
            data-seed="logId"
          />
        );
      })}
    </TabBar>
  );
};
NavTab.propTypes = {};

export default NavTab;
