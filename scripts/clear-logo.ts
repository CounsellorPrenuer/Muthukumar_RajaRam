import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2023-01-01',
})

async function clearLogo() {
    console.log('🧹 Clearing Logo from Sanity...')
    try {
        await client.patch('site-config')
            .unset(['logo', 'logoImage'])
            .commit()
        console.log('✅ Logo cleared successfully!')
    } catch (error) {
        console.error('❌ Failed to clear logo:', error.message)
    }
}

clearLogo()
