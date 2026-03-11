import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

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

const {
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
    NEXT_PUBLIC_SANITY_DATASET: dataset,
    SANITY_API_TOKEN: token,
} = process.env

if (!projectId || !token) {
    console.error('❌ Missing environment variables in .env.local. Make sure SANITY_API_TOKEN is set.')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset: dataset || 'production',
    token,
    useCdn: false,
    apiVersion: '2024-01-01',
})

async function clear() {
    console.log('🗑️ Starting dataset cleanup...')

    try {
        // Fetch all documents except system ones
        const query = '*[!(_id in path("system.**"))]._id'
        const ids = await client.fetch(query)

        if (ids.length === 0) {
            console.log('✅ Dataset is already empty.')
            return
        }

        console.log(`🧹 Deleting ${ids.length} documents...`)

        const transaction = client.transaction()
        ids.forEach((id: string) => transaction.delete(id))
        await transaction.commit()

        console.log('✅ Cleanup complete!')
    } catch (error) {
        console.error('❌ Failed to clear dataset:', error)
    }
}

clear().catch(console.error)
