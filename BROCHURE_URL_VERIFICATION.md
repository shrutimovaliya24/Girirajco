# Brochure URL Verification

## ✅ Current Setup

### Files Created:
1. **`app/brochure/page.tsx`** - Page route that redirects to PDF
2. **`next.config.ts`** - Contains redirect for `/brochure.pdf`
3. **`public/GIRIRAJ - SERVING GREEN HEAT.pdf`** - The actual PDF file

### URLs Available:

#### 1. `/brochure` (Page Route)
- **Local**: `http://localhost:3000/brochure`
- **Production**: `https://girirajco.com/brochure`
- **Method**: Next.js page route with server-side redirect
- **Status**: ✅ Should work after server restart

#### 2. `/brochure.pdf` (Config Redirect)
- **Local**: `http://localhost:3000/brochure.pdf`
- **Production**: `https://girirajco.com/brochure.pdf`
- **Method**: Next.js config redirect (301 permanent)
- **Status**: ✅ Should work

#### 3. Direct PDF Path
- **Local**: `http://localhost:3000/GIRIRAJ - SERVING GREEN HEAT.pdf`
- **Production**: `https://girirajco.com/GIRIRAJ - SERVING GREEN HEAT.pdf`
- **Method**: Direct file access from public folder
- **Status**: ✅ Always works

---

## 🔍 Testing Instructions

### Local Testing:

1. **Restart your development server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   # or
   yarn dev
   ```

2. **Test URLs in browser:**
   - Open: `http://localhost:3000/brochure`
   - Should redirect to: `http://localhost:3000/GIRIRAJ - SERVING GREEN HEAT.pdf`
   - PDF should open/download

3. **Test alternative URLs:**
   - `http://localhost:3000/brochure.pdf` → Should redirect
   - `http://localhost:3000/GIRIRAJ - SERVING GREEN HEAT.pdf` → Direct access

### Production/Hosted Testing:

After deployment to Vercel (or your hosting platform):

1. **Test URLs:**
   - `https://girirajco.com/brochure` → Should redirect to PDF
   - `https://girirajco.com/brochure.pdf` → Should redirect to PDF
   - `https://girirajco.com/GIRIRAJ - SERVING GREEN HEAT.pdf` → Direct access

2. **Verify redirects:**
   - Check browser network tab for 307/308 redirect status
   - Verify final destination is the PDF file

---

## 🛠️ Troubleshooting

### If `/brochure` returns 404:

1. **Check if server was restarted** after creating the page route
2. **Verify file exists**: `app/brochure/page.tsx`
3. **Clear Next.js cache**: Delete `.next` folder and restart
4. **Check console for errors**

### If redirect doesn't work:

1. **Verify PDF file exists**: `public/GIRIRAJ - SERVING GREEN HEAT.pdf`
2. **Check file permissions** (should be readable)
3. **Verify next.config.ts** redirects are correct
4. **Rebuild the project**: `npm run build`

---

## 📝 Code Summary

### `app/brochure/page.tsx`
```tsx
import { redirect } from 'next/navigation';

export default function BrochurePage() {
  redirect('/GIRIRAJ - SERVING GREEN HEAT.pdf');
}
```

### `next.config.ts` (relevant section)
```ts
{
  source: '/brochure.pdf',
  destination: '/GIRIRAJ - SERVING GREEN HEAT.pdf',
  permanent: true,
}
```

---

## ✅ Expected Behavior

### Local Development:
- `/brochure` → Redirects to PDF (307 redirect)
- `/brochure.pdf` → Redirects to PDF (301 redirect)
- Direct PDF path → Serves PDF file

### Production (Vercel/Hosted):
- All URLs work the same way
- Redirects are cached by CDN
- PDF is served with proper headers

---

## 🚀 Deployment Checklist

- [x] Page route created: `app/brochure/page.tsx`
- [x] Config redirect added: `next.config.ts`
- [x] PDF file exists: `public/GIRIRAJ - SERVING GREEN HEAT.pdf`
- [ ] Tested locally
- [ ] Tested in production after deployment

---

## 📞 Usage Examples

### In HTML:
```html
<a href="/brochure" download>Download Brochure</a>
<a href="https://girirajco.com/brochure.pdf" target="_blank">View Brochure</a>
```

### In React/Next.js:
```tsx
<Link href="/brochure">Get Brochure</Link>
<a href="/brochure.pdf" target="_blank">Open Brochure</a>
```

### For Sharing:
```
https://girirajco.com/brochure
https://girirajco.com/brochure.pdf
```

---

*Last Updated: 2025*
*Status: Ready for testing*

