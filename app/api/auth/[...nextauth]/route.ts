// ❗️جلوگیری از هرگونه pre-render/collect در مرحله Build
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
// ❗️NextAuth روی Edge گاهی مشکل می‌دهد؛ صراحتاً Node.js اجرا شود
export const runtime = 'nodejs';

import NextAuth from "next-auth";
import authOptions from "@/lib/auth";

// هندلر واحد برای GET/POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
