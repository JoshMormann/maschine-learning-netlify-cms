import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Feed from '../components/Feed'
import BackgroundImg from '../img/maschine-background.jpg'
import logo from '../img/ml-logo-color.svg';

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="hero is-large" style={{ background: `linear-gradient(to right, rgba(0,0,0,0.85) 0%,rgba(0,0,0,0) 100%), url(${BackgroundImg})`, backgroundPosition: `center center`,  backgroundSize: `cover` }}>
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-half">
                  <img src={logo} style={{ width: '150px', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.85))'}} itemProp="image" alt="Maschine Learning Logo" />
                  <h1 className="title is-uppercase">
                    Maschine <span className="has-text-weight-normal">Learning</span>
                  </h1>
                  <h2 className="subtitle">
                    Training, tips, and news from across the web for Native Instruments Machine hardware and software.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <div className="content">
                  <h2 className="has-text-weight-bold is-size-2">Posts and Reviews</h2>
                </div>
                <div className="columns is-multiline">
                  { posts.map(({ node: post }) => (
                    <div className="column is-half" key={post.id}>
                      <div className="card">
                        <div className="card-content">
                          <div className="content">
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
                            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
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
              <div className="column is-one-third">
                <div className="content">
                  <h2 className="has-text-weight-bold is-size-2">3rd Party News</h2>
                </div>
                <div className="columns is-multiline">
                  <Feed />
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
