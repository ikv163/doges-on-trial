import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Img from 'react-image'

import * as dogeConstants from '../../constants/doge'

import './doge-card.css'

class DogeCardImageLoader extends PureComponent {
  static propTypes = {
    // Callbacks
    debouncedUpdatePacking: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    const { debouncedUpdatePacking } = this.props
    debouncedUpdatePacking()
    console.info('debouncedUpdatePacking called.')
  }

  render() {
    return 'Loading image...'
  }
}
const DogeCard = ({
  id,
  status,
  imageSrc,
  onClick,
  debouncedUpdatePacking
}) => (
  <div
    id={id}
    onClick={onClick}
    className={`DogeCard DogeCard--${status.toLowerCase()}`}
  >
    <Img
      src={imageSrc}
      alt={`Doge List Submission`}
      loader={
        debouncedUpdatePacking ? (
          <DogeCardImageLoader
            debouncedUpdatePacking={debouncedUpdatePacking}
          />
        ) : (
          'Loading image...'
        )
      }
      unloader={
        <div className="DogeCard-failedImage">
          There was an error fetching the image or it has not been uploaded
          properly. Try submitting it again.
        </div>
      }
      className="DogeCard-image"
    />
    <div className="DogeCard-tag" />
    <div className="DogeCard-label">{status.toUpperCase()}</div>
  </div>
)

DogeCard.propTypes = {
  // State
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(dogeConstants.STATUS_ENUM.values).isRequired,
  imageSrc: PropTypes.string.isRequired,

  // Handlers
  onClick: PropTypes.func.isRequired,

  // Callbacks
  debouncedUpdatePacking: PropTypes.func
}

DogeCard.defaultProps = {
  // Callbacks
  debouncedUpdatePacking: null
}

export default DogeCard
