'use client';

import { useEffect, useRef, useState } from 'react';
import HoverCard from '@/components/HoverCard';

type Locale = 'en' | 'fa';
type Initial = {
  name: string;
  email: string;
  city: string;
  postcode: string;
  address: string;
  phone: string;
  bio: string;
  rating: number | null;
  verified: boolean;
  // avatarUrl دیگر از فرم حذف شد؛ در آپلود ست می‌شود
};

export default function ProfileForm({
  locale,
  initial,
}: {
  locale: Locale;
  initial: Initial;
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  // ── فرم
  const [name, setName] = useState(initial.name);
  const [email] = useState(initial.email);
  const [city, setCity] = useState(initial.city);
  const [postcode, setPostcode] = useState(initial.postcode);
  const [address, setAddress] = useState(initial.address);
  const [phone, setPhone] = useState(initial.phone);
  const [bio, setBio] = useState(initial.bio);

  // ── آواتار
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // اگر قبلاً آپلود شده باشد می‌توانی همین‌جا مقدار اولیه بدهی (اختیاری)
  useEffect(() => {
    // اگر مسیر آواتار را از سرور داری، این‌جا setAvatarUrl کن
  }, []);

  // ── نوتیفیکیشن
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('pref_notify') : null;
    setNotifyEnabled(saved === '1');
  }, []);

  const label = (fa: string, en: string) => (locale === 'fa' ? fa : en);

  const input =
    'w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 h-11 outline-none placeholder:text-foreground/40';
  const textArea =
    'w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 p-4 outline-none placeholder:text-foreground/40 min-h-[120px]';
  const cta =
    'relative w-full md:w-auto h-11 rounded-xl text-white font-medium ring-1 ring-white/10 overflow-hidden backdrop-blur-md shadow-[0_0_18px_rgba(56,189,248,.35)] transition hover:brightness-110 active:brightness-95 px-5';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, city, postcode, address, phone, bio }),
    });
    if (!res.ok) {
      alert(locale === 'fa' ? 'خطا در ذخیره' : 'Save failed');
      return;
    }
    alert(locale === 'fa' ? 'ذخیره شد' : 'Saved');
  }

  async function onPickAvatar(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/profile/avatar', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'upload failed');
      // cache-bust
      setAvatarUrl(`${json.url}?t=${Date.now()}`);
    } catch (e: any) {
      alert(e.message || (locale === 'fa' ? 'آپلود ناموفق' : 'Upload failed'));
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) onPickAvatar(f);
  }

  async function toggleNotify() {
    if (notifyEnabled) {
      localStorage.setItem('pref_notify', '0');
      setNotifyEnabled(false);
      return;
    }
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert(locale === 'fa' ? 'مرورگر شما نوتیفیکیشن را پشتیبانی نمی‌کند.' : 'Notifications not supported.');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      localStorage.setItem('pref_notify', '1');
      setNotifyEnabled(true);
      // نمونه نوتیفیکیشن
      new Notification('👍', {
        body: locale === 'fa' ? 'اعلان فعال شد.' : 'Notifications enabled.',
      });
    }
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <HoverCard className="w-full p-5 sm:p-7 lg:p-9">
        <form dir={dir} onSubmit={onSubmit} className="space-y-6">
          {/* هدر + آواتار با دکمه Edit */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="h-16 w-16 rounded-full ring-1 ring-white/10 object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full ring-1 ring-white/10 bg-white/10 flex items-center justify-center text-lg font-semibold">
                  {name?.trim()?.[0]?.toUpperCase() || email[0]?.toUpperCase()}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 text-xs px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur ring-1 ring-white/20"
              >
                {uploading ? (locale === 'fa' ? 'درحال…' : '…') : label('ادیت', 'Edit')}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="text-sm opacity-80">
              <div className="font-semibold">{label('پروفایل شما', 'Your profile')}</div>
              <div className="opacity-70">{email}</div>
            </div>
          </div>

          {/* گرید اصلی */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* اطلاعات حساب */}
            <div className="lg:col-span-3 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm opacity-80">{label('نام', 'Name')}</label>
                  <input className={input} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-2 text-sm opacity-80">Email</label>
                  <input className={`${input} opacity-60`} value={email} disabled />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm opacity-80">{label('شهر', 'City')}</label>
                  <input className={input} value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-2 text-sm opacity-80">{label('کُد پستی', 'Postcode')}</label>
                  <input className={input} value={postcode} onChange={(e) => setPostcode(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm opacity-80">{label('آدرس', 'Address')}</label>
                <input className={input} value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div>
                <label className="block mb-2 text-sm opacity-80">{label('تلفن', 'Phone')}</label>
                <input className={input} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div>
                <label className="block mb-2 text-sm opacity-80">{label('بیوگرافی', 'Bio')}</label>
                <textarea className={textArea} value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>

              <button type="submit" className={cta}>
                {locale === 'fa' ? 'ذخیره' : 'Save'}
              </button>
            </div>

            {/* وضعیت/ترجیحات */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 p-4">
                <div className="text-sm opacity-80 mb-2">{label('ترجیحات', 'Preferences')}</div>
                <div className="text-xs opacity-70">
                  {label('تم و زبان از هدر قابل تغییر است.', 'Switch language & theme from the header.')}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm items-center">
                  <div className="opacity-70">{label('وضعیت مربی', 'Instructor status')}</div>
                  <div className="text-right">{initial.verified ? label('تأیید شده', 'Verified') : label('تأیید نشده', 'Not verified')}</div>

                  <div className="opacity-70">{label('امتیاز', 'Rating')}</div>
                  <div className="text-right">{initial.rating ?? '—'}</div>

                  <div className="opacity-70">{label('نوتیفیکیشن مرورگر', 'Browser notifications')}</div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={toggleNotify}
                      className={`px-3 py-1 rounded-lg ring-1 ring-white/10 ${notifyEnabled ? 'bg-emerald-500/30' : 'bg-white/10'}`}
                    >
                      {notifyEnabled ? label('فعال', 'On') : label('غیرفعال', 'Off')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 p-4 text-sm opacity-80">
                {label('آواتار را از دکمه‌ی ادیت کنار عکس تغییر بده.', 'Use the Edit button on avatar to upload a photo.')}
              </div>
            </div>
          </div>
        </form>
      </HoverCard>
    </section>
  );
}
