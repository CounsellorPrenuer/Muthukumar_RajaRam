# Section Rendering Diagnostic Guide

## ✅ System Status

Your section rendering system is **fully configured** and should work correctly.

### Components Registered (10 sections):
- ✅ **heroSection** → HeroSection
- ✅ **aboutSection** → AboutSection  
- ✅ **serviceSection** → ServiceSection
- ✅ **contactSection** → ContactSection
- ✅ **footerSection** → FooterSection
- ✅ **testimonialSection** → TestimonialSection
- ✅ **featuresSection** → FeaturesSection
- ✅ **testimonialsSection** → TestimonialsSection
- ✅ **faqSection** → FAQSection
- ✅ **ctaSection** → CTASection

### Global Components:
- ✅ **Navbar** - Rendered in layout from `navigationBar` document
- ✅ **Theme Colors** - Loaded from `site` configuration

---

## 🔍 Troubleshooting: Why sections might not appear

### 1. Check if Page Document Exists
**In Sanity Studio (http://localhost:3333):**
1. Look for **"Page"** in the document list
2. Find or create a page with slug: **"home"** (for the homepage)
3. Verify the page has a **"Sections"** array field

### 2. Check if Sections Are Added to Page
**In the Page document:**
1. Click on the page (e.g., "Home")
2. Scroll to **"Sections"** array
3. Click **"Add item"** to add sections
4. Select section type (heroSection, aboutSection, etc.)
5. Fill in the section fields
6. **PUBLISH** the page

### 3. Common Issues

#### Issue: "No sections added to this page yet"
**Solution:** The page document exists but has an empty sections array.
- Open the page in Sanity Studio
- Add sections using the "Add item" button
- Publish the page

#### Issue: Yellow warning box appears on website
**Example:** "⚠️ Missing component for section type: mySection"
**Solution:** Section type name mismatch.
- Check the section `_type` in Sanity matches registry exactly
- Valid types: heroSection, aboutSection, serviceSection, contactSection, footerSection, testimonialSection, featuresSection, testimonialsSection, faqSection, ctaSection

#### Issue: Section renders but shows no content
**Solution:** Section fields are empty in Sanity.
- Edit the section in Sanity Studio
- Fill in all required fields (title, description, etc.)
- Publish the page

#### Issue: Navbar not showing
**Solution:** Create/publish navigationBar document.
1. In Sanity Studio, create a **"Navbar"** document
2. Add navigation links (label + href)
3. Publish it
4. Refresh Next.js site

#### Issue: Colors are wrong
**Solution:** Create/configure site document.
1. In Sanity Studio, create a **"Site Configuration"** document  
2. Set theme colors (hex codes like #667eea)
3. Publish it
4. Refresh Next.js site

---

## 📋 Step-by-Step: Create Your First Page

### In Sanity Studio (http://localhost:3333):

1. **Create Site Configuration** (if not exists)
   - Click "Create" → "Site Configuration"
   - Set logo text: "My Company"
   - Set colors (or leave defaults):
     - Primary: `#667eea`
     - Background: `#ffffff`
     - Surface: `#f8f9fa`
     - Text Primary: `#333333`
     - Text Secondary: `#666666`
     - Footer Background: `#1a1a1a`
   - Click **Publish**

2. **Create Navigation** (if not exists)
   - Click "Create" → "Navbar"
   - Add links:
     - Home: `/home`
     - About: `/about`
     - Contact: `/contact`
   - Click **Publish**

3. **Create Homepage**
   - Click "Create" → "Page"
   - Title: "Home"
   - Slug: `home`
   - Click **Publish**

4. **Add Sections to Homepage**
   - Open the "Home" page
   - Scroll to "Sections" array
   - Click **"Add item"** → Select **"Hero Section"**
     - Heading: "Welcome to Our Site"
     - Subheading: "We build amazing things"
     - Save
   - Click **"Add item"** → Select **"About Section"**
     - Title: "About Us"
     - Description: "We are a professional company..."
     - Save
   - Click **"Add item"** → Select **"Contact Section"**
     - Title: "Get In Touch"
     - Description: "We'd love to hear from you"
     - Email: contact@example.com
     - Form Title: "Send us a message"
     - Save
   - Click **"Add item"** → Select **"Footer Section"**
     - Company Name: "My Company"
     - Description: "Building the future"
     - Copyright: "© 2026 My Company"
     - Save
   - Click **Publish** at the top

5. **View Your Site**
   - Go to: http://localhost:3001/home
   - You should see all 4 sections rendered

---

## 🐛 Debug Mode

Enhanced error logging is now active. Check your terminal running Next.js for:

```
[Page: home] Fetched 4 sections: [ 'heroSection', 'aboutSection', 'contactSection', 'footerSection' ]
[Rendering] heroSection
[Rendering] aboutSection
[Rendering] contactSection
[Rendering] footerSection
```

If you see:
```
[RENDERING ERROR] No component found for section type: XYZ
```
Then "XYZ" is not in the registry. Check spelling matches exactly.

---

## 📊 Current Configuration

### Fetching Functions (lib/sanity.ts):
- ✅ `getPageBySlug(slug)` - Fetches page with all sections
- ✅ `getNavbar()` - Fetches navigationBar document
- ✅ `getSiteConfig()` - Fetches site configuration
- ✅ `getAllPageSlugs()` - For static generation

### Layout (app/layout.tsx):
- ✅ Loads Navbar globally
- ✅ Loads theme colors as CSS variables
- ✅ Injects CSS variables into body element

### Page Renderer (app/[slug]/page.tsx):
- ✅ Fetches page by slug
- ✅ Maps section types to components
- ✅ Renders sections in order
- ✅ Shows helpful error messages

---

## 🎯 Next Steps

1. **Open Sanity Studio**: http://localhost:3333
2. **Check if these documents exist:**
   - Site Configuration
   - Navbar
   - Page (with slug "home")
3. **If Page exists, verify it has sections added**
4. **If sections exist, verify they are PUBLISHED (not just saved as draft)**
5. **Check browser console and terminal for logs**
6. **Refresh Next.js site**: http://localhost:3001/home

---

## ✨ Expected Behavior

When everything is set up correctly:

1. **Every page** you create in Sanity appears at `/{slug}`
2. **Every section** you add to a page renders on the website
3. **Navbar** appears on all pages
4. **Theme colors** can be changed in Site Configuration
5. **No hardcoded content** - everything comes from Sanity
6. **Unknown section types** show yellow warning (doesn't break page)

If a section is published in Sanity but not appearing, check the terminal logs to see if it's being fetched.
