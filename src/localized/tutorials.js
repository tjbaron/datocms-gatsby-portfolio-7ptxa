import React from 'react'
import Link from 'gatsby-link'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => {
  var last = null;
  var articles = data.allDatoCmsWork.edges.map(({ node: work }) => {
    if (work.slug === last) return;
    last = work.slug;
    return <div key={work.id} className="article-preview">
        <Link to={`/works/${work.slug}`}>
          <Img className="article-img" sizes={work.coverImage.sizes} />
        </Link>
        <Link className="article-title" to={`/works/${work.slug}`}>{work.title}</Link>
        <div className="article-desc">{work.excerpt}</div>
    </div>
  });
  
  return <div>
    <h1>Tutorials</h1>
    {articles}
  </div>
}

export default IndexPage

export const query = graphql`
  query TutorialQuery {
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
