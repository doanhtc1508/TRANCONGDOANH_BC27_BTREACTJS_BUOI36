import React, { Component } from "react";
import axios from "axios";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
    };
  }
  handleDelete = async (userId) => {
    try {
      // call API xóa người dùng
      await axios.delete(
        `https://62adc4f8b735b6d16a397ff2.mockapi.io/api/userManagement/${userId}`
      );
      // thành công gọi tới props để chạy lại giao diện
      this.props.onDelete();
      this.setState({ disabled: false });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { users } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>Mật khẩu</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Loại người dùng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user}</td>
                <td>{user.name}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.userType}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => this.props.onSelectUser(user.id)}
                    // disabled={!this.props.disabled}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
