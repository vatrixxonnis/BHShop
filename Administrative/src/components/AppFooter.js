import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2023 BHShop</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Phát triển bởi BHShop Dev Team</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
