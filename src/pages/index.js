import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const Blog = () => {

  return (
    <Layout>
      <h2>Aglowlife</h2>
      <Link
        to={`/blog`}
      >View blog page</Link>
    </Layout>
  )
}

export default Blog