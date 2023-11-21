import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import {
  CAvatar,
  CModal,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModalFooter,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilDescription } from '@coreui/icons'
import ordersService from '../../services/orders.Service'
import { handleMoney, formatDate } from '../../utils'
function Orders() {
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // Trạng thái lưu trang hiện tại
  const [pageSize, setPageSize] = useState(10) // Trạng thái lưu số lượng sản phẩm trên mỗi trang
  const [totalItems, setTotalItems] = useState(0) // Trạng thái lưu tổng số sản phẩm

  let getAll = async () => {
    try {
      const response = await ordersService.getAllOrders()
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setIsLoading(true) // Bắt đầu hiển thị loading
    getAll()
      .then((res) => {
        setOrders(res)
        setTotalItems(res.length)
      })
      .finally(() => {
        setIsLoading(false) // Kết thúc hiển thị loading
      })
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page) // Cập nhật trang hiện tại khi thay đổi
  }

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize) // Cập nhật số lượng sản phẩm trên mỗi trang khi thay đổi
  }

  const startItemIndex = (currentPage - 1) * pageSize // Tính chỉ số bắt đầu của sản phẩm trên trang hiện tại
  const endItemIndex = currentPage * pageSize // Tính chỉ số kết thúc của sản phẩm trên trang hiện tại
  const visibleOrders = orders.slice(startItemIndex, endItemIndex) // Lấy danh sách sản phẩm hiển thị trên trang hiện tại

  return (
    <>
      <CTable align="middle" className="mb-0 border list-table" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Thời gian đặt hàng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Sản phẩm</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên khách hàng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Địa chỉ</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tổng tiền</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Trạng thái giao hàng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Trạng thái thanh toán</CTableHeaderCell>

            <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading ? (
            <div className="text-center loading-component">
              <CSpinner component="span" size="sm" aria-hidden="true" /> <span> </span>Đang tải dữ
              liệu...
            </div>
          ) : (
            visibleOrders?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {formatDate(item.created_at)}
                </CTableDataCell>
                <CTableDataCell>
                  <ol>
                    {item.products.map((product, index) => (
                      <li key={index} className="order-product__item">
                        {product.product_name}{' '}
                        <span className="order_quantity">x{product.quantity}</span>
                      </li>
                    ))}
                  </ol>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.user[0]?.last_name + ' ' + item.user[0]?.first_name}
                </CTableDataCell>

                <CTableDataCell>{item.shipping_address}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <span className="order-price__total">
                    {handleMoney(
                      item.products.reduce((acc, curr) => {
                        return acc + curr.quantity * curr.price
                      }, 0),
                    )}
                  </span>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.status === 'completed' ? 'Hoàn thành' : 'Đang vận chuyển'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.payment_method === 'credit_card' ? 'Đã thanh toán' : 'COD'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <span>
                    <Link to={`/sell/orders/${item._id}`}>
                      <CIcon
                        className="action-edit user-action"
                        title="Xem đơn hàng chi tiết"
                        icon={cilDescription}
                      />
                    </Link>
                  </span>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
      <Pagination
        className="list-pagination"
        current={currentPage} // Truyền vào trang hiện tại
        pageSize={pageSize} // Truyền vào số lượng sản phẩm trên mỗi trang
        total={totalItems} // Truyền vào tổng số sản phẩm
        onChange={handlePageChange} // Callback khi trang thay đổi
        onPageSizeChange={handlePageSizeChange} // Callback khi số lượng sản phẩm trên mỗi trang thay đổi
      />
    </>
  )
}

export default Orders
