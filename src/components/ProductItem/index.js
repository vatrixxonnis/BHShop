import { Button, Popover, Rate, message } from 'antd';
import { useEffect, useState } from 'react';
import {
    ShoppingCartOutlined,
    FullscreenOutlined,
    HeartOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { handleMoney } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/actions/cartActions';
import PreviewModal from '@/components/Widgets/PreviewModal';
import './ProductItem.css';
import productService from '@/services/productService';
import { Link, useNavigate } from 'react-router-dom';

function ProductItem(props) {
    const { product } = props;
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const viewDetail = (id) => {
        navigate(`/products/${product._id}`);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAddToCart = (product) => dispatch(addToCart(product));
    const displayDiscount = (product) => {
        if (product?.campaign?.active) {
            return (
                <span className="product-item__discount">
                    {`- ${product.campaign.amount} ${changeType(
                        product.campaign.sale_type,
                    )}`}
                </span>
            );
        }
        return <></>;
    };
    const changeType = (type) => {
        if (type === 'percent') {
            return '%';
        }
        return 'đ';
    };
    const displayNewPrice = (price) => {
        if (product?.campaign?.active) {
            if (product.campaign.sale_type === 'percent') {
                return price - (price * product.campaign.amount) / 100;
            }
            return price - product.campaign.amount;
        }
        return price;
    };
    const displayRating = (product) => {
        let rating = 0;
        if (!product?.reviews) {
            return rating;
        }
        product?.reviews.forEach((review) => {
            rating += review.rating;
        });
        return rating / product?.reviews.length;
    };
    return (
        <div className="product-item">
            <div className="product-item__container">
                <button
                    onClick={viewDetail}
                    key={product.product_id}
                    className="product-item__link"
                >
                    <div className="product-item__img">
                        <img src={product?.image[0]} alt="" />
                    </div>
                    <h3 className="product-item__name">{product?.name}</h3>
                    <div className="product-item__rating">
                        <Rate
                            class="product-item__star"
                            disabled
                            defaultValue={displayRating(product)}
                        />
                    </div>
                    <div className="product-item__price">
                        {product?.campaign?.active && 
                            <span className="product-item__price--old">
                                {handleMoney(product?.price)}
                            </span>
                        }
                        <span className="product-item__price--sale">
                            {handleMoney(displayNewPrice(product?.price))}
                        </span>
                    </div>
                </button>
                <div className="product-item__more">
                    <div className="product-item__col">
                        {displayDiscount(product)}
                        <span className="product-item__category ">
                            {product?.category_lst[0].name}
                        </span>
                    </div>
                    <div className="product-item__col">
                        <div
                            className="product-item__preview  product-item__tag"
                            onClick={showModal}
                        >
                            <FullscreenOutlined />
                        </div>
                        <PreviewModal
                            open={isModalOpen}
                            product={product}
                            close={handleCancel}
                            oK={handleOk}
                        />
                        <div className="product-item__wishlist  product-item__tag">
                            <HeartOutlined />
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-item__addcart">
                <Button
                    block
                    type="primary"
                    className="product-item__btn"
                    ghost
                    onClick={() => handleAddToCart(product)}
                >
                    <ShoppingCartOutlined />
                    Thêm vào giỏ
                </Button>
                <Popover content={'Xoá khỏi danh sách yêu thích'}>
                    <Button
                        block
                        type="primary"
                        className="product-item__btn product-item__btn-love-clear"
                        danger
                        ghost
                    >
                        <CloseOutlined />
                    </Button>
                </Popover>
            </div>
        </div>
    );
}

export default ProductItem;
