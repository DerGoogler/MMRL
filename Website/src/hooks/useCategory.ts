export function useFilterCategory(input?: string) {
  const categories = ["Tools", "Boot", "manegment", "System", "Coding", "Apps", "Gaming", "Other"];
  const input_array = input?.split(",");
  if (input_array) {
    return categories.filter((i) => input_array.indexOf(i) !== -1);
  } else {
    return [];
  }
}
