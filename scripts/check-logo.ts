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

async function checkLogo() {
    console.log('🔍 Checking Logo in Sanity...')
    const data = await client.fetch('*[_type == "site"][0]{logo, logoImage}')
    console.log('📊 Result:', JSON.stringify(data, null, 2))
}

checkLogo()
