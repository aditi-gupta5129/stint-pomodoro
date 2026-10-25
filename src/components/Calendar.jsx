import { MONTHS, WEEKDAYS, toDateKey, isSameDay } from "../utils/dateUtils";

export default function Calendar({
  year,
  month,
  days,
  today,
  data,
  onMonthChange,
  onYearChange,
  onDateClick,
  isZoomed,
}) {
  const years = Array.from({ length: 11 }, (_, i) => today.getFullYear() - 5 + i);

  return (
    <div className={`calendar ${isZoomed ? "calendar--zoomed" : ""}`}>
      <header className="calendar__header">
        <div className="calendar__controls">
          <select
            className="calendar__select"
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            aria-label="Select month"
          >
            {MONTHS.map((name, i) => (
              <option key={name} value={i}>
                {name}
              </option>
            ))}
          </select>
          <select
            className="calendar__select calendar__select--year"
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            aria-label="Select year"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <h2 className="calendar__title">
          {MONTHS[month]} {year}
        </h2>
      </header>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((d) => (
          <span key={d} className="calendar__weekday">
            {d}
          </span>
        ))}
      </div>

      <div className="calendar__grid">
        {days.map(({ date, isCurrentMonth }) => {
          const key = toDateKey(date);
          const tasks = data.tasks[key] ?? [];
          const reminders = data.reminders[key] ?? [];
          const pendingTasks = tasks.filter((t) => !t.done).length;
          const hasReminders = reminders.length > 0;

          return (
            <button
              key={key + (isCurrentMonth ? "" : "-pad")}
              type="button"
              className={[
                "calendar__day",
                !isCurrentMonth && "calendar__day--outside",
                isSameDay(date, today) && "calendar__day--today",
                (pendingTasks > 0 || hasReminders) && "calendar__day--has-items",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onDateClick(key, date)}
            >
              <span className="calendar__day-num">{date.getDate()}</span>
              {(pendingTasks > 0 || hasReminders) && (
                <span className="calendar__dots">
                  {pendingTasks > 0 && <span className="calendar__dot calendar__dot--task" />}
                  {hasReminders && <span className="calendar__dot calendar__dot--reminder" />}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
