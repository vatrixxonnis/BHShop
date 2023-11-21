import React, { useState } from 'react'
import { phoneValidator, emailValidator, passwordValidator } from '../../utils'
import { ToastContainer, toast } from 'react-toastify'
import userService from '../../services/users.Services'
import 'react-toastify/dist/ReactToastify.css'
const CreateUser = () => {
  const [userInfo, setUserInfo] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserInfo({ ...userInfo, [name]: value })

    console.log(userInfo)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await userService.register(userInfo)
      toast.success('Tạo tài khoản mới thành công!')
    } catch (error) {
      toast.error('Tạo tài khoản mới thất bại!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="user_type">
            <span className="required-text">* </span>Loại tài khoản
          </label>
          <select
            type="text"
            id="user_type"
            name="user_type"
            className="form-control"
            value={userInfo.user_type}
            onChange={handleChange}
          >
            <option value="Admin">Quản trị viên</option>
            <option value="Customer">Khách hàng</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">
            <span className="required-text">* </span>Họ tên đệm
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="form-control"
            value={userInfo.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">
            {' '}
            <span className="required-text">* </span>Tên
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="form-control"
            value={userInfo.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_repassword">
            {' '}
            <span className="required-text">* </span>Số điện thoại
          </label>
          <input
            value={userInfo.phone_number}
            type="text"
            id="phone_number"
            name="phone_number"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">
            <span className="required-text">* </span>Mật khẩu:
          </label>
          <input
            id="password"
            name="password"
            className="form-control"
            value={userInfo.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_repassword">
            <span className="required-text">* </span>Nhập lại mật khẩu
          </label>
          <input
            type="password"
            id="user_repassword"
            name="user_repassword"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Tên người dùng:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Giới tính:</label>
          <select
            id="gender"
            name="gender"
            className="form-control"
            value={userInfo.gender}
            onChange={handleChange}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="user_repassword"> Ngày sinh</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            className="form-control"
            value={userInfo.birth_date}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row  form-upload__file">
        {' '}
        <div className="form-group">
          <label htmlFor="avatar_url">Tải lên ảnh đại diện:</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="form-control"
            value={userInfo.avatar}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar_url">Kích hoạt tài khoản:</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={userInfo.status}
            onChange={handleChange}
          >
            <option value="blocked">Khoá tài khoản</option>
            <option value="active">Kích hoạt</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Tạo tài khoản
      </button>
    </form>
  )
}

export default CreateUser
