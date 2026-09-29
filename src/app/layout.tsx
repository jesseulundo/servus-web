import type { ReactNode } from "react";

// The <html> element lives in app/[locale]/layout.tsx so `lang` is always correct.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
