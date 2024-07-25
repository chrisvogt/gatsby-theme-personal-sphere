/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css' //this will show/hide the link on focus

import BackgroundPattern from './animated-background'
import Footer from './footer'
import TopNavigation from './top-navigation'

/**
 * Layout
 *
 * The default layout component. Wrap all templates in this layout to inherit
 * the default navigation, theme styles, and any important providers. Use shadowing
 * to extend this component and attach additional contexts and providers.
 */
const Layout = ({ children, disableMainWrapper, hideHeader, hideFooter }) => (
  <>
    <SkipNavLink />
    <div sx={{
      backgroundColor: 'background',
      position: 'relative', // stretch to full height
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      color: theme => theme?.colors?.text
    }}>
      <BackgroundPattern />

      {/* NOTE(chrisvogt): hide the top navigation on the home and 404 pages */}
      {!hideHeader && (
        <header role='banner' sx={{ position: 'relative' }}>
          <TopNavigation />
        </header>
      )}

      {
        disableMainWrapper ? children : (
          <main role='main'>
            <SkipNavContent />
            {children}
          </main>
        )
      }

      {!hideFooter && <Footer />}
    </div>
  </>
)

export default Layout
