import React, { useContext, useState } from 'react';
import { StatusMessageContext } from '../context/StatusMessage';
import Container from './Container';
import SigningStatusButton from './SigningStatusButton';

export default function StatusMessage() {
  const { statusMessage, setStatusMessage, loading, disabled } = useContext(StatusMessageContext);
  const [ showMessage, setShowMessage ] = useState(true);

  if (!statusMessage) {
    return null;
  }

  const dismiss = (e: any) => {
    if (e) {
      e.preventDefault();
    }

    setShowMessage(false);
    setTimeout(() => {
      setStatusMessage(null);
      setShowMessage(true);

      if (statusMessage.callback) {
        statusMessage.callback();
      }
    }, 500);
  }

  const confirm = (e: any) => {
    if (e) {
      e.preventDefault();
    }

    if (statusMessage.confirm) {
      statusMessage.confirm();
    }
  };

  return (
    <Container className='generic-modal' loading={ loading } states={ [{ className: 'show', condition: showMessage }, { className: `generic-modal--${statusMessage.type}` }] }>
      <div className="generic-modal-inner">
        { statusMessage.message }
        { (!statusMessage.confirm && !disabled) && <SigningStatusButton className="button green small" onClick={ dismiss }>Close</SigningStatusButton> }
        { statusMessage.confirm && <SigningStatusButton disabled={ disabled } className="button green small" onClick={ confirm }>Yes</SigningStatusButton> }
        { statusMessage.confirm && <SigningStatusButton disabled={ disabled } className="button red small" onClick={ dismiss }>No</SigningStatusButton> }
      </div>
    </Container>
  )
}
