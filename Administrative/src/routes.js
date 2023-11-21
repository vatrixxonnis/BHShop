import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Products
const Products = React.lazy(() => import('./views/products/Products.js'))
const Login = React.lazy(() => import('./views/pages/login/Login.js'))
const CreateProduct = React.lazy(() => import('./views/create-product/CreateProduct.js'))
const EditProduct = React.lazy(() => import('./views/edit-product/EditProduct.js'))
const Orders = React.lazy(() => import('./views/orders/Orders.js'))
const Revenue = React.lazy(() => import('./views/revenue-overview/Revenue.js'))
const UserM = React.lazy(() => import('./views/user-management/UserManagement.js'))
const AddUser = React.lazy(() => import('./views/create-user/CreateUser.js'))
const EditUser = React.lazy(() => import('./views/edit-user/EditUser.js'))

const ReviewAll = React.lazy(() => import('./views/review-management/ReviewManagement.js'))
const OrderDetail = React.lazy(() => import('./views/order-detail/OrderDetail.js'))

const CreateVoucher = React.lazy(() => import('./views/create-voucher/CreateVoucher.js'))
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/dashboard', name: 'Tổng quan', element: Dashboard },
  { path: '/products/all', name: 'Tất cả sản phẩm', element: Products },
  { path: '/products/add', name: 'Thêm sản phẩm mới', element: CreateProduct },
  { path: '/products/edit/:id', name: 'Chỉnh sửa sản phẩm', element: EditProduct },

  // user
  { path: '/users/all', name: 'Quản lý người dùng', element: UserM },
  { path: '/users/add', name: 'Thêm người dùng', element: AddUser },
  { path: '/users/edit/:id', name: 'Chỉnh sửa người dùng', element: EditUser },

  { path: '/users/setting', name: 'Tất cả sản phẩm', element: Products },
  // sell
  { path: '/sell/orders', name: 'Đơn đặt hàng', element: Orders },
  { path: '/sell/revenue', name: 'Theo dõi doanh thu bán hàng theo quý', element: Revenue },
  // order
  { path: '/sell/orders/:id', name: 'Chỉnh sửa sản phẩm', element: OrderDetail },
  //review
  { path: '/reviews/all', name: 'Đánh giá sản phẩm', element: ReviewAll },
  { path: '/reviews/spam', name: 'Tất cả sản phẩm', element: Products },
  { path: '/reviews/pending', name: 'Tất cả sản phẩm', element: Products },
  { path: '/voucher/all', name: 'Tất cả Voucher', element: CreateVoucher },

  //Login
  {
    path: '/login',
    name: 'Đăng nhập tài khoản Hệ thống',
    element: Login,
  },
  { path: '*', name: 'Tất cả sản phẩm', element: Products },
]

export default routes
