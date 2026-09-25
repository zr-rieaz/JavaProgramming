/**
 * Safe browser utilities for cross-origin iframe environments (e.g. AI Studio)
 * Prevents Uncaught SecurityError and clipboard/storage access exceptions.
 */

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Cross-origin iframe or disabled storage
    }
    return null;
  },

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Cross-origin iframe or quota exceeded
    }
  },

  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Cross-origin iframe
    }
  },
};

/**
 * Copies text safely even in sandboxed or cross-origin iframes without clipboard permissions.
 */
export async function copyTextSafely(text: string): Promise<boolean> {
  if (!text) return true;

  // 1. Try modern navigator.clipboard API
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Falls through to fallback if SecurityError or NotAllowedError occurs
  }

  // 2. Fallback using temporary textarea execCommand
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    textArea.style.opacity = "0";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}
