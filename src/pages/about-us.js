import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout';

export const query = graphql`
  query {
    wpgraphql {
      pages {
        nodes {
          title
          uri
          date
          content
        }
      }
    }
  }
`

const AboutUs = ({ data }) => {
  const post = data.wpgraphql.pages.nodes[0]
  return (<>
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  </>
  )
}

export default AboutUs;