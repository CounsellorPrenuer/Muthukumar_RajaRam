# Image Support Guide

## ✅ Image System Implemented

All images are now CMS-driven and editable via Sanity Studio.

---

## 📸 Sections with Image Support

### 1. Hero Section
**Field:** `Background Image`
- **Type:** Full-width background image
- **Optimal Size:** 1920x800px
- **Usage:** Sets the visual tone for the page
- **Fallback:** Purple gradient if no image provided
- **Has Alt Text:** ✅

### 2. About Section  
**Field:** `Image`
- **Type:** Side-by-side with content
- **Optimal Size:** 800x600px
- **Usage:** Optional visual to accompany about text
- **Fallback:** Text takes full width if no image
- **Has Alt Text:** ✅

### 3. Service Section
**Field:** `Icon/Image` (per service card)
- **Type:** Card header image
- **Optimal Size:** 400x300px
- **Usage:** Optional icon or image for each service
- **Fallback:** Service cards work without images
- **Has Alt Text:** ✅

### 4. Contact Section
**Field:** `Background Image`
- **Type:** Subtle background with overlay
- **Optimal Size:** 1600x900px
- **Usage:** Optional decorative background
- **Fallback:** Solid surface color if no image
- **Has Alt Text:** ✅

---

## 🎨 How to Add/Edit Images in Sanity

### Step 1: Open Sanity Studio
Navigate to: http://localhost:3333

### Step 2: Edit Your Page
1. Click on your **Page** document (e.g., "Home")
2. Scroll to the **Sections** array
3. Find the section you want to add an image to

### Step 3: Upload Image
1. Click the **image field** (e.g., "Background Image", "Image", "Icon/Image")
2. Click **Upload** or drag and drop an image
3. **Important:** Fill in the **Alt Text** field for accessibility
4. Adjust the **hotspot** (the focal point of the image)
5. Click **Publish**

### Step 4: View Changes
Refresh your Next.js site: http://localhost:3001/home

---

## 🔧 Technical Details

### Image Processing
- **CDN:** Sanity CDN (cdn.sanity.io)
- **Optimization:** Automatic resizing and format optimization
- **Component:** Next.js `<Image>` component for better performance
- **Lazy Loading:** Automatic

### URL Building
Images are processed through Sanity's image URL builder:
```typescript
import { urlForImage } from '@/lib/sanity'

const imageUrl = urlForImage(image)
  .width(800)
  .height(600)
  .url()
```

### Accessibility
All images require alt text for:
- Screen readers
- SEO
- Better user experience when images fail to load

---

## 💡 Best Practices

### Image Sizes
- **Hero backgrounds:** 1920x800px (landscape)
- **About images:** 800x600px (landscape/portrait)
- **Service icons:** 400x300px or square (400x400px)
- **Contact backgrounds:** 1600x900px (landscape)

### File Formats
- **Photos:** JPG (smaller file size)
- **Graphics/Logos:** PNG (transparency support)
- **SVG:** Not currently supported, use PNG instead

### Image Guidelines
- ✅ Use professional, high-quality images
- ✅ Keep file sizes reasonable (< 500KB when possible)
- ✅ Use relevant images that enhance content
- ✅ Always fill in alt text
- ❌ Don't use generic stock photos
- ❌ Don't overwhelm pages with too many images
- ❌ Don't use images with embedded text (bad for accessibility)

---

## 🚀 What Changed

### Sanity Schemas Updated
1. **heroSection.ts** - Added alt text to backgroundImage
2. **aboutSection.ts** - Added alt text to image, made optional
3. **serviceSection.ts** - Added icon/image field to each service item
4. **contactSection.ts** - Added optional backgroundImage field

### Frontend Components Updated
1. **HeroSection.tsx** - Uses Sanity image URL builder, gradient fallback
2. **AboutSection.tsx** - Uses Next.js Image component, responsive layout
3. **ServiceSection.tsx** - Renders service icons when provided
4. **ContactSection.tsx** - Optional background with overlay

### New Utilities
- **lib/sanity.ts** - Added `urlForImage()` helper function
- **Package:** Installed `@sanity/image-url` for image URL building

---

## 🎯 Testing Checklist

- [ ] Upload image in Sanity Studio
- [ ] Add alt text to image
- [ ] Publish the page
- [ ] Refresh Next.js site
- [ ] Verify image appears correctly
- [ ] Test page without images (should still work)
- [ ] Check responsive behavior on mobile
- [ ] Verify alt text is present in HTML (inspect element)

---

## 🆘 Troubleshooting

### Image not appearing
1. **Check if image is published** - Drafts don't appear on live site
2. **Check browser console** for errors
3. **Verify alt text is filled in** (optional but recommended)
4. **Check Next.js terminal** for image loading errors

### Image looks distorted
1. **Adjust hotspot** in Sanity Studio
2. **Use recommended dimensions** (see Image Sizes above)
3. **Check aspect ratio** matches component expectations

### Slow loading
1. **Reduce image file size** before uploading
2. **Use JPG instead of PNG** for photos
3. **Sanity CDN automatically optimizes** - give it a moment

---

## 📝 Summary

Your image system is production-ready:
- ✅ All images are CMS-controlled
- ✅ No hardcoded image paths
- ✅ Accessibility compliant (alt text)
- ✅ Performance optimized (Next.js Image + Sanity CDN)
- ✅ Responsive and professional
- ✅ Graceful fallbacks when images missing

Add images where they enhance content, not everywhere.
