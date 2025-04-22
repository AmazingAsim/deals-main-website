export default function Metadata({title}) {
    return (
      <>
        <title>{`Deals From America`}</title>
        <meta name="description" content="Find the best deals in America on your favorite products at our website." />
        <meta name="keywords" content="laptops, smartphones, tablets, accessories,shoes, clothing, electronics, american deals" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="sri sai Kumar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-Frame-Options" content="deny"/>

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content='Deals From America' />
        <meta property="og:description" content="Get the best deals in America on your favorite products." />
        <meta property="og:image" content="https://yourwebsite.com/image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/your-page" />
        <meta property="og:type" content="website" />
        
        
        {/* Favicon & Apple Touch Icons */}
        <link rel="icon" href="../assets/favicon.webp" type="image/x-icon" />
        <link rel="apple-touch-icon" href="../assets/favicon.webp" />
  
        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com/your-page" />
  
        {/* Schema Markup for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Website",
            "name": "Your Website Name",
            "url": "https://yourwebsite.com",
            "description": "A detailed description of your website."
          })}
        </script>
      </>
    );
  }
  