import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import productService from '../../services/products.Service'

function CreateProduct() {
  const [product, setProduct] = useState({})
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const navigate = useNavigate()
  // Fetch Country
  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch('https://api.worldbank.org/v2/country?per_page=500&format=json')
      const data = await response.json()
      const countryList = data[1].map((country) => ({
        id: country.id,
        name: country.name,
      }))
      setCountries(countryList)
    }
    fetchCountries()
  }, [])

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'calories' || name === 'fat' || name === 'sugar' || name === 'protein') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        nutrition_facts: {
          ...prevProduct.nutrition_facts,
          [name]: value,
        },
      }))
    } else if (name === 'sale_type' || name === 'amount') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        campaign: {
          ...prevProduct.campaign,
          [name]: value,
        },
      }))
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }))
    }
    console.log(product)
  }
  //
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await productService.addProduct(product)
      toast.success('Thêm sản phẩm thành công')
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại')
    }
  }
  //
  return (
    <div className="product-update-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              <span className="required-text">* </span>Tên Sản Phẩm:
            </label>
            <input
              type="text"
              value={product.name}
              onChange={handleChange}
              name="name"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            <span className="required-text">* </span>Mô Tả:
          </label>
          <textarea
            name="description"
            value={product.description}
            rows="4"
            cols="50"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price_origin">
              <span className="required-text">* </span>Giá Gốc:
            </label>
            <input
              value={product.price}
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sale_type">Loại khuyến mại:</label>
            <select
              name="sale_type"
              id="sale_type"
              value={product.campaign && product.campaign['sale_type']}
              onChange={handleChange}
            >
              {console.log(product.campaign && product.campaign['sale_type'])}
              <option value="percent">Giảm theo phần trăm (%)</option>
              <option value="price">Giảm trên giá (-)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Giá trị KM:</label>
            <input
              type="text"
              name="amount"
              id="amount"
              value={product.campaign && product.campaign['amount']}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inventory_qty">
              <span className="required-text">* </span>Số Lượng nhập kho:
            </label>
            <input
              value={product.inventory_qty}
              type="number"
              id="inventory_qty"
              name="inventory_qty"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">
            <span className="required-text">* </span>Đăng tải ảnh:{' '}
            <i>(Bạn có thể chọn nhiều ảnh)</i>
          </label>
          <input type="file" id="image" name="image" multiple className="form-control" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Danh Mục:</label>
            <input type="text" id="category" name="category" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="country_of_origin">Xuất Xứ:</label>
            <select
              name="country_of_origin"
              value={product.country_of_origin}
              onChange={handleChange}
            >
              <option value="" disabled>
                -- Chọn quốc gia --
              </option>
              <option>{product.country_of_origin}</option>
              {countries?.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="brand">Thương Hiệu:</label>
            <input
              value={product.brand}
              type="text"
              id="brand"
              name="brand"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Trọng Lượng:</label>
            <input
              value={product.weight}
              type="text"
              id="weight"
              name="weight"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nutrition_facts">
            Lượng Thành Phần Dinh Dưỡng: <i>(Calo - Chất béo - Đường - Protein)</i>
          </label>
          <div className="form-row">
            <input
              className="nutri_field"
              value={product.nutrition_facts && product.nutrition_facts.calories}
              onChange={handleChange}
              type="text"
              id="calories"
              name="calories"
            />{' '}
            <input
              className="nutri_field"
              value={product.nutrition_facts && product.nutrition_facts.fat}
              type="text"
              onChange={handleChange}
              id="fat"
              name="fat"
            />
            <input
              className="nutri_field"
              value={product.nutrition_facts && product.nutrition_facts.sugar}
              type="text"
              onChange={handleChange}
              id="sugar"
              name="sugar"
            />{' '}
            <input
              className="nutri_field"
              value={product.nutrition_facts && product.nutrition_facts.protein}
              type="text"
              onChange={handleChange}
              id="protein"
              name="protein"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="storage_instructions">Hướng Dẫn Bảo Quản:</label>
          <textarea
            id="storage_instructions"
            name="storage_instructions"
            rows="4"
            cols="50"
            onChange={handleChange}
            value={product.storage_instructions}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Lưu Sản Phẩm
          </button>
          <Link to="/products/all" className="btn btn-secondary create-product--back">
            Quay Lại
          </Link>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
