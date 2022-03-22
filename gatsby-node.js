exports.createPages = async ({ actions, graphql }) => {
  // query for WordPress page data
  const result = await graphql(`
    {
      wpgraphql {
        posts(first: 50) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          nodes {
            id
            uri
          }
        }
      }
    }
  `)

  const posts = result.data.wpgraphql.posts.nodes

  posts.forEach(post => {
    actions.createPage({
      path: `${post.uri}`,
      component: require.resolve("./src/templates/post-template.js"),
      context: {
        id: post.id,
      },
    })
  })
}