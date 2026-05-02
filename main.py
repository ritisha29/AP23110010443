import heapq
import json
import urllib.request
import os
from datetime import datetime

class Notification:
    def __init__(self, notif_id, notif_type, message, timestamp):
        self.id = notif_id
        self.type = notif_type
        self.message = message
        # Parse timestamp: "2026-04-22 17:51:30"
        self.timestamp = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
        
        # Determine weight based on priority rules
        if self.type == "Placement":
            self.weight = 3
        elif self.type == "Result":
            self.weight = 2
        elif self.type == "Event":
            self.weight = 1
        else:
            self.weight = 0

    def __lt__(self, other):
        # We want to maintain a MIN-HEAP of the TOP N elements.
        # This means the root of the heap should be the SMALLEST element
        # among the largest N elements. 
        # So __lt__ should define what makes one notification "less important" than another.
        if self.weight != other.weight:
            return self.weight < other.weight
        return self.timestamp < other.timestamp

    def __repr__(self):
        return f"[{self.type}] {self.message} ({self.timestamp.strftime('%Y-%m-%d %H:%M:%S')})"

def get_notifications(token=None):
    """Fetch notifications from API or fallback to mock data if unauthorized."""
    url = "http://20.207.122.201/evaluation-service/notifications"
    
    # Optional API fetch attempt
    if token:
        try:
            req = urllib.request.Request(url, headers={'Authorization': f'Bearer {token}'})
            with urllib.request.urlopen(req) as response:
                if response.getcode() == 200:
                    data = json.loads(response.read().decode())
                    return data.get("notifications", [])
        except Exception as e:
            print(f"Failed to fetch from API: {e}. Falling back to mock data.")
    
    # Fallback to mock data from the problem statement
    return [
        {"ID": "d146095a...", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:51:30"},
        {"ID": "b383218f...", "Type": "Placement", "Message": "CSK Corporation hiring", "Timestamp": "2026-04-22 17:51:18"},
        {"ID": "81589eda...", "Type": "Event", "Message": "farewell", "Timestamp": "2026-04-22 17:51:06"},
        {"ID": "0005513a...", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:50:54"},
        {"ID": "ea836736...", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:42"},
        {"ID": "003cb427...", "Type": "Result", "Message": "external", "Timestamp": "2026-04-22 17:50:30"},
        {"ID": "a5c4ff30...", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:18"},
        {"ID": "1cfce5ee...", "Type": "Event", "Message": "tech-fest", "Timestamp": "2026-04-22 17:50:06"},
        {"ID": "cf2085a6...", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:49:54"},
        {"ID": "8a7412bd...", "Type": "Placement", "Message": "Advanced Micro Devices Inc. hiring", "Timestamp": "2026-04-22 17:49:42"}
    ]

def maintain_top_n_notifications(notifications_data, n=10):
    """Maintains the top N notifications using a Min-Heap."""
    min_heap = []
    
    for raw_notif in notifications_data:
        notif = Notification(
            raw_notif["ID"], 
            raw_notif["Type"], 
            raw_notif["Message"], 
            raw_notif["Timestamp"]
        )
        
        if len(min_heap) < n:
            heapq.heappush(min_heap, notif)
        else:
            # If the current notification is strictly greater than the smallest in the heap,
            # we pop the smallest and push the new one.
            if notif > min_heap[0]:
                heapq.heapreplace(min_heap, notif)
                
    # Extract from heap and sort in descending order (highest priority first)
    top_notifications = []
    while min_heap:
        top_notifications.append(heapq.heappop(min_heap))
    
    top_notifications.reverse()
    return top_notifications

if __name__ == "__main__":
    token = os.environ.get("AUTH_TOKEN", None)
    
    print("Fetching notifications...")
    notifications_data = get_notifications(token)
    
    N = 10
    print(f"Calculating Top {N} Priority Notifications...\n")
    top_n = maintain_top_n_notifications(notifications_data, n=N)
    
    print("-" * 70)
    print(f"{'TYPE':<12} | {'MESSAGE':<35} | {'TIMESTAMP'}")
    print("-" * 70)
    for notif in top_n:
        print(f"{notif.type:<12} | {notif.message:<35} | {notif.timestamp.strftime('%Y-%m-%d %H:%M:%S')}")
    print("-" * 70)
