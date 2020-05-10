import React from "react";
import { CARTOON_API } from "http";
import { List } from "antd";

export default class CartoonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionList: []
    }
  }

  componentDidMount() {
    this.requestApi();
  }

  async requestApi() {
    console.log(CARTOON_API);
    const {data} = await CARTOON_API.cartoonDeatil({ id: '我是大神仙' });
    console.log(data);
    if(data && data.isOk){
      this.setState({
        sectionList: data.sectios
      })
    }
  }

  render() {
    const { sectionList } = this.state;

    return (
      <div>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={sectionList}
          renderItem={(item) => <List.Item>{item.title}</List.Item>}
        />
      </div>
    );
  }
}
