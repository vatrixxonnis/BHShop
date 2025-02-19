import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Result } from 'antd';
import OrderTracking from '@/components/OrderTracking';
import './Tracking.css';
function Tracking() {
    const onSearchChange = (e) => {
        setSearchInput(e.target.value);
    };
    const [searchInput, setSearchInput] = useState('');
    const hasOrder = true;
    return (
        <div className="tracking-container container">
            <div className="tracking-row">
                <div className="tracking-col">
                    <h3 className="tracking__heading">
                        Theo dõi đơn hàng của bạn&nbsp;
                        <span className="tracking__slogan">nhanh chóng!</span>
                    </h3>
                    <p className="tracking-description">
                        Để tra cứu đơn hàng, bạn vui lòng cung cấp <b>mã đơn hàng</b>.
                        <br />
                        <b>Lưu ý:&nbsp;</b>
                        <span>
                            <i>Mã đơn hàng bắt đầu bằng 3 ký tự *BHH (Ví dụ: BHH12644)</i>
                        </span>
                    </p>
                    <Input
                        allowClear
                        placeholder="Nhập mã đơn hàng..."
                        enterbutton="true"
                        onChange={onSearchChange}
                    />
                </div>

                <div className="tracking-col tracking-result">
                    {hasOrder ? (
                        <div className="tracking-infor__detailed">
                            <OrderTracking order_id={searchInput}></OrderTracking>
                        </div>
                    ) : (
                        <Result
                            status="404"
                            title="Không tìm thấy đơn hàng"
                            subTitle="Xin lỗi chúng tôi không tìm thấy đơn hàng này."
                            extra={
                                <Link to="/">
                                    <Button type="primary">Về trang chủ</Button>
                                </Link>
                            }
                        />
                    )}
                </div>

                <div className="tracking-illustration">
                    <img src="/img/illustrations/tracking.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Tracking;
