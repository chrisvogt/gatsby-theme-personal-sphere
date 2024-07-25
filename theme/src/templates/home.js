/** @jsx jsx */
import { jsx, Container, Grid } from 'theme-ui'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import Footer from '../components/footer'
import HomeHeaderContent from '../components/home-header-content'
import HomeNavigation from '../components/home-navigation.js'
import HomeWidgets from '../components/home-widgets'
import Layout from '../components/layout'
import Seo from '../components/seo'

const HomeTemplate = props => {
  return (
    <Layout hideFooter disableMainWrapper>
      <div
        sx={{
          minHeight: `500px`,
          pt: 3,
          px: 0
        }}
      >
        <Container>
          <Grid
            columns={[
              null,
              null,
              `0.375fr 1.625fr`, /* Sidebar 18%, Content 82% */
              `0.4fr 1.6fr` /* Sidebar 20%, Content 80% */
            ]}
            gap={[null, 4]}
          >
            <aside sx={{ mb: [4, null] }}>
              <HomeNavigation />
            </aside>
            <main role='main'>
              <SkipNavContent />
              <div
                sx={{
                  position: 'relative',
                  borderTopRightRadius: '3em',
                  borderTopLeftRadius: '.5em',
                  px: [3, 4],
                  pt: [2, 3],
                }}
              >
                <div
                  sx={{
                    maxWidth: `1200px`,
                  }}
                >
                  <section>
                    <HomeHeaderContent />
                  </section>
                  <HomeWidgets />
                </div>
              </div>
              <Footer />
            </main>
          </Grid>
        </Container>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title='Chris Vogt - Senior Software Engineer in San Francisco | Digital Garden of Photography, Piano, and Travel'
    description="Explore Chris Vogt's digital garden. A Senior Software Engineer at GoDaddy, Chris shares his interest in photography, piano, and travel."
    keywords='Chris Vogt, Senior Software Engineer, GoDaddy, photography, piano, travel, blog, digital garden'
  >
    <meta property="og:url" content="https://www.chrisvogt.me" />
    <meta property="og:type" content="website" />
    <script type="application/ld+json">
      {`{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Chris Vogt",
        "url": "https://www.chrisvogt.me",
        "sameAs": [
          "https://linkedin.com/in/cjvogt",
          "https://github.com/chrisvogt",
          "https://x.com/c1v0",
          "https://twitter.com/c1v0",
          "https://www.instagram.com/c1v0",
          "https://stackoverflow.com/users/1391826/chris-vogt"
        ],
        "jobTitle": "Senior Software Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "GoDaddy"
        }
      }`}
    </script>
  </Seo>
)

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
