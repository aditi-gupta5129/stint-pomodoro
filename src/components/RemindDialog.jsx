import { useState } from "react";

export default function RemindDialog({ reminder, onConfirm, onCancel }) {
  const now = new Date();
  const defaultDate = now.toISOString().slice(0, 10);
  const defaultTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduledAt = new Date(`${date}T${time}`).toISOString();
    if (new Date(scheduledAt) <= new Date()) {
      alert("Please choose a future date and time.");
      return;
    }
    onConfirm(scheduledAt);
  };

  return (
    <div className="modal-overlay modal-overlay--top" onClick={onCancel}>
      <div className="remind-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h3 className="remind-dialog__title">When do you want to be reminded?</h3>
        <p className="remind-dialog__subtitle">{reminder.text}</p>

        <form className="remind-dialog__form" onSubmit={handleSubmit}>
          <label className="remind-dialog__field">
            <span>Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="remind-dialog__field">
            <span>Time</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>

          <div className="remind-dialog__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Set Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
