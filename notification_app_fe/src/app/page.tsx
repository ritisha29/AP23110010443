'use client';

import React, { useEffect, useState } from 'react';
import { fetchNotifications, Notification } from '@/lib/api';
import NotificationCard from '@/components/NotificationCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import CircularProgress from '@mui/material/CircularProgress';

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState<number>(10);

  useEffect(() => {
    const loadPriority = async () => {
      setLoading(true);
      const data = await fetchNotifications();
      
      // Determine Priority based on Weight and Recency
      // Placement (3) > Result (2) > Event (1)
      const getWeight = (type: string) => {
        if (type === 'Placement') return 3;
        if (type === 'Result') return 2;
        if (type === 'Event') return 1;
        return 0;
      };

      const sorted = [...data].sort((a, b) => {
        const weightA = getWeight(a.Type);
        const weightB = getWeight(b.Type);
        
        if (weightA !== weightB) {
          return weightB - weightA; // Descending weight
        }
        
        // Tiebreaker: Recency
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      });

      setNotifications(sorted);
      setLoading(false);
    };

    loadPriority();
  }, []);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTopN(newValue as number);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Priority Inbox
        </Typography>
        <Box width={200}>
          <Typography gutterBottom>Show Top: {topN}</Typography>
          <Slider
            value={topN}
            onChange={handleSliderChange}
            step={5}
            marks
            min={5}
            max={20}
          />
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {notifications.slice(0, topN).map(notif => (
            <NotificationCard key={notif.ID} notification={notif} />
          ))}
          {notifications.length === 0 && (
            <Typography color="text.secondary">No priority notifications found.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
