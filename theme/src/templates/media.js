/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Seo from '../components/seo'

import SoundCloud from '../shortcodes/soundcloud'
import YouTube from '../shortcodes/youtube'

const getBanner = mdx => mdx.frontmatter.banner
const getDescription = mdx => mdx.frontmatter.description
const getTitle = mdx => mdx.frontmatter.title

const MediaTemplate = ({ data: { mdx }, children }) => {
  const category = mdx.fields.category
  const date = mdx.frontmatter.date
  const soundcloudId = mdx.frontmatter.soundcloudId
  const title = getTitle(mdx)
  const youtubeSrc = mdx.frontmatter.youtubeSrc

  return (
    <Layout>
      {(youtubeSrc || soundcloudId) && (
        <Themed.div
          sx={{
            backgroundColor: theme => theme.colors['panel-background'],
            textAlign: `center`,
            paddingY: 3
          }}
        >
          <Container>
            {youtubeSrc && <YouTube url={youtubeSrc} />}
            {soundcloudId && <SoundCloud soundcloudId={soundcloudId} />}
          </Container>
        </Themed.div>
      )}

      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ height: `100%` }}>
          {category && (
            <Themed.div sx={{ fontSize: [3, 4], variant: `text.title` }}>
              {category}
            </Themed.div>
          ) }

          <time className='created'>
            {date}
          </time>

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

MediaTemplate.propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
}

export const Head = ({ data: { mdx } }) => {
  const banner = getBanner(mdx)
  const description = getDescription(mdx)
  const title = getTitle(mdx)

  return (
    <Seo
      article={true}
      description={description}
      image={banner}
      title={title}
    />
  )
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
        type
        soundcloudId
        youtubeSrc
      }
    }
  }
`

export default MediaTemplate
