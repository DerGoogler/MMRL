export function useCategory(input?: string) {
  const categories = ["Tools", "Boot", "manegment", "System", "Coding", "Apps", "Gaming", "Other"];

  if (!input) {
    return {
      category: "Other",
      validCategory: false,
    };
  }

  return {
    category: categories.indexOf(input) > -1 ? input : "Other",
    validCategory: categories.indexOf(input) > -1,
  };
}
