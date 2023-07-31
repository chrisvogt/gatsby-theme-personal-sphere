/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import SEO from '../components/seo'

const PostTemplate = ({ children, data }) => {
  const { mdx } = data

  const banner = mdx.frontmatter.banner
  const category = mdx.fields.category
  const date = mdx.frontmatter.date
  const description = mdx.frontmatter.description
  const title = mdx.frontmatter.title

  return (
    <Layout>
      <SEO
        article={true}
        description={description}
        image={banner}
        title={title}
      />

      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ height: `100%` }}>
          {category && (
            <Themed.div sx={{ variant: `text.title` }}>
              {category}
            </Themed.div>
          )}

          <time className='created'>{date}</time>

          <Themed.h1 as={Heading}>
            {title}
          </Themed.h1>

          <div className='article-content'>
            {children}
          </div>
        </Container>
      </Flex>
    </Layout>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
}

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      body
      fields {
        category
      }
      frontmatter {
        banner
        date(formatString: "MMMM DD, YYYY")
        description
        title
      }
    }
  }
`

export default PostTemplate
