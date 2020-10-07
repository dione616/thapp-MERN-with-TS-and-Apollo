import React from "react"
import { Alert } from "antd"

interface Props {
  message?: string
  description?: string
}
export const ErrorBanner: React.FC<Props> = ({
  message = "Oops... Something went wrong:(",
  description = "Check your connection!",
}) => {
  return <Alert banner closable message={message} description={description} type="error" className="error-banner" />
}
