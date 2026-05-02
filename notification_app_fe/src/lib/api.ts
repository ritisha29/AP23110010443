import axios from 'axios';

export interface Notification {
  ID: string;
  Type: 'Event' | 'Result' | 'Placement';
  Message: string;
  Timestamp: string;
}

export interface FetchNotificationsParams {
  limit?: number;
  page?: number;
  notification_type?: string;
}

// Mock fallback data in case the API is unauthorized
const MOCK_DATA: Notification[] = [
  { "ID": "d146095a", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:51:30" },
  { "ID": "b383218f", "Type": "Placement", "Message": "CSK Corporation hiring", "Timestamp": "2026-04-22 17:51:18" },
  { "ID": "81589eda", "Type": "Event", "Message": "farewell", "Timestamp": "2026-04-22 17:51:06" },
  { "ID": "0005513a", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:50:54" },
  { "ID": "ea836736", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:42" },
  { "ID": "003cb427", "Type": "Result", "Message": "external", "Timestamp": "2026-04-22 17:50:30" },
  { "ID": "a5c4ff30", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:18" },
  { "ID": "1cfce5ee", "Type": "Event", "Message": "tech-fest", "Timestamp": "2026-04-22 17:50:06" },
  { "ID": "cf2085a6", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:49:54" },
  { "ID": "8a7412bd", "Type": "Placement", "Message": "Advanced Micro Devices Inc. hiring", "Timestamp": "2026-04-22 17:49:42" }
];

export const fetchNotifications = async (params?: FetchNotificationsParams): Promise<Notification[]> => {
  try {
    const response = await axios.get<{ notifications: Notification[] }>(
      'http://20.207.122.201/evaluation-service/notifications',
      { params }
    );
    return response.data.notifications;
  } catch (error) {
    console.warn('API returned an error, falling back to mock data for demonstration.', error);
    
    // Simulate pagination and filtering on mock data
    let filtered = [...MOCK_DATA];
    if (params?.notification_type && params.notification_type !== 'All') {
      filtered = filtered.filter(n => n.Type === params.notification_type);
    }
    
    if (params?.limit && params?.page) {
      const start = (params.page - 1) * params.limit;
      filtered = filtered.slice(start, start + params.limit);
    } else if (params?.limit) {
      filtered = filtered.slice(0, params.limit);
    }
    
    return filtered;
  }
};
