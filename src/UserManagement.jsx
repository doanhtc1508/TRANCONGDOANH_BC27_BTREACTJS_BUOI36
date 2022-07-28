import React, { Component } from "react";
import UserList from "./UserList";
import axios from "axios";
import UserFrom from "./UserFrom";

class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // users: chứa thông tin người dùng
      users: [],
      // selectUser : chứa thông tin người dùng cập nhật
      selectUser: null,
      disabled: false,
    };
  }

  // hàm call Api lấy danh sách người dùng
  fecthUser = async () => {
    try {
      const { data } = await axios.get(
        "https://62adc4f8b735b6d16a397ff2.mockapi.io/api/userManagement"
      );

      // Call API thành công
      this.setState({ users: data, disabled: false });
    } catch (error) {
      console.log(error);
    }
  };

  fecthUpdateUser = async (userId) => {
    try {
      // call API gọi tới user cần chỉnh sửa
      const { data } = await axios.get(
        `https://62adc4f8b735b6d16a397ff2.mockapi.io/api/userManagement/${userId}`
      );
      // call API thành công
      this.setState({ selectUser: data, disabled: true });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fecthUser();
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center text-primary">User Management</h1>

        <div className="card mb-5">
          <div className="card-header bg-dark text-white">
            <strong>Form đăng ký</strong>
          </div>
          <div className="card-body">
            <UserFrom
              user={this.state.selectUser}
              onSubmit={this.fecthUser}
              disabled={this.state.disabled}
            />
          </div>
        </div>
        <UserList
          users={this.state.users}
          onDelete={this.fecthUser}
          onSelectUser={this.fecthUpdateUser}
        />
      </div>
    );
  }
}

export default UserManagement;
