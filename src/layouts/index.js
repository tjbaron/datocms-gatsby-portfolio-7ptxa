import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import '../styles/index.sass'

const TemplateWrapper = ({ children, data }) => {
  var nav = data.navbar.items.map((itm) => {
    return <li>
      <Link to={itm.path}>{itm.name}</Link>
    </li>
  });
  return <div className="container">
    <HelmetDatoCms
      favicon={data.datoCmsSite.faviconMetaTags}
      seo={data.datoCmsHome.seoMetaTags}
    />
    <div className="container__sidebar">
      <div className="sidebar">
        <h6 className="sidebar__title">
          <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
        </h6>
        <div
          className="sidebar__intro"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
          }}
        />
        <ul className="sidebar__menu">
          {nav}
        </ul>
        <p className="sidebar__social">
          {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
            <a
              key={profile.profileType}
              href={profile.url}
              target="blank"
              className={`social social--${profile.profileType.toLowerCase()}`}
            />
          ))}
        </p>
        <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
      </div>
    </div>
    <div className="container__body">
      <div className="container__mobile-header">
        <div className="mobile-header">
          <div className="mobile-header__menu">
            <Link to="#" data-js="toggleSidebar" />
          </div>
          <div className="mobile-header__logo">
            <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
          </div>
        </div>
      </div>
      {children()}
    </div>
  </div>;
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery {
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      copyright
    }
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
    navbar: datoCmsNavbar {
      items {
        name
        path
      }
    }
  }
`
