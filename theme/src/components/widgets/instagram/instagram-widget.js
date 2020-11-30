/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import { useCallback, useState } from 'react'
import ReactPlaceholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'
import Carousel, { Modal, ModalGateway } from 'react-images'

import {
  getInstagramUsername,
  getInstagramWidgetDataSource
} from '../../../selectors/metadata'
import useSiteMetadata from '../../../hooks/use-site-metadata'
import useDataSource from '../../../hooks/use-data-source'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetItem from './instagram-widget-item'
import WidgetHeader from '../widget-header'

const MAX_IMAGES = 8

const ItemPlaceholder = (
  <div className='image-placeholder'>
    <RectShape
      color='#efefef'
      sx={{
        borderRadius: `4px`,
        boxShadow: `md`,
        width: `100%`,
        paddingBottom: `100%`
      }}
    />
  </div>
)

export default () => {
  const metadata = useSiteMetadata()

  const instagramUsername = getInstagramUsername(metadata)
  const instagramDataSource = getInstagramWidgetDataSource(metadata)

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const { isLoading, data = {} } = useDataSource(instagramDataSource)
  const { collections: { media: posts } = {}, metrics = [] } = data

  const photos = !isLoading && posts.map(({ caption, cdnMediaURL: src }) => ({ caption, src }))

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const callToAction = (
    <CallToAction
      title={`${instagramUsername} on Instagram`}
      url={`https://www.instagram.com/${instagramUsername}`}
      isLoading={isLoading}
    >
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='instagram'>
      <WidgetHeader aside={callToAction}>Instagram</WidgetHeader>

      {metrics && <ProfileMetricsBadge metrics={metrics} />}

      <div className='gallery'>
        <Grid
          sx={{
            gridGap: [3, 3, 3, 4],
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)']
          }}
        >
          {(isLoading ? Array(MAX_IMAGES).fill({}) : posts)
            .slice(0, MAX_IMAGES)
            .map((post, idx) => (
              <ReactPlaceholder
                customPlaceholder={ItemPlaceholder}
                key={isLoading ? idx : post.id}
                ready={!isLoading}
                showLoadingAnimation
                type='rect'
              >
                <WidgetItem handleClick={openLightbox} index={idx} post={post} />
              </ReactPlaceholder>
            ))}
        </Grid>
      </div>

      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            {!isLoading && (
              <Carousel
                currentIndex={currentImage}
                views={photos.map(x => ({
                  ...x,
                  src: x.src,
                  caption: x.caption
                }))}
              />
            )}
          </Modal>
        )}
      </ModalGateway>
    </Widget>
  )
}
