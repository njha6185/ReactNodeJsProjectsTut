import React from "react";
import _ from "lodash";
import config from "../config.json"
import http from "../services/httpService";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//const EndPoint = "https://jsonplaceholder.typicode.com/posts";



class BackendTest extends React.Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const response = await http.get(config.EndPoint);
    //console.log(response.data);
    this.setState({ data: response.data });
  }

  handleAdd = async () => {
    //console.log("Add clicked");
    const obj = { title: "a", body: "b" };
    const { data } = await http.post(config.EndPoint, obj);
    const post = [data, ...this.state.data];
    this.setState({ data: post });
    toast.success("Data Added Successfully")
    //console.log(data);
  };

  handleUpdate = async (post) => {
    //console.log("handle Update" + post);
    post.title = "updated " + post.id;
    await http.put(config.EndPoint + "/" + post.id, post);
    const data = [...this.state.data];
    const index = data.indexOf(post);
    data[index] = { ...post };
    this.setState({ data });
  };

  handleDelete = async (post) => {
    //console.log("handle Delete" + id);
    const originalData = this.state.data;
    const data = this.state.data.filter((d) => d.id !== post.id);
    this.setState({ data });
    try {
      await http.delete(config.EndPoint + "/99ss9" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
      {toast.error("This Post has already been deleted!!!");}
      this.setState({ data: originalData });
    }
  };

  renderCell(item, h) {
    //console.log(item.id);
    if (h.content) return h.content(item);

    return _.get(item, h.path);
  }

  render() {
    const tableHeader = [
      { name: "ID", path: "id" },
      { name: "Title", path: "title" },
      {
        name: "Update",
        path: "update",
        content: (post) => (
          <button
            onClick={() => this.handleUpdate(post)}
            className="btn btn-warning"
          >
            Update
          </button>
        ),
      },
      {
        name: "Delete",
        path: "delete",
        content: (post) => (
          <button
            onClick={() => this.handleDelete(post)}
            className="btn btn-danger"
          >
            Delete
          </button>
        ),
      },
    ];

    const { data } = this.state;

    return (
      <div>
          <ToastContainer position="top-left"/>
        <button className="btn btn-success m-3" onClick={this.handleAdd}>
          ADD
        </button>
        <table className="table">
          <thead>
            <tr>
              {tableHeader.map((h) => (
                <th key={h.name} className="mx-3">
                  {h.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {tableHeader.map((h) => (
                  <td key={h.name + item.id} className="mx-3">
                    {this.renderCell(item, h)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BackendTest;
