import { Metadata } from "next";

export const metadata = {
  title: "Terms and Conditions – HackByteCodex",
  description: "Read the terms and conditions for using HackByteCodex platform. Understand your rights, responsibilities, and the rules governing our event management and API services.",
  keywords: [
    "terms and conditions",
    "user agreement",
    "service terms",
    "platform rules",
    "API terms",
    "payment terms",
    "HackByteCodex terms",
    "legal agreement"
  ].join(", "),
  openGraph: {
    title: "Terms and Conditions – HackByteCodex",
    description: "Terms governing your use of HackByteCodex platform and services.",
    url: "https://hackbytecodex.com/terms-conditions",
    type: "website",
  },
};

export default function TermsConditionsLayout({ children }) {
  return <>{children}</>;
}
