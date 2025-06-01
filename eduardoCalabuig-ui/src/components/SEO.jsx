import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function SEO({
  title,
  description = "Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades.",
  keywords = "Eduardo Calabuig, Diseño de Interiorismo, diseñador,  decoración minimalista, estilo ibizenco, espacios únicos, Dénia",
  endpoint = "",
  image = "/favIcon.webp",
  noIndex = false,
}) {
  const fullTitle = `Eduardo Calabuig · ${title}`;
  const fullUrl = `https://www.eduardocalabuig.com/${endpoint}`;

  return (
    <HelmetProvider>
      <Helmet>
        {/* Título dinámico */}
        <title>{fullTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Meta básicos */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Eduardo Calabuig" />
        <meta
          name="robots"
          content={noIndex ? "noindex, nofollow" : "index, follow"}
        />
        <link rel="canonical" href={fullUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={image} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    </HelmetProvider>
  );
}

export default SEO;
