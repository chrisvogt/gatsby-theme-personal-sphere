/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import MetricCard from '../metric-card'
import StatusCard from '../status-card'

const UserProfile = ({ isLoading, user }) => {
  if (isLoading) {
    return 'Loading...'
  }

  const { repositories = {}, followers = {}, following = {} } = user

  const metrics = [
    {
      id: 'repositories',
      title: 'Repositories',
      value: repositories.totalCount
    },
    {
      id: 'followers',
      title: 'Followers',
      value: followers.totalCount
    },
    {
      id: 'following',
      title: 'Following',
      value: following.totalCount
    }
  ]

  return (
    <Card>
      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
        }}
      >
        Status
      </Heading>

      <StatusCard
        message={user.status.message}
        updatedAt={user.status.updatedAt}
      />

      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
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
          <MetricCard key={id} title={title} value={value} />
        ))}
      </div>
    </Card>
  )
}

UserProfile.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool.isRequired,
  followers: PropTypes.shape({
    totalCount: PropTypes.number
  }),
  following: PropTypes.shape({
    totalCount: PropTypes.number
  }),
  repositories: PropTypes.shape({
    totalCount: PropTypes.number
  })
}

export default UserProfile
