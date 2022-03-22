import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
// import Search from "../components/Search"
import * as JsSearch from "js-search"

export const query = graphql`
  query {
    wpgraphql {
      posts (first: 50) {
        nodes {
          id
          title
          uri
          excerpt
        }
      }
    }
  }
`

const Blog = ({ data }) => {
  const posts = data.wpgraphql.posts.nodes
  const [search, setSearch] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    rebuildIndex();
  }, [])

  const rebuildIndex = () => {
    const index1 = 'title';
    const dataToSearch = new JsSearch.Search(index1)
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex(index1)

    dataToSearch.addIndex("uri") // sets the index attribute for the data
    dataToSearch.addIndex("excerpt") // sets the index attribute for the data

    dataToSearch.addDocuments(posts) // adds the data to be searched
    setSearch(dataToSearch);
    setIsLoading(false);
  }

  const searchData = e => {
    const queryResult = search.search(e.target.value)
    setSearchQuery(e.target.value);
    setSearchResults(queryResult);
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const queryResults = searchQuery === "" ? posts : searchResults;
  return (
    <Layout>
      <div style={{ margin: "0 auto" }}>
        <div className="container bg-light p-3 mb-3">

          <form onSubmit={handleSubmit} className="row">
            <div style={{ margin: "0 auto" }} className="col-12 col-md-6">
              <label htmlFor="Search" className="form-label">
                Search in all 49 posts
              </label>
              <input
                id="Search"
                value={searchQuery}
                onChange={searchData}
                placeholder="Enter your search here"
                class="form-control"
              />
              <div className="p-1 ">
                Result:
                {" " + queryResults.length + " "}
                posts found
              </div>
            </div>

            <div className="col-0 col-md-2"></div>
            <div className="col-12 col-md-4">
              <h6>
                Notice
              </h6>
              Links starting with aglowlife.com in posts are no longer working and this website is maintained only for archive purpose&#128513;
              </div>
          </form>
        </div>
        <div>

          <div className="container">
            <div className="row">

              {queryResults.map(post => (
                <article className="col-12 col-md-6" key={post.id}>
                  <h4>
                    <Link
                      to={`${post.uri}`}
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                  </h4>
                  {/* Remove read more cuz the link here is helinchooi.com */}
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt.replace('Read More &raquo;', '') }} />
                </article>
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog