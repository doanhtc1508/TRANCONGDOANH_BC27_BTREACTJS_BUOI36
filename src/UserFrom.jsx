import React, { Component } from "react";
import axios from "axios";

export default class UserFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // lưu các giá trị của input
      users: {
        user: "",
        name: "",
        password: "",
        email: "",
        phone: "",
        userType: "",
      },
    };
  }

  // hàm lắng nge thay đổi của input
  handleChange = (event) => {
    const { value, name } = event.target;

    // setState lại users ban đầu
    this.setState((state) => ({
      users: {
        ...state.users,
        [name]: value,
      },
    }));
  };

  // hàm đắng ký người dùng
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://62adc4f8b735b6d16a397ff2.mockapi.io/api/userManagement",
        this.state.users
      );
      // Call API thành công
      // b1:reset from
      this.setState({
        users: {
          user: "",
          name: "",
          password: "",
          email: "",
          phone: "",
          userType: "",
        },
      });
      // b2: gọi lại API get users ở usersManagement
      this.props.onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  // hàm kiểm tra cập nhật thông tin người dùng
  handleUpdate = async (event) => {
    event.preventDefault();
    const { id, ...plaload } = this.state.users;
    if (id) {
      try {
        await axios.put(
          `https://62adc4f8b735b6d16a397ff2.mockapi.io/api/userManagement/${id}`,
          plaload
        );
        // Call API thành công
        // b1:reset from
        this.setState({
          users: {
            user: "",
            name: "",
            password: "",
            email: "",
            phone: "",
            userType: "",
          },
        });
        // b2: gọi lại API get users ở usersManagement
        this.props.onSubmit();
      } catch (error) {
        console.log(error);
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // kiểm tra nếu props/state thay đổi setState lại cho users
    if (this.props.user && this.props.user !== prevProps.user) {
      this.setState({ users: { ...this.props.user } });
    }
  }

  render() {
    // nhận được một props users
    const { users } = this.state;
    return (
      <form>
        <div className="row">
          <div className="col-6">
            {/* Tài khoản */}
            <div className="mb-3">
              <label htmlFor="taiKhoan" className="form-label">
                Tài khoản
              </label>
              <input
                id="user"
                className="form-control"
                value={users.user}
                name="user"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            {/* họ tên */}
            <div className="mb-3">
              <label htmlFor="hoTen" className="form-label">
                Họ tên
              </label>
              <input
                id="name"
                className="form-control"
                value={users.name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            {/* mật khẩu */}
            <div className="mb-3">
              <label htmlFor="matKhau" className="form-label">
                Mật khẩu
              </label>
              <input
                id="password"
                className="form-control"
                value={users.password}
                name="password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            {/* email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                value={users.email}
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            {/* Số điện thoại */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                id="phone"
                className="form-control"
                value={users.phone}
                name="phone"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            {/* loại người dùng */}
            <div className="form-group row">
              <label className="form-label">Loại người dùng</label>
              <div className="col-12">
                <select
                  className="form-control"
                  value={users.userType}
                  name="userType"
                  onChange={this.handleChange}
                >
                  <option>Khách hàng</option>
                  <option>Nhân viên</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="card-footter">
          <button
            className="btn btn-success"
            onClick={this.handleSubmit}
            disabled={this.props.disabled}
          >
            Đăng ký
          </button>
          <button
            className="btn btn-primary ms-3"
            onClick={this.handleUpdate}
            disabled={!this.props.disabled}
          >
            Cập nhật
          </button>
        </div>
      </form>
    );
  }
}
