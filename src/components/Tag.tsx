import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { colors, spacing } from '../theme';

interface TagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  label,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.tag, selected && styles.selectedTag]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AppText
        size="sm"
        variant="medium"
        color={selected ? colors.white : colors.textPrimary}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    marginRight: spacing.sm,
  },
  selectedTag: {
    backgroundColor: colors.primary,
  },
});

