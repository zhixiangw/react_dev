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
            otherAttachmentPath,
            id } = this.props
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
                <a href={`${businessLicencePath}&token=${window.localStorage.getItem('token')}`} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">行驶证附件：</Col>
              <Col span="14">
                <a href={`${driverLicensePath}&token=${window.localStorage.getItem('token')}`} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">合同附件：</Col>
              <Col span="14">
                {
                  attachmentPath && attachmentPath.split(',').map((item, index) => {
                    return <a key={index + 1} href={`${item}&token=${window.localStorage.getItem('token')}`} target="_blank">{`下载${index + 1}   `}</a>
                  })
                }
              </Col>
            </Row>
            <Row>
              <Col span="8">保单附件：</Col>
              <Col span="14">
                <a href={`${insuranceAttachmentPath}&token=${window.localStorage.getItem('token')}`} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">其他附件：</Col>
              <Col span="14">
                <a href={`${otherAttachmentPath}&token=${window.localStorage.getItem('token')}`} target="_blank">下载</a>
              </Col>
            </Row>
            <div style={{ border: '1px solid' }}></div>
            <Row>
              <Col span="8">服务合同：</Col>
              <Col span="14">
                <a href={`${__API_BASE__}contract/serviceContract?id=${id}&token=${window.localStorage.getItem('token')}`} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">借款合同：</Col>
              <Col span="14">
                <a href={`${__API_BASE__}contract/loanContract?id=${id}&token=${window.localStorage.getItem('token')}`} target="_blank">下载</a>
              </Col>
            </Row>
            <Row>
              <Col span="8">还款计划表：</Col>
              <Col span="14">
                <a href={`${__API_BASE__}contract/repaymentSchedule?id=${id}&token=${window.localStorage.getItem('token')}`} target="_blank">下载</a>
              </Col>
            </Row>
          </div>
        </Modal>
    )
  }
}

export default Attachment
