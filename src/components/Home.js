import React from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Avatar, Tag, Popconfirm, Typography, Button, Modal } from "antd";
import firebase from "../config/Firebase";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Title } = Typography;

class HomePage extends React.Component {
  state = {
    products: [],
    visible: false,
    data: {},
    loading: true,
  };

  componentDidMount = () => {
    const productRef = firebase.database().ref("Product");
    productRef.on("value", (snapshot) => {
      const products = snapshot.val();
      const productList = [];
      for (let id in products) {
        productList.push({ id, ...products[id] });
      }
      productList.reverse();
      this.setState({ products: productList, loading: false });
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  openModal = (data) => {
    this.setState({ visible: true, data: data });
  };

  deleteProduct = (product) => {
    const productRef = firebase.database().ref("Product").child(product.id);
    productRef.remove();
  };

  render() {
    console.log(this.state.products);
    return (
      <div>
        {this.state.loading ? (
          <Loader />
        ) : this.state.products.length === 0 ? (
          <h3>No Data Available</h3>
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <Title level={3}>Products</Title>
              <div className="text-right pb-2">
                <Link to="/addproduct">
                  <Button type="primary" size="middle" icon={<PlusOutlined />}>
                    Add Product
                  </Button>
                </Link>
              </div>
            </div>
            <hr />
            {this.state.products.map((item, index) => (
              <Card
                className="mt-2"
                key={item.id}
                actions={[
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => this.deleteProduct(item)}
                  >
                    <Tag icon={<DeleteOutlined />} color="red">
                      Delete
                    </Tag>
                  </Popconfirm>,
                  <Link to={`/editProduct/${item.id}`}>
                    <Tag icon={<EditOutlined />} color="warning">
                      Edit
                    </Tag>
                  </Link>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={item.image} />}
                  title={item.name}
                  description={item.description}
                  onClick={() => this.openModal(item)}
                  style={{ cursor: "pointer" }}
                />
              </Card>
            ))}
            <Modal
              title={this.state.data.name}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={[]}
            >
              <div className="mx-auto text-center">
                <img
                  src={this.state.data.image}
                  className="mx-auto"
                  width="200px"
                ></img>
                <br />
                <strong>{this.state.data.description}</strong>
              </div>
            </Modal>
          </>
        )}
      </div>
    );
  }
}

export default HomePage;
