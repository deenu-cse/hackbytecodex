import { Metadata } from "next";

export const metadata = {
  title: "Shipping and Delivery Policy – HackByteCodex",
  description: "Learn about HackByteCodex digital service delivery, API access provisioning, and event participation access timelines.",
  keywords: [
    "shipping policy",
    "delivery policy",
    "digital delivery",
    "service access",
    "API access",
    "event access"
  ].join(", "),
  openGraph: {
    title: "Shipping and Delivery Policy – HackByteCodex",
    description: "Digital service delivery and access provisioning information.",
    url: "https://hackbytecodex.com/shipping-delivery-policy",
    type: "website",
  },
};

export default function ShippingPolicyLayout({ children }) {
  return <>{children}</>;
}
