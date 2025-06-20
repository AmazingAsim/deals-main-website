function usetransformAmazonData(amazonData) {
  // Extract items from Amazon data
  const amazonItems = amazonData.SearchResult?.Items || [];
  
  // Transform and filter items
  return amazonItems
    .map(item => {
      // Get the first available price (prioritize listings over summaries)
      let priceData = null;
      if (item.Offers?.Listings?.[0]?.Price) {
        priceData = item.Offers.Listings[0].Price;
      } else if (item.Offers?.Summaries?.[0]?.LowestPrice) {
        priceData = item.Offers.Summaries[0].LowestPrice;
      }

      // Determine original price (if there are savings)
      let originalPrice = priceData?.Amount?.toString();
      let sellingPrice = originalPrice;
      if (priceData?.Savings) {
        originalPrice = (priceData.Amount + priceData.Savings.Amount).toString();
      }

      return {
        id: item.ASIN,
        name: item.ItemInfo?.Title?.DisplayValue || 'No title available',
        selling_price: sellingPrice || "",
        original_price: originalPrice || sellingPrice || "",
        currency: priceData?.Currency || "USD",
        category: item.ItemInfo?.Classifications?.ProductGroup?.DisplayValue || "Electronics",
        sub_category: item.ItemInfo?.Classifications?.Binding?.DisplayValue || "Mobile Devices",
        product_link: item.DetailPageURL,
        description: item.ItemInfo?.Title?.DisplayValue || '',
        image: item.Images?.Primary?.Medium?.URL || item.Images?.Primary?.Small?.URL || '',
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        store_name: "Amazon"
      };
    })
    .filter(item => {
      // Filter out items without a price AND grocery items
      const isGrocery = item.category.toLowerCase().includes('grocery') || 
                        item.category.toLowerCase().includes('food');
      return item.selling_price !== "" && !isGrocery;
    });
}

export default usetransformAmazonData;