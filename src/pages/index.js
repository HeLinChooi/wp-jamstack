import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const Blog = ({ data }) => {
  const posts = data.wpgraphql.posts.nodes

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