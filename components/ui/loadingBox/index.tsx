import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from '@/components/ui/box';

export const LoadingBox: React.FC = () => (
  <Box className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#0000ff" />
  </Box>
);

