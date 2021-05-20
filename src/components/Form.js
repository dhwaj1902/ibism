import React, { createRef } from "react";
import firebase from "../config/Firebase";
import { storage } from "../config/Firebase";
import { Input, Form, Button, notification, Card } from "antd";
import { Link, withRouter } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

class AddProduct extends React.Component {
  state = {
    name: "",
    description: "",
    image: null,
    loading: false,
    imageUrl: "",
  };

  componentDidMount = () => {
    console.log(this.props.match.params.product);
    if (this.props.match.params.product) {
      const productRef = firebase
        .database()
        .ref("Product")
        .child(this.props.match.params.product);
      productRef.on("value", (snapshot) => {
        const products = snapshot.val();
        console.log(products);
        this.setState({
          name: products.name,
          description: products.description,
          imageUrl: products.image,
        });
      });
    }
  };

  addProduct = (imageUrl) => {
    if (this.props.match.params.product) {
      const productRef = firebase
        .database()
        .ref("Product")
        .child(this.props.match.params.product);
      const product = {
        name: this.state.name,
        description: this.state.description,
        image: imageUrl,
      };
      productRef.update(product);
      this.setState({ loading: false });
      notification.success({
        message: "Product Updated Successfully",
      });
    } else {
      const productRef = firebase.database().ref("Product");
      const product = {
        name: this.state.name,
        description: this.state.description,
        image: imageUrl,
      };
      productRef.push(product);
      this.setState({ loading: false });
      notification.success({
        message: "Product Added Successfully",
      });
    }
    this.props.history.push("/");
  };

  handleImage = (e) => {
    if (e.target.value[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };

  handleUpload = () => {
    this.setState({ loading: true });
    const { image } = this.state;
    if (this.state.image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // setUrl(url);
              console.log(url);
              this.addProduct(url);
            });
        }
      );
    } else {
      this.addProduct(this.state.imageUrl);
    }
  };

  render() {
    console.log();
    return (
      <div>
        <Link to="/">
          <Button type="primary" className="mb-2 text-align-center">
            <ArrowLeftOutlined />
            Home
          </Button>
        </Link>
        <Card>
          <h3>{this.props.match.params.product ? "Edit " : "Add "} Product</h3>
          <hr />
          <div className="text-center">
            {this.props.match.params.product ? (
              <img
                src={this.state.imageUrl}
                className="mx-auto mb-3"
                width="200px"
              ></img>
            ) : null}
          </div>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Item name="image" label="Upload Image">
                  <Input type="file" id="image" onChange={this.handleImage} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="Product Name *">
                  <Input
                    type="text"
                    name="name"
                    onChange={(e) =>
                      this.setState({
                        name: e.target.value,
                      })
                    }
                    value={this.state.name}
                    defaultValue={this.state.name}
                  ></Input>
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item label="Description">
                  <TextArea
                    type="text"
                    name="description"
                    rows={4}
                    onChange={(e) =>
                      this.setState({
                        description: e.target.value,
                      })
                    }
                    value={this.state.description}
                  ></TextArea>
                </Form.Item>
              </div>
            </div>
            <hr />
            <Button
              loading={this.state.loading}
              type="primary"
              className="w-100"
              disabled={this.state.name == ""}
              onClick={this.handleUpload}
            >
              {this.props.match.params.product ? "Edit " : "Add "}
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default withRouter(AddProduct);
