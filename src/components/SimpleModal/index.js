import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class SimpleModal extends Component {
  state = { open: true }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const {
      header,
      content,
      open,
      onCancel,
      onConfirm,
      confirmText,
    } = this.props;
    return (
      <div>
        <Modal size='tiny' open={open} onClose={this.close}>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <p>{content}</p>
          </Modal.Content>
          <Modal.Actions>
            {onCancel && (
              <Button negative onClick={onCancel}>No</Button>
            )}
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content={confirmText || 'Yes'}
              onClick={onConfirm}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default SimpleModal;