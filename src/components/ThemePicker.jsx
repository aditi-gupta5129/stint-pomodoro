import { THEMES } from "../themes/themeConfig";

export default function ThemePicker({ value, onChange }) {
  return (
    <label className="theme-picker">
      <span className="theme-picker__label">Theme</span>
      <select
        className="theme-picker__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Choose app theme"
      >
        {THEMES.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
    </label>
  );
}
