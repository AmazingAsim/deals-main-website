<?php
$id = $_GET['id'] ?? '';
$store = isset($_GET['store']) ? $_GET['store'] : null;

if (!$id) {
    header("HTTP/1.0 404 Not Found");
    echo "Product not found.";
    exit;
}

// Determine the API endpoint based on store parameter
$apiUrl = $store 
    ? "https://dealsfromamerica.com/product_api/amazon/get-product-by-id.php?id=$id"
    : "https://dealsfromamerica.com/product_api/get-product-by-id.php?id=$id";

$json = file_get_contents($apiUrl);
$product = json_decode($json);

if (!$product || !isset($product->name)) {
    header("HTTP/1.0 404 Not Found");
    echo "Product not found.";
    exit;
}

// Image handling
$imageBase = "https://dealsfromamerica.com/employee/uploads/products";
$productImage = $store ? $product->image : $imageBase . '/' . str_replace(' ', '%20', $product->image);
$thumbnailImage = $store ? $product->thumbnail : $imageBase . '/' . str_replace(' ', '%20', $product->image);

// Deal calculations
$discount = ($product->original_price != 0) 
    ? (($product->original_price - $product->selling_price) / $product->original_price) * 100 
    : 0;
$formattedDiscount = number_format($discount, 2);
$dealType = $discount > 60 ? 'Excellent Deal' : ($discount > 30 ? 'Hot Deal' : '');

// Date formatting
$timeInEst = date_create($product->created_at, timezone_open('America/New_York'))
    ->format('F j, Y g:i a T');

// WhatsApp share text
$whatsappText = urlencode(
    "Check out this product: {$product->name}\n" .
    "Sale Price: *" . ($product->currency === 'INR' ? '₹' : '$') . "{$product->selling_price}*\n" .
    "Original Price: *" . ($product->currency === 'INR' ? '₹' : '$') . "{$product->original_price}*\n" .
    "https://dealsfromamerica.com/product-details/$id"
);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?= htmlspecialchars($product->name) ?> | Deals From America</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?= htmlspecialchars(substr($product->description, 0, 150)) ?>" />
  
  <!-- Canonical & OG -->
  <link rel="canonical" href="https://dealsfromamerica.com/product-details.php?id=<?= $id ?>" />
  <meta property="og:title" content="<?= htmlspecialchars($product->name) ?>" />
  <meta property="og:description" content="<?= htmlspecialchars(substr($product->description, 0, 150)) ?>" />
  <meta property="og:image" content="<?= $thumbnailImage ?>" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://dealsfromamerica.com/product-details.php?id=<?= $id ?>" />
  <meta property="og:type" content="product" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="<?= htmlspecialchars($product->name) ?>" />
  <meta name="twitter:description" content="<?= htmlspecialchars(substr($product->description, 0, 150)) ?>" />
  <meta name="twitter:image" content="<?= $productImage ?>" />

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body class="bg-light">
  <!-- Social Share Buttons -->
  <div class="d-flex gap-5 justify-content-end p-3 px-5">
    <a href="https://www.facebook.com/sharer/sharer.php?u=<?= urlencode("https://dealsfromamerica.com/product-details/$id") ?>" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-facebook fs-4 text-primary"></i>
    </a>
    <a href="https://twitter.com/intent/tweet?url=<?= urlencode("https://dealsfromamerica.com/product-details/$id") ?>" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-twitter fs-4 text-info"></i>
    </a>
    <a href="https://api.whatsapp.com/send?text=<?= $whatsappText ?>" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-whatsapp fs-4 text-success"></i>
    </a>
    <a href="https://www.reddit.com/submit?url=<?= urlencode("https://dealsfromamerica.com/product-details/$id") ?>" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-reddit fs-4 text-danger"></i>
    </a>
    <a href="https://telegram.me/share/url?url=<?= urlencode("https://dealsfromamerica.com/product-details/$id") ?>" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-telegram fs-4 text-primary"></i>
    </a>
  </div>

  <div class="container my-5">
    <div class="row">
      <div class="col-md-4">
        <img 
          src="<?= $productImage ?>" 
          class="img-fluid rounded" 
          alt="<?= htmlspecialchars($product->name) ?>" 
          style="object-fit: cover; <?= $store ? 'width: 70%' : 'width: 100%' ?>"
        />
      </div>
      <div class="col-md-8">
        <h1><?= htmlspecialchars($product->name) ?></h1>
        <p>Category: <?= htmlspecialchars($product->category) ?></p>
        <p>Store: <?= htmlspecialchars($product->store_name ?? 'Amazon.com') ?></p>
        <?php if (!$store): ?>
          <p>Posted on: <?= $timeInEst ?></p>
        <?php endif; ?>
        <p><?= htmlspecialchars($product->description) ?></p>
        <hr />
        <h4>
          <span><?= $formattedDiscount ?>% <?= $dealType ?></span>
          <br /> 
          <?= $product->selling_price ?> <?= $product->currency ?>
        </h4>
        <i class="ms-3"><s><?= $product->original_price ?> <?= $product->currency ?></s></i> <br />
        <a href="<?= $product->product_link ?>" target="_blank" rel="noreferrer" class="btn btn-primary">Buy Now</a>
      </div>
    </div>
  </div>

  <script>
  // Wait 1 second, then redirect to the React frontend route
  setTimeout(() => {
    const id = "<?= $id ?>";
    const store = "<?= $store ?>";
    let newUrl = `/product-details/${id}`;
    if (store) {
      newUrl += `/${store}`;
    }
    window.location.href = newUrl;
  }, 5000); // 1000ms = 1 second
</script>

  
  <!-- Bootstrap JS (optional, for modal etc.) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>