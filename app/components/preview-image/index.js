import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import { Modal, Icon } from 'antd'

import './index.less'

export default class PreviewImage extends Component {

  constructor (props) {
    super(props)

    this.state = {
      rotateCount: 0,
      zoomMultiple: 1,
      transformOrigin: null,
      action: null
    }

    this.close = this.close.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.rotateLeft = this.rotateLeft.bind(this)
    this.rotateRight = this.rotateRight.bind(this)
    this.pre = this.pre.bind(this)
    this.next = this.next.bind(this)
    this.init = this.init.bind(this)
    this.onWheel = this.onWheel.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { isShow, imageIndex } = nextProps
    if (isShow && !this.props.isShow) {
      this.init()
      this.setState({ imageIndex })
    }
  }

  init () {
    this.setState({
      rotateCount: 0,
      zoomMultiple: 1,
      transformOrigin: null,
      transformOriginX: 0,
      transformOriginY: 0,
      transferX: 0,
      transferY: 0,
      action: null,
      defaultMarginTop: 0,
      defaultMarginLeft: 0
    })
  }

  close () {
    const { onCancel } = this.props
    onCancel()
  }

  zoomIn () {
    this.setState({ zoomMultiple: this.state.zoomMultiple + 0.1 })
  }

  zoomOut () {
    const { zoomMultiple } = this.state
    if (window.parseInt(zoomMultiple * 10) / 10 > 0.4) {
      this.setState({ zoomMultiple: this.state.zoomMultiple - 0.1 })
    }
  }

  onWheel (e) {
    if (e.deltaY > 0) {
      this.zoomOut()
    } else if (e.deltaY < 0) {
      this.zoomIn()
    }
  }

  rotateLeft () {
    this.setState({ rotateCount: this.state.rotateCount - 1 })
  }

  rotateRight () {
    this.setState({ rotateCount: this.state.rotateCount + 1 })
  }

  pre () {
    const { imageIndex } = this.state
    if (imageIndex > 0) {
      this.init()
      this.setState({ imageIndex: --this.state.imageIndex })
    }
  }

  next () {
    const { imageArr } = this.props
    const { imageIndex } = this.state
    if (imageArr.length > imageIndex + 1) {
      this.init()
      this.setState({ imageIndex: ++this.state.imageIndex })
    }
  }

  onMouseDown (e) {
    e.preventDefault()
    const { transformOriginX = 0, transformOriginY = 0, transferX = 0, transferY = 0 } = this.state
    this.setState({
      startX: e.pageX,
      startY: e.pageY,
      transformOriginX: transformOriginX + transferX,
      transformOriginY: transformOriginY + transferY,
      action: 'move',
      mouseAction: 'mouseDown',
      defaultMarginTop: (window.innerHeight - e.target.height) / 2,
      defaultMarginLeft: (window.innerWidth - e.target.width) / 2
    })
  }

  onMouseMove (e) {
    e.preventDefault()
    const { startX, startY, action } = this.state
    if (action === 'move') {
      this.setState({
        transferX: e.pageX - startX,
        transferY: e.pageY - startY,
        mouseAction: 'mouseMove'
      })
    }
  }

  onMouseUp (e) {
    e.preventDefault()
    const { startX, startY, action } = this.state
    if (action === 'move') {
      this.setState({
        transferX: e.pageX - startX,
        transferY: e.pageY - startY,
        action: null,
        mouseAction: 'mouseUp'
      })
    }
  }

  getImgStyle () {
    const {
      rotateCount,
      zoomMultiple,
      transferX = 0,
      transferY = 0,
      transformOriginX = 0,
      transformOriginY = 0,
      action,
      mouseAction,
      defaultMarginTop,
      defaultMarginLeft
    } = this.state
    const addImgStyle = { transform: `rotateZ(${90 * rotateCount}deg) scaleX(${zoomMultiple}) scaleY(${zoomMultiple})` }
    if (!action) {
      addImgStyle.transition = 'all .3s ease-out'
    }
    if (transformOriginX || transformOriginY || transferX || transferY) {
      addImgStyle.marginTop = `${defaultMarginTop + transformOriginY + (mouseAction === 'mouseDown' ? 0 : transferY)}px`
      addImgStyle.marginLeft = `${defaultMarginLeft + transformOriginX + (mouseAction === 'mouseDown' ? 0 : transferX)}px`
    }

    return addImgStyle
  }

  render () {
    const { width, imageUrl, imageArr = [], isShow } = this.props
    const { imageIndex = 0 } = this.state
    const currentImageUrl = imageArr.length && imageArr[imageIndex] || imageUrl
    const modalClass = classNames({
      'flat-modal': true
    })
    return (
      <Modal
        className={modalClass}
        wrapClassName="preview-image-box"
        width={width}
        visible={isShow}
        onCancel={this.close}
        mask={false}
        footer={
          <Footer
            zoomIn={this.zoomIn}
            zoomOut={this.zoomOut}
            rotateLeft={this.rotateLeft}
            rotateRight={this.rotateRight}
            pre={this.pre}
            next={this.next}
            noFlip={imageArr.length === 0}
            onMouseMove={this.onMouseMove.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)} />
        } >
          <div className="image-box" onMouseMove={this.onMouseMove.bind(this)} onMouseUp={this.onMouseUp.bind(this)} >
            <img
              style={this.getImgStyle()}
              onMouseDown={this.onMouseDown.bind(this)}
              onMouseMove={this.onMouseMove.bind(this)}
              onMouseUp={this.onMouseUp.bind(this)}
              onWheel={this.onWheel}
              ref="img"
              src={currentImageUrl} />
          </div>
      </Modal>
    )
  }
}

PreviewImage.defaultProps = {
  width: '100%'
}

PreviewImage.propTypes = {
  isShow: PropTypes.bool,
  cancel: PropTypes.func
}

class Footer extends Component {
  render() {
    const { zoomIn, zoomOut, rotateLeft, rotateRight, pre, next, noFlip, onMouseMove, onMouseUp } = this.props
    return (
      <div onMouseMove={onMouseMove} onMouseUp={onMouseUp} >
        <a className="zoom-in" title="放大" onClick={zoomIn}><Icon type="arrow-salt" /></a>
        <a className="zoom-out" title="缩小" onClick={zoomOut}><Icon type="shrink" /></a>
        <a className="rotate-left" title="向左旋转" onClick={rotateLeft}><Icon type="reload" /></a>
        <a className="rotate-right" title="向右旋转" onClick={rotateRight}><Icon type="reload" /></a>
        { !noFlip && <a className="pre" title="向前" onClick={pre}><Icon type="arrow-left" /></a> || null }
        { !noFlip && <a className="next" title="向后" onClick={next}><Icon type="arrow-right" /></a> || null }
      </div>
    )
  }
}
