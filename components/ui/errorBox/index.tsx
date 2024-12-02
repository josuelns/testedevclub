import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface ErrorBoxProps {
  message: string;
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ message }) => (
  <Box className="flex-1 justify-center items-center">
    <Text className="text-red-500">{message}</Text>
  </Box>
);
