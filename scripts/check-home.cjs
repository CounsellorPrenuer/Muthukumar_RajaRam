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
    const home = await client.fetch('*[_type == "page" && slug.current == "home"][0]');
    fs.writeFileSync('home.json', JSON.stringify(home, null, 2));
    console.log('Saved to home.json');
}

run().catch(console.error);
