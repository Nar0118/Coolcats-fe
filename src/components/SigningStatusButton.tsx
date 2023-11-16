import React, {useContext} from 'react';
import { StatusContext, EnumStatus } from "../context/Status";
import Container from './Container';

type SigningStatusButtonProps = {
  className?: string;
  elementType?: string;
  disabled?: boolean;
  onClick?: Function;
  children: React.ReactNode;
}

export const SigningStatusButtonProps = ({ className, elementType, disabled, onClick, children }: SigningStatusButtonProps) => {
  const { isStatus } = useContext(StatusContext);
  const _disabled = isStatus(EnumStatus.SIGNING_DATA) || (typeof disabled === 'boolean' && disabled === true);

  return (
    <Container
      elementType={ elementType || 'button' }
      className={ className || 'button' }
      onClick={ onClick }
      disabled={ _disabled }
      states={ [{ className: 'disabled', condition: _disabled }] }
    >
      { children }
    </Container>
  );
};

export default SigningStatusButtonProps;
