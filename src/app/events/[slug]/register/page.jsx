import { notFound } from "next/navigation";
import { RegisterClient } from "./RegisterClient";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  return {
    title: `Event Registration | HackByteCodex`,
    description: `Register for this amazing event on HackByteCodex`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function RegisterPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <Script
        id="registration-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RegisterAction",
            name: "Event Registration",
            object: {
              "@type": "Event",
              url: `https://hackbytecodex.com/events/${slug}`,
            },
          }),
        }}
      />
      <RegisterClient slug={slug} />
    </>
  );
}