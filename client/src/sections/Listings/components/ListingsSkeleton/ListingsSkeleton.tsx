import React from "react"
import { Divider, Skeleton, Alert } from "antd"
import "./ListingsSkeleton.css"

interface Props {
  title: string
  error?: boolean
}

export const ListingsSkeleton = ({ title, error }: Props) => {
  const errorAlert = error ? (
    <Alert type="error" message="Uh oh! Simething went wrong - try again later!" className="listings-skeleton__alert" />
  ) : null
  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
    </div>
  )
}
