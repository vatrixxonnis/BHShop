import VerticalSearchBar from '@/components/VerticalSearchBar';
import VerticalBanner from '@/components/VerticalBanner';
import SourceImg from '@/assets/images';
import { MenuOutlined, HolderOutlined } from '@ant-design/icons';
import './SearchByFilter.css';
import React, { useState, useEffect } from 'react';
import SpinLoading from '@/components/SpinLoading';
import ProductItem from '@/components/ProductItem';
import RecentlyViewProduct from '@/components/RecentlyViewProduct';
import { Breadcrumb } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Tag, Pagination } from 'antd';
import productService from '@/services/productService';
import { useLocation, useSearchParams } from 'react-router-dom';

function Shop() {
    const [products, setProducts] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterParams, setFilterParams] = useState({
        categories: [],
        brand: [],
        priceRange: [20000, 1000000],
        tags: [],
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const sortProducts = (type) => {
        let sortedProducts = [...filteredProducts];
        if (type === 'price_asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (type === 'price_desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (type === 'name_asc') {
            sortedProducts.sort((a, b) =>
                a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
            );
        } else if (type === 'name_desc') {
            sortedProducts.sort((a, b) =>
                b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }),
            );
        }
        setFilteredProducts(sortedProducts);
    };
    const items = [
        {
            label: 'Giá tăng dần',
            key: 'price_asc',
        },
        {
            label: 'Giá giảm dần',
            key: 'price_desc',
        },
        {
            label: 'Theo tên A-Z',
            key: 'name_asc',
        },
        {
            label: 'Theo tên Z-A',
            key: 'name_desc',
        },
    ];

    const onClick = ({ key }) => {
        sortProducts(key);
    };
    const toUnicode = (str) => {
        return str
            .split('')
            .map(function (value, index, array) {
                var temp = value.charCodeAt(0).toString(16).toUpperCase();
                if (temp.length > 2) {
                    return '\\u' + temp;
                }
                return value;
            })
            .join('');
    };
    const { state } = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    const { name } = state || {};
    useEffect(() => {
        // Read values passed on state
        if (name !== null && name !== undefined) {
            setFilterParams({
                ...filterParams,
                categories: [name],
            });
        }
    }, [name]);
    useEffect(() => {
        let searchString = searchParams.get('search');
        if (searchString !== null) {
            let filtered = products.filter((product) => {
                let host = toUnicode(product.name.toLowerCase());
                let client = toUnicode(searchString.toLowerCase());
                return host?.includes(client);
            });
            setFilteredProducts(filtered);
        }
    }, [searchParams]);
    useEffect(() => {
        // Update filtered products based on filter parameters
        let filtered = products;
        if (filterParams.brand.length) {
            filtered = filtered.filter((product) =>
                product.brand?.includes(filterParams.brand),
            );
        }
        if (filterParams.categories.length) {
            filtered = filtered.filter((product) => {
                return product.category_lst[0]?.name?.includes(filterParams.categories);
            });
        }
        if (filterParams.priceRange) {
            filtered = filtered.filter((product) => {
                return (
                    product.price >= filterParams?.priceRange[0] &&
                    product.price <= filterParams?.priceRange[1]
                );
            });
        }
        if (filterParams.tags.length) {
            filterParams.tags.forEach((tag) => {
                if (tag === 'Đang giảm giá') {
                    filtered = filtered.filter((product) => {
                        return product?.campaign?.active === true;
                    });
                }
                if (tag === 'Còn hàng') {
                    filtered = filtered.filter((product) => {
                        return product.inventory_qty > 0;
                    });
                }
            });
        }
        setFilteredProducts(filtered);
    }, [filterParams, products]);
    const handleFilterParamsChange = (newParams) => {
        setFilterParams({
            ...filterParams,
            ...newParams,
        });
    };
    const handleFilterParamsChange1 = (type, newParams) => {
        let updatedParams = {};
        if (type === 'priceRange') {
            updatedParams = { ...filterParams, ...newParams };
        } else {
            updatedParams = {
                ...filterParams,
                [type]:
                    filterParams[type] &&
                    filterParams[type].filter((param) => param !== newParams),
            };
        }
        setFilterParams(updatedParams);
    };

    const handleClearFilters = () => {
        setFilterParams({
            categories: [],
            brand: [],
            priceRange: [20000, 1000000],
            tags: [],
        });
    };

    useEffect(() => {
        productService
            .getAllProduct()
            .then((res) => {
                setLoading(false);
                setFilteredProducts(res.data);
                return setProducts(res.data);
            })
            .catch((err) => {
                setHasError(true);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <div className="container">
                <div className="shop__bread-crumb">
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/">Trang chủ</a>,
                            },
                            {
                                title: <div>Mua sắm</div>,
                            },
                        ]}
                    />
                </div>
                <div className="shop-container">
                    <div className="home-col home-col--left">
                        <div className="shop-search--bar">
                            <VerticalSearchBar
                                filterParams={filterParams}
                                onFilterParamsChange={handleFilterParamsChange}
                                onClearFilters={handleClearFilters}
                            ></VerticalSearchBar>
                        </div>

                        <div className="home-banner__container home-banner--vertical">
                            <VerticalBanner
                                uri="thanhbinhbent.com"
                                imgUrl={SourceImg.bannerleft1}
                                title={'Bánh ngon độc lạ'}
                                value={'-20%'}
                                description={'Giảm giá nhân ngày 8/3'}
                            ></VerticalBanner>
                            <VerticalBanner
                                uri="thanhbinhbent.com"
                                className="home-banner--vertical"
                                imgUrl={SourceImg.bannerleft2}
                                title={'Bánh ngon độc lạ'}
                                value={'-20%'}
                                description={'Giảm giá nhân ngày 8/3'}
                            ></VerticalBanner>
                        </div>
                    </div>
                    <div className="home-col home-col--right">
                        <div className="right-header_img">
                            <a href={`${void 0}`}>
                                <img
                                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg"
                                    alt="Organic Meals Prepared"
                                />
                            </a>
                        </div>
                        <div className="right-filter--view">
                            <div className="view-selector">
                                <a href={`${void 0}`}>
                                    <MenuOutlined />
                                </a>
                                <a href={`${void 0}`}>
                                    <HolderOutlined />
                                </a>
                            </div>
                            <div className="sort-drop_list">
                                <form action="#" method="get">
                                    <Dropdown
                                        trigger={['click']}
                                        menu={{
                                            items,
                                            onClick,
                                        }}
                                    >
                                        <a
                                            href={`${void 0}`}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <Space>
                                                Sắp xếp theo <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </form>
                            </div>
                        </div>
                        <div className="shop-search__display-filter">
                            <div>
                                {filterParams.priceRange && filterParams.priceRange && (
                                    <p>
                                        <Tag
                                            style={{
                                                fontSize: '18px',
                                                padding: '3px 7px',
                                            }}
                                            color="geekblue"
                                            closable
                                            onClose={() =>
                                                handleFilterParamsChange1(
                                                    'priceRange',
                                                    [20000, 1000000],
                                                )
                                            }
                                        >
                                            {`$${filterParams?.priceRange[0]} - $${filterParams?.priceRange[1]}`}
                                        </Tag>
                                    </p>
                                )}
                                {filterParams?.tags &&
                                    filterParams?.tags.map((tag) => (
                                        <p key={"tag" + tag}>
                                            <Tag
                                                style={{
                                                    fontSize: '18px',
                                                    padding: '3px 7px',
                                                }}
                                                color="geekblue"
                                                closable
                                                onClose={() =>
                                                    handleFilterParamsChange1('tags', tag)
                                                }
                                            >
                                                {tag}
                                            </Tag>
                                        </p>
                                    ))}
                            </div>
                            <div>
                                {filterParams.categories &&
                                    filterParams.categories.map((category) => {
                                        return (
                                            <p key={"category" + category}>
                                                <Tag
                                                    style={{
                                                        fontSize: '18px',
                                                        padding: '3px 7px',
                                                    }}
                                                    color="volcano"
                                                    closable
                                                    onClose={() =>
                                                        handleFilterParamsChange1(
                                                            'categoies',
                                                            category,
                                                        )
                                                    }
                                                >
                                                    {category}
                                                </Tag>
                                            </p>
                                        );
                                    })}
                                {filterParams.brand &&
                                    filterParams.brand.map((brand) => {
                                        return (
                                            <p key={"brand" + brand}>
                                                <Tag
                                                    style={{
                                                        fontSize: '18px',
                                                        padding: '3px 7px',
                                                    }}
                                                    color="volcano"
                                                    closable
                                                    onClose={() =>
                                                        handleFilterParamsChange1(
                                                            'brand',
                                                            brand,
                                                        )
                                                    }
                                                >
                                                    {brand}
                                                </Tag>
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="shop-products__main">
                            {loading ? (
                                <SpinLoading></SpinLoading>
                            ) : hasError ? (
                                'Lỗi tải dữ liệu!'
                            ) : (
                                <div className="new-products__list products-list__items">
                                    {currentItems.map((product) => (
                                        <ProductItem
                                            key={"product" + product._id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="shop-products__action-page">
                                <Pagination
                                    defaultCurrent={1}
                                    total={filteredProducts.length}
                                    pageSize={itemsPerPage}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                        <div>
                            <RecentlyViewProduct></RecentlyViewProduct>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
