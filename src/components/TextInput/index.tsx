import React from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

const Input = styled.TextInput`
  ${({theme}) => {
    const typography = theme.typography.headingS;

    return `
      font-family: ${typography.fontFamily};
      font-style: ${typography.fontStyle};
      font-size: ${typography.fontSize}px;
      line-height: ${typography.lineHeight}px;
      ${
        typography.letterSpacing
          ? `letter-spacing: ${typography.letterSpacing}px;`
          : ''
      }
    `;
  }}

  color: ${({theme}) => theme.colors.main};
  padding-left: 12px;
  background-color: ${({theme}) => theme.colors.black};
`;

const TextInput = ({...props}: TextInputProps) => {
  return <Input {...props} />;
};

export default TextInput;
