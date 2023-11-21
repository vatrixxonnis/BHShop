import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBasket,
  cilPencil,
  cilUser,
  cilViewModule,
  cilTags,
  cilWallpaper,
  cilCommentSquare,
  cilChart,
  cilLibraryAdd,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tổng quan',
    to: '/dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'HOT',
    },
  },
  {
    component: CNavTitle,
    name: 'Hàng hoá',
  },
  {
    component: CNavItem,
    name: 'Tất cả sản phẩm',
    to: '/products/all',
    icon: <CIcon icon={cilViewModule} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thêm sản phẩm',
    to: '/products/add',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản trị',
  },
  {
    component: CNavGroup,
    name: 'Bán hàng',
    to: '/sell',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Đơn hàng',
        to: '/sell/orders',
      },
      {
        component: CNavItem,
        name: 'Doanh thu',
        to: '/sell/revenue',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Tài khoản',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tất cả tài khoản',
        to: '/users/all',
      },
      {
        component: CNavItem,
        name: 'Tạo mới',
        to: '/users/add',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Đánh giá',
    icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tất cả',
        to: '/reviews/all',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Chiến dịch',
  },
  {
    component: CNavItem,
    name: 'Mã giảm giá',
    to: '/voucher/all',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Banner',
    to: '/campaign/banner',
    icon: <CIcon icon={cilWallpaper} customClassName="nav-icon" />,
  },
]

export default _nav
