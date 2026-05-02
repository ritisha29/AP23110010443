'use client';

import React, { useEffect, useState } from 'react';
import { fetchNotifications, Notification } from '@/lib/api';
import NotificationCard from '@/components/NotificationCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('All');
  
  const limit = 5; // Show 5 per page

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const data = await fetchNotifications({
        limit,
        page,
        notification_type: typeFilter !== 'All' ? typeFilter : undefined
      });
      setNotifications(data);
      setLoading(false);
    };

    loadAll();
  }, [page, typeFilter]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setTypeFilter(event.target.value as string);
    setPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          All Notifications
        </Typography>
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="type-filter-label">Filter by Type</InputLabel>
          <Select
            labelId="type-filter-label"
            value={typeFilter}
            label="Filter by Type"
            onChange={handleFilterChange}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {notifications.map(notif => (
            <NotificationCard key={notif.ID} notification={notif} />
          ))}
          {notifications.length === 0 && (
            <Typography color="text.secondary">No notifications found.</Typography>
          )}
        </Box>
      )}

      {!loading && notifications.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          {/* We assume there's more pages for demonstration, normally total pages comes from API */}
          <Pagination count={3} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Box>
  );
}
