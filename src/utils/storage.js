const STORAGE_KEY = "planner-app-data";

const defaultData = { tasks: {}, reminders: {} };

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultData, tasks: {}, reminders: {} };
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return { tasks: {}, reminders: {} };
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getItemsForDate(data, type, dateKey) {
  return data[type][dateKey] ?? [];
}

export function getAllScheduledReminders(data) {
  const all = [];
  for (const items of Object.values(data.reminders)) {
    for (const item of items) {
      if (item.scheduledAt && !item.notified) {
        all.push(item);
      }
    }
  }
  return all;
}
