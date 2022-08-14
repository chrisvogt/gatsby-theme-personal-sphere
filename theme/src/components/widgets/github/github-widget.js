/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import CallToAction from '../call-to-action'
import LastPullRequest from './last-pull-request'
import PinnedItems from './pinned-items'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import fetchDataSource from '../../../actions/fetchDataSource'
import {
  getGithubUsername,
  getGithubWidgetDataSource
} from '../../../selectors/metadata'
import { SUCCESS, FAILURE } from '../../../reducers/widgets'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const getMetrics = state => {
  const user = state.widgets?.github?.data?.user || {}
  const totalFollowersCount = user.followers?.totalCount
  const totalFollowingCount = user.following?.totalCount

  return [
    ...(totalFollowersCount
      ? [
          {
            displayName: 'Followers',
            id: 'followers',
            value: totalFollowersCount
          }
        ]
      : []),
    ...(totalFollowingCount
      ? [
          {
            displayName: 'Following',
            id: 'following',
            value: totalFollowingCount
          }
        ]
      : [])
  ]
}

const getHasFatalError = state => state.widgets?.github?.state === FAILURE
const getIsLoading = state => state.widgets?.github?.state !== SUCCESS
const getLastPullRequest = state =>
  state.widgets?.github?.data?.user?.pullRequests?.nodes?.[0]
const getPinnedItems = state =>
  state.widgets?.github?.data?.user?.pinnedItems?.nodes

const GitHubWidget = () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)
  const githubDataSource = getGithubWidgetDataSource(metadata)

  const hasFatalError = useSelector(getHasFatalError)
  const isLoading = useSelector(getIsLoading)
  const lastPullRequest = useSelector(getLastPullRequest)
  const metrics = useSelector(getMetrics)
  const pinnedItems = useSelector(getPinnedItems)

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchDataSource('github', githubDataSource))
    }
  }, [dispatch, githubDataSource, isLoading])

  const callToAction = (
    <CallToAction
      title={`${githubUsername} on GitHub`}
      url={`https://www.github.com/${githubUsername}`}
      isLoading={isLoading}
    >
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='github' hasFatalError={hasFatalError}>
      <WidgetHeader aside={callToAction}>GitHub</WidgetHeader>
      {!hasFatalError && <ProfileMetricsBadge metrics={metrics} />}
      <PinnedItems
        isLoading={isLoading}
        items={pinnedItems}
        placeholderCount={2}
      />
      <LastPullRequest isLoading={isLoading} pullRequest={lastPullRequest} />
    </Widget>
  )
}

export default GitHubWidget
