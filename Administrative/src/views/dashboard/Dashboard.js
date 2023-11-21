import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { formatDate } from '../../utils'
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifVn,
  cibTwitter,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import userService from '../../services/users.Services'
import avatar8 from './../../assets/images/avatars/8.png'
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userCount, setUserCount] = useState(0)
  const [users, setUsers] = useState([])
  let getAll = async () => {
    try {
      const response = await userService.getAllUsers()
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setIsLoading(true) // Bắt đầu hiển thị loading
    getAll()
      .then((res) => {
        setUsers(res)
      })
      .finally(() => {
        setIsLoading(false) // Kết thúc hiển thị loading
      })
  }, [])
  const progressGroupExample1 = [
    { title: 'Thứ 2', value1: 34, value2: 78 },
    { title: 'Thứ 3', value1: 56, value2: 94 },
    { title: 'Thứ 4', value1: 12, value2: 67 },
    { title: 'Thứ 5', value1: 43, value2: 91 },
    { title: 'Thứ 6', value1: 22, value2: 73 },
    { title: 'Thứ 7', value1: 53, value2: 82 },
    { title: 'Chủ nhật', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Nam', icon: cilUser, value: 53 },
    { title: 'Nữ', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Google tìm kiếm', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  useEffect(() => {
    let getAll = async () => {
      try {
        const response = await userService.getAllUsers()
        return response.data
      } catch (err) {
        console.log(err)
      }
    }
    getAll().then((res) => {
      setUserCount(res.length)
    })
  }, 0)
  return (
    <>
      <WidgetsDropdown />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Lượng truy cập {' & '} Bán hàng</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Lượng khách hàng</div>
                        <div className="fs-5 fw-semibold">{userCount}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Khách hàng quay lại</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Tổng lượt truy cập</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Truy cập từ MXH</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Khách hàng</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Quốc gia</CTableHeaderCell>
                    <CTableHeaderCell>Số điện thoại</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Hạng khách hàng</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.slice(0, 10).map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={!item.avatar ? avatar8 : item.avatar} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {' '}
                          {item?.last_name + ' ' + item?.first_name + ' (' + item?.username + ')'}
                        </div>
                        <div className="small text-medium-emphasis">
                          <span>{item?.user_id}</span> | Đăng ký lúc: {formatDate(item.created_at)}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">Việt Nam</CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">{item?.phone_number}</div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item?.usage?.period}</small>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">Vàng</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
