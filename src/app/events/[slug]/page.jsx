import { notFound } from "next/navigation";
import { EventDetailClient } from "./EventDetailClient";
import Script from "next/script";

async function getEvent(slug) {
    console.log('slsi', slug)
    try {
        const res = await fetch(`${process.env.API_URL}/user/events/${slug}`, {
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error("Failed to fetch event");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}

// Generate static params for popular events ---------------xxxxxxxxxx--------------- IMPORTANT AHI KARANA HAI ISE
export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const eventData = await getEvent(slug);

    if (!eventData || !eventData.success) {
        return {
            title: "Event Not Found | HackByteCodex",
            description: "The event you are looking for does not exist or has been removed.",
        };
    }

    const event = eventData.data;
    const imageUrl = event.banners?.[0]?.url || "https://hackbytecodex.com/default-event.jpg";

    return {
        title: `${event.title} | ${event.college?.collegeName || 'HackByteCodex'}`,
        description: event.description?.slice(0, 160) || "Join this amazing tech event on HackByteCodex.",
        keywords: [
            event.eventType,
            event.college?.collegeName,
            "hackathon",
            "tech event",
            "student competition",
            "coding event"
        ].filter(Boolean).join(", "),

        openGraph: {
            title: event.title,
            description: event.description?.slice(0, 200),
            type: "article",
            publishedTime: event.createdAt,
            modifiedTime: event.updatedAt,
            authors: [event.createdBy?.fullName],
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                },
            ],
            locale: "en_US",
            siteName: "HackByteCodex",
        },

        twitter: {
            card: "summary_large_image",
            title: event.title,
            description: event.description?.slice(0, 200),
            images: [imageUrl],
            creator: "@hackbytecodex",
        },

        alternates: {
            canonical: `https://hackbytecodex.com/events/${event.slug}`,
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function EventDetailPage({ params }) {
    const { slug } = await params;
    const eventData = await getEvent(slug);

    if (!eventData || !eventData.success) {
        notFound();
    }

    const event = eventData.data;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.description,
        image: event.banners?.map(b => b.url) || [],
        startDate: event.startDate,
        endDate: event.endDate,
        eventStatus:
            event.status === "COMPLETED"
                ? "https://schema.org/EventCompleted"
                : "https://schema.org/EventScheduled",
        eventAttendanceMode: event.mode === "ONLINE" ? "https://schema.org/OnlineEventAttendanceMode" :
            event.mode === "OFFLINE" ? "https://schema.org/OfflineEventAttendanceMode" :
                "https://schema.org/MixedEventAttendanceMode",
        location: event.mode !== "ONLINE" ? {
            "@type": "Place",
            name: event.location || event.college?.collegeName,
            address: {
                "@type": "PostalAddress",
                addressLocality: event.location,
            }
        } : {
            "@type": "VirtualLocation",
            url: "https://hackbytecodex.com/events/" + event.slug
        },
        organizer: {
            "@type": "Organization",
            name: event.college?.collegeName || event.club?.clubName || "HackByteCodex",
            url: `https://hackbytecodex.com/colleges/${event.college?.collegeId}`
        },
        offers: {
            "@type": "Offer",
            url: `https://hackbytecodex.com/events/${event.slug}/register`,
            price: event.registration?.fee || "0",
            priceCurrency: "INR",
            availability: event.registration?.isOpen ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            validFrom: event.createdAt,
        },
        performer: event.createdBy ? {
            "@type": "Person",
            name: event.createdBy.fullName,
            image: event.createdBy.avatar,
        } : undefined,
    };

    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <EventDetailClient event={event} />
        </>
    );
}