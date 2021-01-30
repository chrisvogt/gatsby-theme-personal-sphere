/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import get from 'lodash/get'

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
import selectMetricsPayload from '../../../selectors/selectMetricsPayload'

import useSiteMetadata from '../../../hooks/use-site-metadata'

const getMetrics = state => {
  const totalFollowersCount = get(
    state,
    'widgets.dataSources.github.data.user.followers.totalCount'
  )
  const totalFollowingCount = get(
    state,
    'widgets.dataSources.github.data.user.following.totalCount'
  )

  const metrics = [
    {
      displayName: 'Followers',
      id: 'followers',
      value: totalFollowersCount
    },
    {
      displayName: 'Following',
      id: 'following',
      value: totalFollowingCount
    }
  ]

  return metrics
}

const WIDGET_ID = 'github'

const GitHubWidget = () => {
  const dispatch = useDispatch()
  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)
  const githubDataSource = getGithubWidgetDataSource(metadata)

  useEffect(() => {
    dispatch(fetchDataSource(WIDGET_ID, githubDataSource, selectMetricsPayload))
  }, [dispatch, githubDataSource])

  const { isLoading, lastPullRequest, metrics, pinnedItems } = useSelector(
    state => ({
      isLoading: get(state, 'widgets.dataSources.github.state') !== 'SUCCESS',
      lastPullRequest: get(
        state,
        'widgets.dataSources.github.data.user.pullRequests.nodes[0]',
        {}
      ),
      metrics: getMetrics(state),
      pinnedItems: get(
        state,
        'widgets.dataSources.github.data.user.pinnedItems.nodes',
        []
      )
    })
  )

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
    <Widget id='github'>
      <WidgetHeader aside={callToAction}>GitHub</WidgetHeader>
      <ProfileMetricsBadge metrics={metrics} />
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
