export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\u0600-\u06FF]/g, (c) => c)        // فارسی رو نگه می‌داریم
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')     // فاصله/علامت → -
    .replace(/^-+|-+$/g, '');
}

export async function ensureUniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
) {
  let s = slugify(base) || 'instructor';
  let i = 1;
  while (await exists(s)) {
    i += 1;
    s = `${slugify(base)}-${i}`;
  }
  return s;
}
