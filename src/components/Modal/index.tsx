import React from 'react';
import {ModalProps as DefaultModalProps} from 'react-native';
import styled from 'styled-components/native';

export interface ModalProps extends DefaultModalProps {
  onClose?: () => void;
}

const ModalContainer = styled.Modal``;

const Wrap = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black}CC;
  justify-content: center;
  padding: 0 20px;
`;

const Content = styled.TouchableOpacity``;

const Modal = ({children, onClose, ...props}: ModalProps) => {
  return (
    <ModalContainer {...props} transparent>
      <Wrap activeOpacity={1} onPress={onClose}>
        <Content activeOpacity={1}>{children}</Content>
      </Wrap>
    </ModalContainer>
  );
};

export default Modal;
