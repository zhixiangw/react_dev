import React, { Component } from 'react'
import { Col, Row, Modal } from 'antd'

import './index.less'

class ConfirmModal extends Component {
  render () {
    const { isShow, cancel, title, confirm, children } = this.props
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
    }

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
