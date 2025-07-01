import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type TabBarIconProps = {
  icon: string;
  color: string;
  size?: number;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({ icon, color, size = 36 }) => (
  <Icon name={icon} size={size} color={color} />
);
