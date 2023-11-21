import React from 'react'
import { Link } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import logo from '../assets/brand/web-logo.png'
import './header/header.css'
const AppHeader = () => {
  const user = useSelector((state) => state.user.user)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img src={logo} alt="" height="30" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <Link to="/products/all">Sản phẩm</Link>
          </CNavItem>
          <CNavItem>
            <Link to="/users/all">Tài khoản</Link>
          </CNavItem>
          <CNavItem>
            <Link to="/sell/orders">Đơn hàng</Link>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <span>
              {user.first_name ? (
                <>
                  Xin chào{' '}
                  <span className="admin-user__hello">{user.first_name + ' (Quản trị viên)'}</span>
                </>
              ) : (
                ''
              )}
            </span>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
