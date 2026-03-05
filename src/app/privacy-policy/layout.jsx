import { Metadata } from "next";

export const metadata = {
  title: "Privacy Policy – HackByteCodex",
  description: "Learn how HackByteCodex collects, uses, and protects your personal information. We are committed to safeguarding your privacy while providing our event management platform.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR compliance",
    "user data",
    "personal information",
    "HackByteCodex privacy",
    "event platform privacy",
    "API platform privacy"
  ].join(", "),
  openGraph: {
    title: "Privacy Policy – HackByteCodex",
    description: "Your privacy matters. Learn how we protect your data on HackByteCodex.",
    url: "https://hackbytecodex.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyLayout({ children }) {
  return <>{children}</>;
}
