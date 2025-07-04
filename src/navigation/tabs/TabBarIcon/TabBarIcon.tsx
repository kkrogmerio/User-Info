import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type TabBarIconProps = {
  icon: string;
  color: string;
  size?: number;
  testID: string;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  icon,
  color,
  size = 36,
  testID,
}) => <Icon name={icon} size={size} color={color} testID={testID} />;
