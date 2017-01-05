import React, { Component } from 'react'
import { Col, Row, Modal } from 'antd'

import './index.less'

class Attachment extends Component {
  render () {
    const { isShow,
            cancel,
            title,
            businessLicencePath,
            driverLicensePath,
            attachmentPath,
            insuranceAttachmentPath,
            otherAttachmentPath } = this.props

    return (
        <Modal
          title={title}
          visible={isShow}
          footer={null}
          onCancel={cancel} >
          <div className="attachment-box">
            <Row>
              <Col span="8">营业执照：</Col>
              <Col span="14">
                <a href={businessLicencePath} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">行驶证附件：</Col>
              <Col span="14">
                <a href={driverLicensePath} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">合同附件：</Col>
              <Col span="14">
                <a href={attachmentPath} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">保单附件：</Col>
              <Col span="14">
                <a href={insuranceAttachmentPath} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">其他附件：</Col>
              <Col span="14">
                <a href={otherAttachmentPath} target="_blank">下载</a>
              </Col>
            </Row>
          </div>
        </Modal>
    )
  }
}

export default Attachment
