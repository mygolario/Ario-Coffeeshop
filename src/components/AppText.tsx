import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

interface AppTextProps extends TextProps {
  variant?: 'regular' | 'medium' | 'semiBold' | 'bold';
  size?: keyof typeof typography.fontSize;
  color?: string;
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'regular',
  size = 'base',
  color = colors.textPrimary,
  style,
  children,
  ...props
}) => {
  const fontFamily = typography.fontFamily[variant];
  const fontSize = typography.fontSize[size];
  
  return (
    <Text
      style={[
        styles.text,
        { fontFamily, fontSize, color },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: typography.fontFamily.regular,
  },
});

