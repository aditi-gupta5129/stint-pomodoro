import { useCallback, useEffect, useRef } from "react";
import { getAllScheduledReminders } from "../utils/storage";

const timers = new Map();

function showNotification(reminder) {
  const title = "Planner Reminder";
  const options = {
    body: reminder.text,
    icon: "/favicon.svg",
    tag: reminder.id,
  };

  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "SHOW_NOW",
      reminder,
    });
  } else if (Notification.permission === "granted") {
    new Notification(title, options);
  }
}

function scheduleLocal(reminder, onFired) {
  if (timers.has(reminder.id)) {
    clearTimeout(timers.get(reminder.id));
  }

  const delay = new Date(reminder.scheduledAt).getTime() - Date.now();
  if (delay <= 0) {
    showNotification(reminder);
    onFired?.(reminder.id);
    return;
  }

  const id = setTimeout(() => {
    showNotification(reminder);
    timers.delete(reminder.id);
    onFired?.(reminder.id);
  }, delay);

  timers.set(reminder.id, id);
}

export function useNotifications(data, onReminderFired) {
  const swReady = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        swReady.current = true;
        if (reg.active) {
          reg.active.postMessage({ type: "READY" });
        }
      })
      .catch(console.error);
  }, []);

  const syncReminders = useCallback(
    (currentData) => {
      const reminders = getAllScheduledReminders(currentData);

      reminders.forEach((r) => scheduleLocal(r, onReminderFired));

      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SCHEDULE_ALL",
          reminders,
        });
      }
    },
    [onReminderFired]
  );

  useEffect(() => {
    syncReminders(data);
  }, [data, syncReminders]);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return false;
    }
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") {
      alert("Notifications are blocked. Please enable them in browser settings.");
      return false;
    }
    const result = await Notification.requestPermission();
    return result === "granted";
  }, []);

  const scheduleReminder = useCallback(
    async (reminder) => {
      const granted = await requestPermission();
      if (!granted) return false;

      scheduleLocal(reminder, onReminderFired);

      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SCHEDULE",
          reminder,
        });
      }

      return true;
    },
    [requestPermission, onReminderFired]
  );

  return { requestPermission, scheduleReminder, syncReminders };
}
