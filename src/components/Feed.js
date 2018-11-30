import React from 'react'
import Moment from 'react-moment'
import { StaticQuery, graphql } from 'gatsby'

const LISTING_QUERY = graphql`
  query ExternalListing {
    allRssEntry(limit: 5) {
      edges {
        node {
          id
          title
          description
          date
          link
        }
      }
    }
  }
`

const Feed = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allRssEntry }) =>
      allRssEntry.edges.map(({ node }) => (
        <div className="column is-full" key={node.id}>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h4>
                  {node.title}
                </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: node.description,
                  }}
                />
              </div>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">
                <time dateTime={node.date}><Moment format="MMMM D, YYYY" date={node.date} /></time>
              </p>
              <p className="card-footer-item">
                <a href={node.link}>
                  <span>Visit Page</span>
                  <span className="icon is-right">
                    <i className="fas fa-angle-right"></i>
                  </span>
                </a>
              </p>
            </footer>
          </div>
        </div>
      ))
    }
  />
)

export default Feed
