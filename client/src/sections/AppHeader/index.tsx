import React from "react"
import { Link } from "react-router-dom"
import { Layout } from "antd"
import { MenuItems } from "./components"
import { Viewer } from "../../lib/types"

const { Header } = Layout

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const AppHeader: React.FC<Props> = ({ viewer, setViewer }) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">Logo</Link>
        </div>
      </div>
      <div className="app-header__menu_section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  )
}
