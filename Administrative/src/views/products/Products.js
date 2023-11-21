import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

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
import productService from '../../services/products.Service.js'
import { cilImage, cilTrash, cilPencil } from '@coreui/icons'
import logoBh from '../../assets/brand/favicon.ico'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleMoney } from '../../utils'

const Products = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // Trạng thái lưu trang hiện tại
  const [pageSize, setPageSize] = useState(10) // Trạng thái lưu số lượng sản phẩm trên mỗi trang
  const [totalItems, setTotalItems] = useState(0) // Trạng thái lưu tổng số sản phẩm
  const [productIdToDelete, setProductIdToDelete] = useState(null)

  let getAll = async () => {
    try {
      const response = await productService.getAllProduct()
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setIsLoading(true) // Bắt đầu hiển thị loading
    getAll()
      .then((res) => {
        setProducts(res)
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
  const visibleProducts = products.slice(startItemIndex, endItemIndex) // Lấy danh sách sản phẩm hiển thị trên trang hiện tại
  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId)
      toast.success('Xoá sản phẩm thành công')
      const updatedProducts = await getAll() // Tải lại danh sách sản phẩm
      setProducts(updatedProducts) // Cập nhật danh sách sản phẩm mới vào state
      setVisible(false) // Ẩn modal xoá sản phẩm
    } catch (error) {
      toast.error('Xoá sản phẩm thất bại')
    }
  }

  return (
    <>
      <ToastContainer />
      <CTable align="middle" className="mb-0 border list-table" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilImage} />
            </CTableHeaderCell>
            <CTableHeaderCell>Sản phẩm</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Giá</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Thương hiệu</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tồn kho</CTableHeaderCell>
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
            visibleProducts?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index} className="product-view__row">
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item.image[0] && item?.image[0]} />
                </CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CIcon size="xl" icon={''} title={''} /> <span>{handleMoney(item.price)}</span>
                </CTableDataCell>

                <CTableDataCell className="text-center">{item.brand}</CTableDataCell>
                <CTableDataCell className="text-center">{item.inventory_qty}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <span>
                    <Link to={`/products/edit/${item._id}`}>
                      <CIcon
                        className="action-edit user-action"
                        title="Sửa sản phẩm"
                        icon={cilPencil}
                      />
                    </Link>
                    <CIcon
                      className="action-delete user-action"
                      title="Xoá sản phẩm"
                      icon={cilTrash}
                      onClick={() => {
                        setProductIdToDelete(item._id)
                        setVisible(!visible)
                      }}
                    />
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
                          onClick={() => handleDeleteProduct(productIdToDelete)}
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

export default Products
