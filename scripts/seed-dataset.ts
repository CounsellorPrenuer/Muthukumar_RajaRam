import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables manually
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach((line) => {
        const [key, value] = line.split('=')
        if (key && value) {
            process.env[key.trim()] = value.trim()
        }
    })
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const {
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
    NEXT_PUBLIC_SANITY_DATASET: dataset,
    SANITY_API_TOKEN: token,
} = process.env

if (!projectId || !token) {
    console.error('❌ Missing environment variables in .env.local')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset: dataset || 'production',
    token,
    useCdn: false,
    apiVersion: '2024-01-01',
})

async function uploadImage(filePath: string) {
    try {
        const file = fs.readFileSync(filePath)
        const asset = await client.assets.upload('image', file, {
            filename: path.basename(filePath),
        })
        return asset._id
    } catch (error) {
        console.error(`❌ Failed to upload image ${filePath}:`, error)
        return null
    }
}

async function seed() {
    console.log('🌱 Starting seeding process...')

    // 1. Upload Logo
    const logoPath = path.join(process.cwd(), 'public', 'logo.svg')
    const logoAssetId = await uploadImage(logoPath)

    // 2. Seed Site Configuration
    console.log('📝 Seeding Site Configuration...')
    await client.createOrReplace({
        _id: 'site-config',
        _type: 'site',
        title: 'Santosh',
        description: 'Scientific Career Clarity for Students & Professionals',
        // Logo is managed via Studio now
        primaryColor: '#2563eb', // blue-600
        primaryHoverColor: '#1d4ed8', // blue-700
    })

    // 3. Seed Navbar
    console.log('📝 Seeding Navbar...')
    await client.createOrReplace({
        _id: 'navbar-config',
        _type: 'navbar',
        links: [
            { _key: '1', label: 'Programs', href: '/programs' },
            { _key: '2', label: 'Dashboard', href: '/dashboard' },
            { _key: '3', label: 'Blog', href: '/blog' },
            { _key: '4', label: 'Contact', href: '/contact' },
        ],
    })

    // 4. Seed Home Page
    console.log('📝 Seeding Home Page...')
    const homePage = {
        _id: 'home-page',
        _type: 'page',
        title: 'Home',
        slug: { _type: 'slug', current: 'home' },
        sections: [
            {
                _key: 'hero-1',
                _type: 'heroSection',
                heading: 'Scientific Career Clarity for Students & Professionals',
                subheading: 'Santosh combines psychometrics, mentoring, and structured planning to align education, income potential, and long-term growth.',
                cta: {
                    text: 'View Programs',
                    link: '/programs',
                },
            },
        ],
    }
    await client.createOrReplace(homePage)

    console.log('✅ Seeding complete!')
}

seed().catch(console.error)
