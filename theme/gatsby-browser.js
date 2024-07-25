import 'prismjs/themes/prism-solarizedlight.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import './src/styles/global.css'

export { default as wrapRootElement } from './wrapRootElement'

// See https://fossies.org/linux/gatsby/examples/using-reach-skip-nav/README.md
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector('[data-reach-skip-link]') // Ccomes with the <SkipNavLink> component.
    if (skipLink) {
      skipLink.focus()
    }
  }
}
