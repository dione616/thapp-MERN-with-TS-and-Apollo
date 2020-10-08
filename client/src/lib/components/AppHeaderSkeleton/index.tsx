import React from "react"
import { Layout } from "antd"

const { Header } = Layout

export const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">LOGO</div>
      </div>
    </Header>
  )
}
