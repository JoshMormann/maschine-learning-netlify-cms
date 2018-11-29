import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <div className="content">
                  <h1 className="has-text-weight-bold is-size-2">News and Reviews</h1>
                </div>
                <div className="columns is-multiline">
                {posts
                  .map(({ node: post }) => (
                  <div className="column is-half" key={post.id}>
                    <div class="card">
                      <div class="card-content">
                        <div class="content">
                          <h4>
                            {post.frontmatter.title}
                          </h4>
                          <p>
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                      <footer className="card-footer">
                        <p className="card-footer-item">
                          <time datetime={post.frontmatter.date}>{post.frontmatter.date}</time>
                        </p>
                        <p className="card-footer-item">
                          <Link className="" to={post.fields.slug}>
                            <span>Keep Reading</span>
                            <span className="icon is-right">
                              <i className="fas fa-angle-right"></i>
                            </span>
                          </Link>
                        </p>
                      </footer>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
