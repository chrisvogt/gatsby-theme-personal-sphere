/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import ColorToggle from '../components/color-toggle'
import Footer from '../components/footer'
import Header from '../components/header'
import HomeHeaderContent from '../components/home-header-content'
import HomeIntroBanner from '../components/home-intro-banner'
import HomeWidgets from '../components/home-widgets'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TopNavigation from '../components/top-navigation'

import { getAvatarURL, getHeadline, getSubhead } from '../selectors/metadata'

const HomeTemplate = props => {
  const { data: { site: { siteMetadata = {} } = {} } = {} } = props

  const avatar = getAvatarURL(siteMetadata)
  const headline = getHeadline(siteMetadata)
  const subhead = getSubhead(siteMetadata)

  return (
    <Layout hideNavigation>
      <SEO title='Home' />

      <Header showSwoop hideTopPadding>
        <TopNavigation hideBackground />
        <HomeHeaderContent
          avatar={avatar}
          headline={headline}
          subhead={subhead}
        />
        <HomeIntroBanner />
        <ColorToggle />
      </Header>

      <div
        sx={{
          minHeight: `500px`,
          pt: 3
        }}
      >
        <Container>
          <HomeWidgets />
        </Container>
      </div>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        avatarURL
        description
        headline
        subhead
        title
        titleTemplate
      }
    }
  }
`

export default HomeTemplate
