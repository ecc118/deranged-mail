import React from 'react';
import {TextProps as RNTextProps} from 'react-native';
import styled from 'styled-components/native';

import {Color, Typography} from '@/utilities/theme';

interface TextProps extends RNTextProps {
  type?: Typography;
  color?: Color;
}

interface TextStyledProps {
  type: Typography;
  color: Color;
}

const TextStyled = styled.Text<TextStyledProps>`
  ${({type, theme}) => {
    const typography = theme.typography[type];

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

  color: ${({color, theme}) => theme.colors[color]};
`;

const Text = ({type = 'body', color = 'white', ...props}: TextProps) => {
  return <TextStyled type={type} color={color} {...props} />;
};

export default Text;
