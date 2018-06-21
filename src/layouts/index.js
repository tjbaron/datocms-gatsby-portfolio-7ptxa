import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import '../styles/index.sass'
var langsAvailable = ['ja'];

var pathStyle = {
  fill: "rgb(144,255,144)",
  stroke: "black",
  strokeWidth: "9.21px"
};

const TemplateWrapper = ({ children, data, layoutContext }) => {
  console.log(layoutContext);
  var currentLang = layoutContext.lang === 'en' || !layoutContext.lang ? '' : '/'+layoutContext.lang;

  var nav = data.navbar.items.map((itm) => {
    if (itm.path[0] === '/') {
      var p = currentLang+itm.path;
      return <Link to={p}>
        <li>{itm.name}</li>
      </Link>
    } else {
      return <a href={itm.path}>
        <li>{itm.name}</li>
      </a>
    }
  });

  var langSelect = [
    {name: 'English', 'path': '/'},
    {name: 'Japanese', 'path': '/ja/'},
  ].map((itm) => {
    return <li><Link to={itm.path}>{itm.name}</Link></li>
  });

  return <div className="container">
    <HelmetDatoCms
      favicon={data.datoCmsSite.faviconMetaTags}
      seo={data.datoCmsHome.seoMetaTags}
    />
    <div id="content">
      {children()}
    </div>
    <div id="bottombar">
      <ul>{langSelect}</ul>
      <div>{data.datoCmsHome.copyright}</div>
    </div>
    <div id="topbar">
      <svg id="logosvg" style={{position: 'absolute', top: '5px', left: '5px', width: '190px', height: '190px'}} viewBox="0 0 1182 1182">
        <path d="M773.191,79.103L1060.94,129.841C1126.87,141.467 1170.96,204.435 1159.34,270.367L1021.21,1053.71C1009.59,1119.64 946.619,1163.73 880.686,1152.11L576.254,1098.43L673.855,1098.43C719.709,1098.43 759.654,1072.93 780.275,1035.35L853.034,1048.18C890.68,1054.82 926.633,1029.65 933.271,992L1055.59,298.277C1062.23,260.631 1037.06,224.679 999.411,218.04L795.16,182.025L795.16,148.705C795.16,122.816 787.032,98.811 773.191,79.103Z" style={pathStyle} vector-effect="non-scaling-stroke" />
        <path d="M142.019,1065.44L640.864,1065.44C707.814,1065.44 762.169,1011.08 762.169,944.132L762.169,148.705C762.169,81.756 707.815,27.401 640.864,27.401L142.019,27.401C75.069,27.401 20.715,81.756 20.715,148.705L20.715,944.132C20.715,1011.08 75.069,1065.44 142.019,1065.44ZM187.297,124.944L345.057,124.944L345.057,370.162C345.057,437.111 399.411,491.465 466.361,491.466L664.848,491.466L664.848,898.631C664.848,936.858 633.813,967.893 595.586,967.893L437.565,967.893L437.565,722.859C437.565,655.91 383.211,601.555 316.26,601.554L118.036,601.554L118.036,194.206C118.036,155.98 149.07,124.945 187.297,124.944ZM118.036,699.098L270.982,699.098C309.21,699.1 340.244,730.134 340.244,768.36L340.244,967.893L187.297,967.893C149.071,967.893 118.036,936.858 118.036,898.631L118.036,699.098ZM442.378,124.944L595.586,124.944C633.814,124.945 664.848,155.98 664.848,194.206L664.848,393.923L511.639,393.923C473.413,393.923 442.378,362.887 442.378,324.661L442.378,124.944Z" style={pathStyle} vector-effect="non-scaling-stroke" />
      </svg>
      <div id="title">
        {data.datoCmsSite.globalSeo.siteName}
        <div id="title-desc" dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
        }}></div>
      </div>
      <div id="menu"><ul>
        {nav}
      </ul></div>
    </div>
  </div>;
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery($lang: String) {
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    datoCmsHome(locale: {eq: $lang}) {
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
