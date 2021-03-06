import React from 'react'
import Link from 'gatsby-link'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => {
  return <div>
    <h1>Welcome</h1>
    <div>This is the main website for Writzie.</div>
  </div>
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            sizes(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
