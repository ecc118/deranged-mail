import React from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

import theme from '@/utilities/theme';

const Input = styled.TextInput`
  ${() => {
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

  color: ${theme.colors.main};
  padding-left: 12px;
  background-color: ${theme.colors.black};
`;

const TextInput = ({...props}: TextInputProps) => {
  return <Input placeholderTextColor={theme.colors.gray} {...props} />;
};

export default TextInput;
