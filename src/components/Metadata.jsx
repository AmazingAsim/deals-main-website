import { Helmet } from "react-helmet-async";
import logo from '../assets/logo.png';
export default function Metadata({ title, productimage }) {
  const defaultTitle = title ? title : 'Deals From America - Find the best deals in America on popular products';
  const defaultDescription = 'DealsfromAmerica.com is your go-to website for finding you best online deals, coupons, promotions and special offers from popular US stores in real time!';
  const defaultImage = productimage || 'https://dealsfromamerica.com/logo.png';
  const siteUrl = 'https://dealsfromamerica.com';

  return (
    <Helmet>
      <title>{defaultTitle}</title>
      {/* Favicon - use absolute path */}
      <link rel="shortcut icon" href={logo} type="image/x-icon" />
      <link rel="apple-touch-icon" href={defaultImage} />
      
      {/* Basic Meta Tags */}
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content="deals from america,deals in america,deals of america,america deals,find the latest deals in america,'deals on laptops', 'deals on smartphones', 'deals on tablets', 'deals on accessories', 'deals on shoes', 'deals on clothing', 'deals on electronics', 'find the latest deals in america on laptops, smartphones, tablets, accessories, shoes, clothing, electronics, american deals" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="sri sai Kumar" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-Frame-Options" content="deny" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Deals From America" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image" content={defaultImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Schema Markup for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Website",
          "name": "Deals From America",
          "url": siteUrl,
          "image": defaultImage,
          "description": defaultDescription,
        })}
      </script>
    </Helmet>
  );
}