import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'
import ordersService from '../../services/orders.Service'
import { handleMoney, formatDate } from '../../utils'

function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState({})

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await ordersService.getOrderById(id)
      setOrder(data)
    }

    fetchOrder()
  }, [id])

  // OnChange Status
  const handleChangeStatus = async (event) => {
    const newStatus = event.target.value
    const updatedOrder = await ordersService.updateOrderStatus(id, newStatus)
    if (updatedOrder) {
      setOrder({ ...order, status: updatedOrder.status })
      toast.success('Cập nhật trạng thái đơn hàng thành công')
    } else {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng')
    }
  }

  return (
    <div className="order?.detail">
      <ToastContainer />
      <h4>Thông tin đơn hàng</h4>
      <p>
        Thời gian đặt hàng: <b>{formatDate(order?.order_date)}</b>
      </p>
      <p>
        Tên khách hàng: <b> {order?.user?.last_name + ' ' + order?.user?.first_name}</b>
      </p>
      <p>
        Số điện thoại khách hàng: <b> {order?.user?.phone_number}</b>
      </p>
      <p>
        Địa chỉ giao hàng: <b>{order?.shipping_address}</b>
      </p>
      <p>
        Trạng thái:{' '}
        <b>
          {order?.status == 'completed'
            ? 'Hoàn thành'
            : order?.status == 'processing'
            ? 'Đang vận chuyển'
            : 'Đã huỷ'}
        </b>
      </p>
      <p>
        Cập nhật đơn hàng:{' '}
        <select
          value={order?.status}
          name="update_status"
          id="update_status"
          onChange={handleChangeStatus}
        >
          <option value="cancel">Huỷ đơn</option>
          <option value="processing">Đang vận chuyển</option>
          <option value="completed">Hoàn thành</option>
        </select>
      </p>
      <div></div>
      <h4>Thông tin sản phẩm</h4>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {order?.products &&
            order?.products?.map((product, index) => (
              <tr key={index}>
                <td>{product.product_name}</td>
                <td>{product.quantity}</td>
                <td>{handleMoney(product.price)}</td>
                <td>{handleMoney(product.price * product.quantity)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h4 className="order-detail__total">
        Tổng tiền:{' '}
        <span className="danger">
          {' '}
          {order?.products &&
            handleMoney(
              order?.products.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price
              }, 0),
            )}
        </span>
      </h4>
    </div>
  )
}

export default OrderDetail
