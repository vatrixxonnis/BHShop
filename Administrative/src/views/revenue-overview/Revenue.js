import React from 'react'

const RevenueSummary = () => {
  return (
    <div>
      <div className="revenue-group">
        <h5 className="revenue-heading">Quý 2 - 2022</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doanh thu tháng 6</h5>
                <p className="card-text">Tổng doanh thu: 1.000.000đ</p>
                <p className="card-text">Số đơn hàng: 50</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doanh thu tháng 5</h5>
                <p className="card-text">Tổng doanh thu: 2.000.000đ</p>
                <p className="card-text">Số đơn hàng: 75</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doanh thu tháng 4</h5>
                <p className="card-text">Tổng doanh thu: 2.000.000đ</p>
                <p className="card-text">Số đơn hàng: 75</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="revenue-group">
        <h5 className="revenue-heading">Quý 1 - 2022</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doanh thu tháng 3</h5>
                <p className="card-text">Tổng doanh thu: 1.000.000đ</p>
                <p className="card-text">Số đơn hàng: 50</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doanh thu tháng 2</h5>
                <p className="card-text">Tổng doanh thu: 2.000.000đ</p>
                <p className="card-text">Số đơn hàng: 75</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doanh thu tháng 1</h5>
                <p className="card-text">Tổng doanh thu: 2.000.000đ</p>
                <p className="card-text">Số đơn hàng: 75</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueSummary
