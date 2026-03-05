import { Metadata } from "next";

export const metadata = {
  title: "Contact Us – HackByteCodex",
  description: "Get in touch with HackByteCodex support team. We're here to help with any questions about our event management platform and API services.",
  keywords: [
    "contact us",
    "customer support",
    "help desk",
    "HackByteCodex contact",
    "support email",
    "technical support"
  ].join(", "),
  openGraph: {
    title: "Contact Us – HackByteCodex",
    description: "Get in touch with our support team. We're here to help!",
    url: "https://hackbytecodex.com/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
