const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

var langs = ['en', 'ja'];
var pgs = ['/about', '/tutorials', '/'];

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createLayout } = boundActionCreators
  const MainLayout = path.resolve(`./src/layouts/index.js`);

  for (var l of langs) {
    createLayout({
      component: MainLayout,
      id: l,
      context: {
          lang: l,
      },
    })

    for (var p of pgs) {
      var cpd = {
        path: (l==='en' ? '' : l) + p,
        component: path.resolve(`./src/localized${ p==='/' ? '/index' : p }.js`),
        context: {
          lang: l
        },
        layout: l
      };
      createPage(cpd)
    }
  }

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        createPage({
          path: `works/${work.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug
          },
        })
      })
      resolve()
    })
  })
}
