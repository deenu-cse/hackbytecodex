import { Metadata } from "next";

export const metadata = {
  title: "Refund and Cancellation Policy – HackByteCodex",
  description: "Learn about HackByteCodex refund policy, cancellation terms, and how to request refunds for event registrations and API subscriptions.",
  keywords: [
    "refund policy",
    "cancellation policy",
    "money back guarantee",
    "payment refund",
    "subscription cancellation",
    "Razorpay refund",
    "HackByteCodex refund"
  ].join(", "),
  openGraph: {
    title: "Refund and Cancellation Policy – HackByteCodex",
    description: "Clear and transparent refund policy for all HackByteCodex services.",
    url: "https://hackbytecodex.com/refund-policy",
    type: "website",
  },
};

export default function RefundPolicyLayout({ children }) {
  return <>{children}</>;
}
