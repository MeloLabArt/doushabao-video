---
name: hydration-fix-i18n
description: Fix for Next.js hydration mismatch caused by i18next LanguageDetector running during SSR
metadata:
  type: reference
---

# Hydration Fix: i18n Language Detection in Next.js

**Problem**: Next.js hydration fails when i18next's `LanguageDetector` is registered during module-level init. The server always renders English (no detector), but the client immediately detects the user's locale (e.g., `zh-CN`) and switches before React hydrates, causing `<h1>所有项目</h1>` (client) vs `<h1>All projects</h1>` (server).

**Root Cause** in `i18n-provider.tsx`: The original code used `typeof window !== "undefined"` to conditionally register `LanguageDetector`. On the client, the detector ran **during module init**, changing the i18next language before React even started hydrating. This made all component renders use the detected language rather than the SSR language.

**Fix**:
1. Always initialize i18next with `lng: "en"` at module level — both server and client produce identical HTML.
2. Move `LanguageDetector` registration + detection to a `useEffect` in the `I18nProvider` component, which runs **after** React hydration is complete.
3. The detector is still registered so that `LanguageSwitcher.changeLanguage()` caches to localStorage.

**Code pattern**:
```tsx
"use client";

// Module level — always English for SSR/client match
if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        returnNull: false,
    });
}

export function I18nProvider({ children }) {
    useEffect(() => {
        // Post-hydration: detect user's language, enable localStorage caching
        i18n.use(LanguageDetector).init({
            detection: {
                order: ["localStorage", "navigator"],
                caches: ["localStorage"],
                lookupLocalStorage: "i18nextLng",
            },
        });
    }, []);
    return <>{children}</>;
}
```

**Why it works**: The `useEffect` boundary guarantees all SSR and first client render use English. Language only switches after hydration, triggering a re-render rather than a mismatch.
