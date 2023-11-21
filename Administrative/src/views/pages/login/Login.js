import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import webLogo from '../../../assets/brand/web-logo.png'
import loginIcon from '../../../assets/images/grocery.svg'
import { cilLockLocked, cilUser, cilWarning } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { setLoggedIn, setUser } from '../../../redux/actions/authActions'
import userService from '../../../services/users.Services'

import { phoneValidator } from '../../../utils'
const Login = (props) => {
  const { isLoggedIn } = props
  console.log(isLoggedIn)
  const navigate = useNavigate()
  const [phonenumber, setPhonenumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()

    // Kiểm tra số điện thoại
    try {
      await phoneValidator(null, phonenumber)
      setError(null)
    } catch (error) {
      setError(error.message)
      return
    }

    try {
      const response = await userService.login({ phonenumber, password })

      if (response?.status === 200) {
        props.setLoggedIn(true)
        props.setUser(response.data)
      } else {
        setError('Tài khoản không tồn tại, hoặc mật khẩu sai!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }, [isLoggedIn, navigate])
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin} method="POST">
                    <h1>Đăng nhập</h1>
                    <p className="text-medium-emphasis">Đăng nhập tài khoản để quản trị Cửa hàng</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="phonenumber"
                        placeholder="Số điện thoại"
                        autoComplete="username"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div>
                      {error ? (
                        <span className="error-login mb-3">
                          <CIcon
                            icon={cilWarning}
                            className="flex-shrink-0 me-2"
                            width={18}
                            height={18}
                          />
                          <i>{error}</i>
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right"></CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 infor-company" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h5>Quản lý cửa hàng</h5>
                    <div className="logo-web" id="logo-web">
                      <img src={webLogo} alt="" />
                    </div>
                    <div className="logo-web">
                      <img src={loginIcon} alt="" />
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.user,
  }
}

const mapDispatchToProps = {
  setLoggedIn,
  setUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}
