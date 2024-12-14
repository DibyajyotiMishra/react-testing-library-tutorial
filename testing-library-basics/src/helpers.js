export function kebabToTitleCase(colorName) {
  const colorWithSpaces = colorName.replace(/-/g, " ");
  const colorWithCapitals = colorWithSpaces.replace(/\b([a-z])/g, match =>
    match.toUpperCase()
  );
  return colorWithCapitals;
}
