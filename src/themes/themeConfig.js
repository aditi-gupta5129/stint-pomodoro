export const THEME_STORAGE_KEY = "planner-app-theme";

export const THEMES = [
  { id: "classic", label: "Classic (Dark)" },
  { id: "gwen", label: "Gwen Stacy" },
  { id: "spiderman", label: "Spider-Man" },
  { id: "minimal", label: "Minimal Beige" },
];

export function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && THEMES.some((t) => t.id === saved)) return saved;
  } catch {
    /* ignore */
  }
  return "classic";
}

export function saveTheme(themeId) {
  localStorage.setItem(THEME_STORAGE_KEY, themeId);
}
