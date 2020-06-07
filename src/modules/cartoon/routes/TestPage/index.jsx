import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import socketIo from "socket.io-client/dist/socket.io.js";
import { Table, Input, Button, Popconfirm, Form, Modal } from "antd";
import { addCrawler, getCrawlerList } from "services";

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `"${title}"不能为空.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "名称",
        dataIndex: "name",
        width: "30%",
        editable: true,
      },
      {
        title: "类型",
        dataIndex: "type",
        editable: true,
      },
      {
        title: "链接",
        dataIndex: "href",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.crawlerList.length >= 1 ? (
            <Popconfirm
              title="确定删除吗?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      // 日志信息
      massageList: [],
      // 弹窗
      visible: false,
      crawlerList: [],
      count: 2,
    };
    this.socket = null;
    this.getConnect = this.getConnect.bind(this);
    this.logsWrapperRef = React.createRef();
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.getConnect();
    this.getCrawler();
  }

  handleDelete = (key) => {
    const crawlerList = [...this.state.crawlerList];
    this.setState({
      crawlerList: crawlerList.filter((item) => item.key !== key),
    });
  };

  /** 保存修改后的爬虫内容 */
  handleSave = (row) => {
    const newData = [...this.state.crawlerList];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      crawlerList: newData,
    });
  };
  /** 展示弹窗 */
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  /** 点击弹窗确认 */
  handleOk = (e) => {
    console.log(e);
    console.log(this.formRef);
    this.formRef.current.submit();
    this.setState({
      visible: false,
    });
  };
  /** 点击弹窗取消 */
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  /** 表单提交 */
  onFinish = async (values) => {
    const { href, name, type } = values;
    const { data } = await addCrawler({
      name,
      href,
      type,
    });
    if (data && data.isOk) {
      const { crawlerList } = this.state;
      const { _id: key } = data.result;
      this.setState({
        crawlerList: [...crawlerList, { href, name, type, key }],
      });
    }
  };
  /** 获取爬虫列表 */
  getCrawler = async () => {
    const {data} = await getCrawlerList();
    if(data && data.isOk){
      this.setState({
        crawlerList: data.crawlerList.map(item => ({...item, key: item._id}))
      })
    }
  }

  /** 连接 socket */
  getConnect() {
    const socket = socketIo("ws://localhost:3000");

    socket.on("connect", (data) => {
      console.log("连接上了", data);
      this.socket = socket;
    });
    socket.on("event", function (data) {
      console.log(data);
    });
    socket.on("disconnect", function () {
      console.log("断开连接");
    });
    socket.on("CRAW_MESSAGE", (data) => {
      console.log(data, this.state);
      let ms = this.state.massageList;
      ms.push(data);
      this.setState(
        {
          massageList: ms,
        },
        () => {
          const ulDom = this.logsWrapperRef.current;
          ulDom.scrollTop = ulDom.scrollHeight;
        }
      );
    });
  }
  render() {
    const { massageList, crawlerList } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    // const tailLayout = {
    //   wrapperCol: { offset: 8, span: 16 },
    // };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className="Test-page-wrapper">
        <Button
          onClick={this.showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          添加爬虫
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={crawlerList}
          columns={columns}
        />
        <Button
          onClick={() => {
            this.socket &&
              this.socket.emit("toCrawling", { params: "执行爬虫" });
          }}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          点击爬取
        </Button>

        <ul className="logs-wrapper" ref={this.logsWrapperRef}>
          {massageList.map((item, index) => (
            <li
              key={`${new Date()}${index}`}
              className={`log-item log-item-${item.type}`}
            >
              {item.time} ----- {item.message}
            </li>
          ))}
        </ul>

        <Modal
          title="添加爬虫"
          visible={this.state.visible}
          cancelText="取消"
          okText="添加"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            {...layout}
            ref={this.formRef}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: "请输入名称!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="类型"
              name="type"
              rules={[{ required: true, message: "请输入类型!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="地址"
              name="href"
              rules={[{ required: true, message: "请输入地址!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

TestPage.propTypes = {
  sectionList: PropTypes.array,
  sectionInfo: PropTypes.object,
  dispatchGetSectionDeatil: PropTypes.func,
};
