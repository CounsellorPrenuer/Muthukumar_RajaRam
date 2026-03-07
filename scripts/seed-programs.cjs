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

const programs = [
    {
        _key: 'prog-1',
        title: 'School Students (8-9)',
        description: 'Choose the right stream and subjects for your future.',
        cta: 'Explore Options',
        link: '#',
    },
    {
        _key: 'prog-2',
        title: 'School Students (10-12)',
        description: 'Discover courses and exams to prepare for your dream career.',
        cta: 'Get Guidance',
        link: '#',
    },
    {
        _key: 'prog-3',
        title: 'College Students (1st and 2nd year)',
        description: 'Select electives, internships, and career paths early.',
        cta: 'Plan Your Path',
        link: '#',
    },
    {
        _key: 'prog-4',
        title: 'College Students (above 2 years)',
        description: 'Prepare for jobs, higher studies, and career transitions.',
        cta: 'Advance Your Career',
        link: '#',
    },
    {
        _key: 'prog-5',
        title: 'Working Professionals (1-5 years)',
        description: 'Make practical career switches and upskill for growth.',
        cta: 'Upskill & Switch',
        link: '#',
    },
    {
        _key: 'prog-6',
        title: 'Working Professionals (above 5 years)',
        description: 'Strategize for leadership, entrepreneurship, or new directions.',
        cta: 'Lead & Innovate',
        link: '#',
    },
]

async function seedPrograms() {
    console.log("Fetching home page...");
    const home = await client.fetch('*[_type == "page" && slug.current == "home"][0]');

    if (!home) {
        console.error("Home page not found!");
        return;
    }

    const sections = home.sections || [];

    // Check if it already has this section
    const hasPrograms = sections.some(s => s._type === 'programsByUserTypeSection');
    if (hasPrograms) {
        console.log("Programs section already exists on Home page.");
        return;
    }

    const newSection = {
        _key: 'career-ipa-programs',
        _type: 'programsByUserTypeSection',
        title: 'Programs by User Type',
        programs: programs
    };

    // Insert after hero if possible, else append
    const updatedSections = [...sections];
    const heroIndex = updatedSections.findIndex(s => s._type === 'heroSection');

    if (heroIndex >= 0) {
        updatedSections.splice(heroIndex + 1, 0, newSection);
    } else {
        updatedSections.push(newSection);
    }

    console.log("Updating home page via patch...");
    await client.patch(home._id)
        .set({ sections: updatedSections })
        .commit();

    console.log("Successfully seeded Programs section into Home page.");
}

seedPrograms().catch(console.error);
