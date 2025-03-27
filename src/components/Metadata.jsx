export default function Metadata({title}) {
    return (
      <>
        <title>{title}</title>
        <meta name="description" content="Your page description for SEO." />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Name or Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-Frame-Options" content="deny"/>

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content="A brief description for social media." />
        <meta property="og:image" content="https://yourwebsite.com/image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/your-page" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Page Title" />
        <meta name="twitter:description" content="Your Twitter description." />
        <meta name="twitter:image" content="https://yourwebsite.com/image.jpg" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
  
        {/* Favicon & Apple Touch Icons */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
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
  