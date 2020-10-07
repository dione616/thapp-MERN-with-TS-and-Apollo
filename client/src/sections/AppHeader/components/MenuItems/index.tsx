import React from "react"
import { Button, Menu, Avatar } from "antd"
import Icon from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Viewer } from "../../../../lib/types"
import { LOG_OUT } from "../../../../lib/graphql/mutations"
import { LogOut as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut"
import { useMutation } from "@apollo/react-hooks"
import { displayErrorMessage, displaySuccessNotification } from "../../../../lib/utils"

const { Item, SubMenu } = Menu

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const MenuItems: React.FC<Props> = ({ viewer, setViewer }) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut)
        displaySuccessNotification("You have successfully logged out!:)")
      }
    },
    onError: (data) => {
      displayErrorMessage("Sorry! :(")
    },
  })

  const hanldeLogOut = () => {
    logOut()
  }

  const subMenu =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <Link to={`/user/${viewer.id}`}>
            <Icon type="user" />
            Profile
          </Link>
        </Item>
        <Item key="/logout">
          <div onClick={hanldeLogOut}>
            <Icon type="logout" />
            Logout
          </div>
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    )
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
          <Icon type="home" />
          Host
        </Link>
      </Item>
      {subMenu}
    </Menu>
  )
}
