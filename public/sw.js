const scheduled = new Map();

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("message", (event) => {
  const { type } = event.data;

  if (type === "SCHEDULE") {
    scheduleNotification(event.data.reminder);
  } else if (type === "SCHEDULE_ALL") {
    scheduled.forEach((timeoutId) => clearTimeout(timeoutId));
    scheduled.clear();
    event.data.reminders.forEach(scheduleNotification);
  } else if (type === "CANCEL") {
    cancelNotification(event.data.id);
  } else if (type === "SHOW_NOW") {
    showNotification(event.data.reminder);
  }
});

function scheduleNotification(reminder) {
  if (!reminder?.scheduledAt) return;

  cancelNotification(reminder.id);

  const delay = new Date(reminder.scheduledAt).getTime() - Date.now();
  if (delay <= 0) {
    showNotification(reminder);
    return;
  }

  const timeoutId = setTimeout(() => {
    showNotification(reminder);
    scheduled.delete(reminder.id);
  }, delay);

  scheduled.set(reminder.id, timeoutId);
}

function cancelNotification(id) {
  if (scheduled.has(id)) {
    clearTimeout(scheduled.get(id));
    scheduled.delete(id);
  }
}

function showNotification(reminder) {
  self.registration.showNotification("Planner Reminder", {
    body: reminder.text,
    icon: "/favicon.svg",
    tag: reminder.id,
    requireInteraction: true,
  });
}
