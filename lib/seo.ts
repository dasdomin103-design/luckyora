// SEO Schema markup generators for structured data

export function GameSchema(game: {
  id: string;
  title: string;
  description: string;
  rating: number;
  playCount: number;
  iframeUrl: string;
  thumbnail: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org/",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description,
    "image": game.thumbnail,
    "url": `https://luckyora.live/games/${game.id}`,
    "applicationCategory": game.category,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating.toString(),
      "ratingCount": Math.round(game.playCount / 100),
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "interactionCount": `${game.playCount} PlayAction`
  };
}

export function FAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export function BreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Luckyora",
    "url": "https://luckyora.live",
    "logo": "https://luckyora.live/logo.png",
    "description": "Free online games platform with 100+ HTML5 games",
    "sameAs": [],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "01, Jalaram Ashish, Dindayal Cross Rd, near St. Mary's School",
      "addressLocality": "Dombivli West",
      "addressRegion": "Maharashtra",
      "postalCode": "421202",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Support",
      "telephone": "+91-8269372112",
      "email": "support@luckyora.live"
    }
  };
}

export function GameMetaTags(game: {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}) {
  return {
    title: game.seoTitle,
    description: game.seoDescription,
    keywords: game.keywords.join(", "),
    openGraph: {
      title: game.seoTitle,
      description: game.seoDescription,
      url: `https://luckyora.live/games/${game.id}`,
      type: "website",
      images: [
        {
          url: game.thumbnail,
          width: 1200,
          height: 630,
          alt: game.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: game.seoTitle,
      description: game.seoDescription,
      image: game.thumbnail
    }
  };
}

export function CategoryMetaTags(category: string, gameCount: number) {
  const categoryTitles: Record<string, string> = {
    action: "Free Action Games Online",
    puzzle: "Free Puzzle Games Online",
    racing: "Free Racing Games Online",
    sports: "Free Sports Games Online",
    arcade: "Free Arcade Games Online",
    strategy: "Free Strategy Games Online"
  };

  const categoryDescriptions: Record<string, string> = {
    action: "Play exciting action games online. Featuring fast-paced gameplay and thrilling challenges.",
    puzzle: "Challenge your mind with our collection of free puzzle games online.",
    racing: "Experience high-speed racing games online. Compete and test your driving skills.",
    sports: "Play sports games online. Football, basketball, and more awaits you.",
    arcade: "Enjoy classic arcade games online. Nostalgic fun and modern gameplay.",
    strategy: "Strategic thinking games online. Plan, strategize, and conquer challenges."
  };

  return {
    title: `${categoryTitles[category] || "Games"} | Luckyora`,
    description: categoryDescriptions[category] || "Play free online games",
    keywords: `${category} games online, free ${category} games, best ${category} games, play ${category} games online`
  };
}

export function BlogPostSchema(post: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.publishedDate,
    "dateModified": post.modifiedDate,
    "author": {
      "@type": "Organization",
      "name": "Luckyora",
      "logo": {
        "@type": "ImageObject",
        "url": "https://luckyora.live/logo.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Luckyora",
      "logo": {
        "@type": "ImageObject",
        "url": "https://luckyora.live/logo.png"
      }
    }
  };
}
