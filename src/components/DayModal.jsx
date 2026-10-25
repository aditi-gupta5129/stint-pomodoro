import { useState } from "react";
import { formatDisplayDate, generateId } from "../utils/dateUtils";

export default function DayModal({
  dateKey,
  data,
  onClose,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onAddReminder,
  onDeleteReminder,
  onRemindMe,
}) {
  const [tab, setTab] = useState("tasks");
  const [taskInput, setTaskInput] = useState("");
  const [reminderInput, setReminderInput] = useState("");

  const tasks = data.tasks[dateKey] ?? [];
  const reminders = data.reminders[dateKey] ?? [];

  const handleAddTask = (e) => {
    e.preventDefault();
    const text = taskInput.trim();
    if (!text) return;
    onAddTask(dateKey, { id: generateId(), text, done: false });
    setTaskInput("");
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    const text = reminderInput.trim();
    if (!text) return;
    onAddReminder(dateKey, {
      id: generateId(),
      text,
      scheduledAt: null,
      notified: false,
    });
    setReminderInput("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 id="modal-title" className="modal__title">
          {formatDisplayDate(dateKey)}
        </h2>

        <div className="modal__tabs">
          <button
            type="button"
            className={`modal__tab ${tab === "tasks" ? "modal__tab--active" : ""}`}
            onClick={() => setTab("tasks")}
          >
            Tasks
            {tasks.filter((t) => !t.done).length > 0 && (
              <span className="modal__badge">{tasks.filter((t) => !t.done).length}</span>
            )}
          </button>
          <button
            type="button"
            className={`modal__tab ${tab === "reminders" ? "modal__tab--active" : ""}`}
            onClick={() => setTab("reminders")}
          >
            Reminders
            {reminders.length > 0 && (
              <span className="modal__badge">{reminders.length}</span>
            )}
          </button>
        </div>

        <div className="modal__content">
          {tab === "tasks" && (
            <div className="task-panel">
              {tasks.length === 0 ? (
                <p className="empty-state">No tasks for this day.</p>
              ) : (
                <ul className="item-list">
                  {tasks.map((task) => (
                    <li key={task.id} className={`item ${task.done ? "item--done" : ""}`}>
                      <label className="item__check">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => onToggleTask(dateKey, task.id)}
                        />
                        <span className="item__checkmark" />
                      </label>
                      <span className="item__text">{task.text}</span>
                      <button
                        type="button"
                        className="item__delete"
                        onClick={() => onDeleteTask(dateKey, task.id)}
                        aria-label="Delete task"
                      >
                        🗑
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <form className="add-form" onSubmit={handleAddTask}>
                <input
                  type="text"
                  className="add-form__input"
                  placeholder="Add a new task..."
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                />
                <button type="submit" className="add-form__btn">
                  + Add Task
                </button>
              </form>
            </div>
          )}

          {tab === "reminders" && (
            <div className="reminder-panel">
              {reminders.length === 0 ? (
                <p className="empty-state">No reminders for this day.</p>
              ) : (
                <ul className="item-list">
                  {reminders.map((reminder) => (
                    <li key={reminder.id} className="item item--reminder">
                      <span className="item__text">{reminder.text}</span>
                      <div className="item__actions">
                        {reminder.scheduledAt ? (
                          <span className="item__scheduled">
                            🔔 {new Date(reminder.scheduledAt).toLocaleString()}
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="remind-btn"
                            onClick={() => onRemindMe(dateKey, reminder)}
                          >
                            Remind me
                          </button>
                        )}
                        <button
                          type="button"
                          className="item__delete"
                          onClick={() => onDeleteReminder(dateKey, reminder.id)}
                          aria-label="Delete reminder"
                        >
                          🗑
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <form className="add-form" onSubmit={handleAddReminder}>
                <input
                  type="text"
                  className="add-form__input"
                  placeholder="Add a reminder..."
                  value={reminderInput}
                  onChange={(e) => setReminderInput(e.target.value)}
                />
                <button type="submit" className="add-form__btn add-form__btn--secondary">
                  + Add Reminder
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
