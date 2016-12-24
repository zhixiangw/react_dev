import React, { Component } from 'react'
import { Modal } from 'antd'

import './index.less'

class ConfirmModal extends Component {
  render () {
    const { isShow, cancel, title, confirm, children } = this.props

    return (
        <Modal
          title={title}
          visible={isShow}
          onOk={confirm}
          onCancel={cancel} >
          <div className="confirm-modal-box">
            {children}
          </div>
        </Modal>
    )
  }
}

export default ConfirmModal
