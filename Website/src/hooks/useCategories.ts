export function useCategories(input?: arr<str>) {
  const categories = ["Tools", "Boot", "Coding", "Configurable", "Manegment", "System", "Apps", "Gaming", "Other"];
  if (input) {
    return categories.filter((i) => input.indexOf(i) !== -1);
  } else {
    return [];
  }
}
