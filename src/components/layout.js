import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "@wordpress/block-library/build-style/style.css"
import "../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
  query {
    wpgraphql {
      generalSettings {
        title
      }
    }
  }
`)

  const { title } = data.wpgraphql.generalSettings

  return (
    <>
      <header class="header">
        <Link to="/" className="home">
          {title}
        </Link>
        <Link to="/about-us/">
          {"About Us"}
        </Link>
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout