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
      {
        "about": *[_type == "about"][0],
        "services": *[_type == "service"],
        "contact": *[_type == "contact"][0],
        "testimonials": *[_type == "testimonial"]
      }
    `);
    fs.writeFileSync('legacy.json', JSON.stringify(result, null, 2));
    console.log('Saved to legacy.json');
}

run().catch(console.error);
