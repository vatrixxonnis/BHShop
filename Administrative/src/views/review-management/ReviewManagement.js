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
//import reviewsService from '../../services/review.Service'
import reviewsService from '../../services/review.Service'
import { formatDate } from '../../utils'

import { cilImage, cilTrash, cilPencil, cilStar } from '@coreui/icons'
import avatar8 from './../../assets/images/avatars/8.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ReviewManagement = () => {
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [reviews, setReviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [filterStatus, setFilterStatus] = useState('all')

  let getAll = async () => {
    try {
      const response = await reviewsService.getAllReviews()
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setIsLoading(true) // Bắt đầu hiển thị loading
    getAll()
      .then((res) => {
        setReviews(res)
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
  let visibleReviews = reviews.slice(startItemIndex, endItemIndex) // Lấy danh sách sản phẩm hiển thị trên trang hiện tại
  const handleFilterChange = (status) => {
    setFilterStatus(status)
  }
  if (filterStatus !== 'all') {
    visibleReviews = visibleReviews.filter((review) => review.label === filterStatus)
  }
  const changeStatus = async (id, status) => {
    try {
      await reviewsService.updateReviewStatus(id, status)
      toast.success('Cập nhật trạng thái đánh giá thành công!')

      const updatedReviews = await getAll()
      setReviews(updatedReviews)
    } catch (error) {
      toast.error('Cập nhật trạng thái đánh giá thất bại!')
    }
  }
  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewsService.deleteReviewById(reviewId)
      toast.success('Xoá đánh giá thành công')
      const updatedReviews = await getAll() // Tải lại danh sách sản phẩm
      setReviews(updatedReviews) // Cập nhật danh sách sản phẩm mới vào state
      setVisible(false) // Ẩn modal xoá sản phẩm
    } catch (error) {
      toast.error('Xoá đánh giá thất bại')
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="filter-buttons">
        <label htmlFor="" className="filter-buttons__header">
          Bộ lọc:
        </label>
        <button
          className={`filter-button ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          Tất cả
        </button>
        <button
          className={`filter-button ${filterStatus === 'accepted' ? 'active' : ''}`}
          onClick={() => handleFilterChange('accepted')}
        >
          Đã duyệt
        </button>
        <button
          className={`filter-button ${filterStatus === 'spam' ? 'active' : ''}`}
          onClick={() => handleFilterChange('spam')}
        >
          Spam
        </button>
      </div>

      <CTable align="middle" className="mb-0 border list-table" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>

            <CTableHeaderCell>Thời gian</CTableHeaderCell>
            <CTableHeaderCell>Trạng thái</CTableHeaderCell>
            <CTableHeaderCell>Người dùng</CTableHeaderCell>
            <CTableHeaderCell>Nội dung</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Rating</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Sản phẩm</CTableHeaderCell>

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
            visibleReviews?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <span>{index + 1}</span>
                </CTableDataCell>

                <CTableDataCell>
                  <span>{formatDate(item.created_at)}</span>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.label === 'accepted' ? (
                    <span>Đã duyệt</span>
                  ) : item.label === 'spam' ? (
                    <span>Spam</span>
                  ) : (
                    <span>Đợi duyệt</span>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {item.user[0].last_name + ' ' + item.user[0].first_name}
                </CTableDataCell>
                <CTableDataCell>{item.comment}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.rating} <CIcon className="review_star" icon={cilStar} />
                </CTableDataCell>
                <CTableDataCell className="user_active">
                  <a href={'../products/edit/' + item.product[0]._id}> {item.product[0].name}</a>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <span>
                    <div className=" form-action">
                      <button
                        type="submit"
                        className="btn btn-spam"
                        disabled={item.label === 'spam'}
                        onClick={() => changeStatus(item._id, 'spam')}
                      >
                        Spam
                      </button>

                      {item.label === 'accepted' ? (
                        <button className="btn btn-secondary review_accept" disabled>
                          Duyệt
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary review_accept"
                          onClick={(e) => {
                            changeStatus(item._id, 'accepted')
                          }}
                        >
                          Duyệt
                        </button>
                      )}

                      <CIcon
                        className="action-delete user-action"
                        title="Xoá vĩnh viễn tài khoản"
                        icon={cilTrash}
                        onClick={() => {
                          setReviewIdToDelete(item._id)
                          setVisible(!visible)
                        }}
                      />
                    </div>
                    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                      <CModalHeader>
                        <CModalTitle>Thông báo</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Bạn đang thao tác <b> xoá sản phẩm</b>, thao tác không thể hoàn lại. Bạn có
                        muốn tiếp tục muốn xoá sản phẩm này không?
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                          Thoát
                        </CButton>
                        <CButton
                          onClick={() => handleDeleteReview(reviewIdToDelete)}
                          color="danger"
                        >
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

export default ReviewManagement
