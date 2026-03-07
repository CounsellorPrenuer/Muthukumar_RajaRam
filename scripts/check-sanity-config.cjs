const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

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

const client = createClient({
    projectId: '694hecf9',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
});

async function run() {
    const pages = await client.fetch('*[_type == "page"]{ _id, title, "slug": slug.current }');
    const navbar = await client.fetch('*[_type == "navbar"][0]');
    console.log('Pages:', pages);
    console.log('Navbar:', navbar);
}

run().catch(console.error);
