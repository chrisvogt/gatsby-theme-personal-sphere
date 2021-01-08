/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Placeholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'

import { floatOnHover } from '../../../gatsby-plugin-theme-ui/abstracts/shadows'
import Tooltip from '../../tooltip'

const placeholders = Array(12)
  .fill()
  .map((item, idx) => (
    <div className='show-loading-animation' key={idx}>
      <RectShape
        color='#efefef'
        sx={{
          borderRadius: `6px`,
          boxShadow: `md`,
          paddingBottom: `100%`,
          width: `100%`
        }}
        showLoadingAnimation
      />
    </div>
  ))

const MediaItemGrid = ({ isLoading, items = [] }) => (
  <div
    sx={{
      display: `grid`,
      gridGap: [3, 2, 2, 3],
      gridTemplateColumns: [`repeat(4, 1fr)`, `repeat(6, 1fr)`]
    }}
  >
    <Placeholder ready={!isLoading} customPlaceholder={placeholders}>
      {items.map(({
          id,
          spotifyURL,
          thumbnailURL,
          tooltipContent
        }) => (
          <Tooltip placement='top' trigger={['hover', 'focus']} tooltip={tooltipContent}>
            <Styled.a
              href={spotifyURL}
              key={id}
            >
              <img
                alt='cover artwork'
                crossOrigin='anonymous'
                src={thumbnailURL}
                sx={{
                  ...floatOnHover,
                  boxShadow: `md`,
                  borderRadius: `4px`,
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
            </Styled.a>
          </Tooltip>
        ))}
    </Placeholder>
  </div>
)

export default MediaItemGrid
