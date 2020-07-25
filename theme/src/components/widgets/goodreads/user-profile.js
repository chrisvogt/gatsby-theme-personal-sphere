/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'
import Placeholder from 'react-placeholder'

import isDarkMode from '../../../helpers/isDarkMode'
import MetricCard from '../metric-card'
import StatusCard from '../status-card'

const UserProfile = ({ isLoading, profile }) => {
  const { favoriteBooks, friendsCount, readCount } = profile

  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'UserProfileDark' : 'UserProfile'

  const metrics = [
    {
      id: 'friends-count',
      title: 'Friends',
      value: friendsCount
    },
    {
      id: 'read-count',
      title: 'Read',
      value: readCount
    }
  ]

  return (
    <Card variant={variant}>
      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Favorite Genres
      </Heading>

      <StatusCard
        message={
          <Placeholder color='#efefef' ready={!isLoading} showLoadingAnimation>
            {favoriteBooks}
          </Placeholder>
        }
      />

      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Metrics
      </Heading>

      <div
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(128px, 1fr))`
        }}
      >
        {metrics.map(({ id, title, value }) => (
          <MetricCard
            key={id}
            title={title}
            value={value}
            showPlaceholder={isLoading}
          />
        ))}
      </div>
    </Card>
  )
}

UserProfile.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool,
  /** The Goodreads user profile. */
  profile: PropTypes.shape({
    favoriteBooks: PropTypes.string,
    friendsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    readcount: PropTypes.number
  })
}

export default UserProfile
