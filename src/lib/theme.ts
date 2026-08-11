export const THEME_STORAGE_KEY = "theme";

export const themes = ["system", "light", "dark"] as const;

export type Theme = (typeof themes)[number];

export function isTheme(value: unknown): value is Theme {
  return themes.includes(value as Theme);
}

export function getNextTheme(current: Theme): Theme {
  const index = themes.indexOf(current);
  return themes[(index + 1) % themes.length]!;
}

export function themeLabel(theme: Theme): string {
  switch (theme) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    default:
      return "System";
  }
}

/**
 * Inline script — set data-theme before paint to avoid flash.
 * Also enables CSS view transitions when the feature class is desired
 * (html gets .vt-enabled from layout when pageTransitions is on).
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"&&t!=="system")t="system";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","system");}})();`;
