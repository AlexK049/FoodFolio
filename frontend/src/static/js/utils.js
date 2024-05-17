export function cleanRestaurant(restaurant) {
    // Create a new object or clone the existing one
    const cleanedRestaurant = { ...restaurant };

    // Make rating a whole number for this implementation
    cleanedRestaurant.rating = Math.round(cleanedRestaurant.rating);

    // Clean up the name to remove excess IDs (names that end with WCID.* or #.*)
    cleanedRestaurant.name = cleanedRestaurant.name.replace(/(\(WCID|\#).*$/, '').trim();

    return cleanedRestaurant;
}