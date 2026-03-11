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
    projectId: 'z3p2hjb6',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
});

async function run() {
    const result = await client.fetch(`
      *[_type != "system.group" && _type != "system.retainer" && _type != "sanity.imageAsset" && _type != "sanity.fileAsset"] | order(_updatedAt desc) [0...20] {
        _id,
        _type,
        _updatedAt,
        title,
        heading
      }
    `);
    console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);
