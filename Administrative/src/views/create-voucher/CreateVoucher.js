import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { formatDate } from '../../utils'
import {
  CAvatar,
  CSpinner,
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import couponsService from '../../services/coupons.Service'
import { cilTrash, cilPencil, cilCheckCircle, cilXCircle } from '@coreui/icons'
import avatar8 from './../../assets/images/avatars/8.png'
function CreateVoucher() {
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [coupons, setCoupons] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // Trạng thái lưu trang hiện tại
  const [pageSize, setPageSize] = useState(10) // Trạng thái lưu số lượng sản phẩm trên mỗi trang
  const [totalItems, setTotalItems] = useState(0) // Trạng thái lưu tổng số sản phẩm
  const [couponIdToDelete, setCouponIdToDelete] = useState(null)
  let getAll = async () => {
    try {
      const response = await couponsService.getAllCoupons()
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setIsLoading(true) // Bắt đầu hiển thị loading
    getAll()
      .then((res) => {
        setCoupons(res)
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
  const visibleCoupons = coupons.slice(startItemIndex, endItemIndex) // Lấy danh sách sản phẩm hiển thị trên trang hiện tại

  const handleDeleteUser = async (userId) => {
    try {
      await couponsService.deleteUser(userId)
      toast.success('Xoá người dùng thành công')
      const updatedUsers = await getAll() // Tải lại danh sách s
      setCoupons(updatedUsers)
      setVisible(false) // Ẩn modal xoá
    } catch (error) {
      toast.error('Xoá người dùng thất bại')
    }
  }

  return (
    <>
      <ToastContainer />
      <CTable align="middle" className="mb-0 border list-table" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
            <CTableHeaderCell>Loại Vocher</CTableHeaderCell>

            <CTableHeaderCell className="text-center">Code</CTableHeaderCell>
            <CTableHeaderCell>Giá trị</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Hiệu lực từ</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Hết hạn lúc</CTableHeaderCell>
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
            visibleCoupons?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  {formatDate(item.created_at)}
                </CTableDataCell>
                <CTableDataCell>
                  {item.discount_type === 'percentage' ? 'Giảm theo phần trăm' : 'Giảm theo giá'}
                </CTableDataCell>
                <CTableDataCell className="text-center">{item?.code}</CTableDataCell>
                <CTableDataCell>
                  <span>{item.discount_value}</span>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {formatDate(item.valid_from)}
                </CTableDataCell>
                <CTableDataCell className="text-center">{formatDate(item.valid_to)}</CTableDataCell>

                <CTableDataCell className="text-center">
                  <span>
                    <Link to={`/coupons/edit/${item._id}`}>
                      <CIcon
                        className="action-edit user-action"
                        title="Sửa tài khoản"
                        icon={cilPencil}
                      />
                    </Link>
                    <CIcon
                      className="action-delete user-action"
                      title="Xoá vĩnh viễn tài khoản"
                      icon={cilTrash}
                      onClick={() => {
                        setCouponIdToDelete(item._id)
                        setVisible(!visible)
                        console.log(couponIdToDelete)
                      }}
                    />
                    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                      <CModalHeader>
                        <CModalTitle>Thông báo</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Bạn đang thao tác <b> xoá tài khoản</b>, thao tác không thể hoàn lại. Bạn có
                        muốn tiếp tục muốn xoá tài khoản này không?
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                          Thoát
                        </CButton>
                        <CButton color="danger" onClick={() => handleDeleteUser(couponIdToDelete)}>
                          OK
                        </CButton>
                      </CModalFooter>
                    </CModal>
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

export default CreateVoucher
