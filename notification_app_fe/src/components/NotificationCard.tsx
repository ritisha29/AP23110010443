'use client';

import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Notification } from '@/lib/api';

interface Props {
  notification: Notification;
}

export default function NotificationCard({ notification }: Props) {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const readItems = JSON.parse(localStorage.getItem('read_notifications') || '[]');
    if (readItems.includes(notification.ID)) {
      setIsRead(true);
    }
  }, [notification.ID]);

  const markAsRead = () => {
    if (!isRead) {
      const readItems = JSON.parse(localStorage.getItem('read_notifications') || '[]');
      readItems.push(notification.ID);
      localStorage.setItem('read_notifications', JSON.stringify(readItems));
      setIsRead(true);
    }
  };

  const getChipColor = () => {
    switch (notification.Type) {
      case 'Placement': return 'success';
      case 'Result': return 'warning';
      case 'Event': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card 
      onClick={markAsRead}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: '0.3s',
        borderLeft: isRead ? '4px solid transparent' : '4px solid #4dabf5',
        opacity: isRead ? 0.7 : 1,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip label={notification.Type} color={getChipColor() as any} size="small" />
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" fontWeight={isRead ? 'normal' : 'bold'}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
