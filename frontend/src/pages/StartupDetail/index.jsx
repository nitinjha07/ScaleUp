// StartupDetail.js
import React from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Divider,
    Link,
    Button,
} from '@mui/material';

// Dummy data
const startupData = {
    name: 'InnovateX',
    tagline: 'Innovating the Future',
    description: 'InnovateX is a tech startup focused on developing AI solutions.',
    foundedYear: 2020,
    location: 'San Francisco, CA',
    logo: 'https://via.placeholder.com/150',
    businessDetails: {
        industry: 'Technology',
        businessModel: 'B2B',
        currentStage: 'Series A',
        marketSize: '$5 Billion',
        usp: 'Cutting-edge AI algorithms',
        competitors: ['TechCorp', 'AI Solutions Inc.'],
    },
    financialInfo: {
        fundingGoal: '$2 Million',
        valuation: '$10 Million',
        annualRevenue: '$1 Million',
        equityOffered: '10%',
        financialProjections: 'https://via.placeholder.com/300x200',
    },
    productDetails: {
        productName: 'AI Assistant',
        keyFeatures: ['Natural Language Processing', 'Machine Learning', 'Data Analytics'],
        techStack: ['Python', 'TensorFlow', 'React'],
        targetAudience: 'Enterprises',
        productDemoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        productImages: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
    },
    teamInformation: {
        founders: [
            {
                name: 'Jane Doe',
                role: 'CEO',
                linkedInUrl: 'https://www.linkedin.com/in/janedoe',
            },
            {
                name: 'John Smith',
                role: 'CTO',
                linkedInUrl: 'https://www.linkedin.com/in/johnsmith',
            },
        ],
        teamSize: 15,
        currentlyHiring: true,
    },
    tractionMetrics: {
        keyMetrics: ['500+ clients', '1M+ active users', '100+ strategic partnerships'],
        activeCustomers: 500,
        strategicPartnerships: ['Partner A', 'Partner B'],
        customerTestimonials: ['https://via.placeholder.com/300x100', 'https://via.placeholder.com/300x100'],
    },
    contactDetails: {
        websiteUrl: 'https://www.innovatex.com',
        pitchDeck: 'https://www.innovatex.com/pitch-deck.pdf',
    },
};

const StartupDetail = () => {
    const {
        name,
        tagline,
        description,
        foundedYear,
        location,
        logo,
        businessDetails,
        financialInfo,
        productDetails,
        teamInformation,
        tractionMetrics,
        contactDetails,
    } = startupData;

    return (

        <div className="max-w-4xl mx-auto p-6 bg-gray-50 ">
            {/* Header Section */}
            <div className="flex items-center mb-8 bg-white p-6 rounded-lg shadow-md">
                <img src={logo} alt={`${name} logo`} className="w-24 h-24 mr-6 rounded-full" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
                    <p className="text-xl text-gray-600">{tagline}</p>
                    <p className="mt-2 text-gray-700">{description}</p>
                    <p className="mt-1 text-gray-500">Founded: {foundedYear} | Location: {location}</p>
                </div>
            </div>

            {/* Business Details Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Business Details</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ul className="list-disc list-inside text-gray-700">
                        <li className="mb-2"><strong>Industry:</strong> {businessDetails.industry}</li>
                        <li className="mb-2"><strong>Business Model:</strong> {businessDetails.businessModel}</li>
                        <li className="mb-2"><strong>Current Stage:</strong> {businessDetails.currentStage}</li>
                        <li className="mb-2"><strong>Market Size:</strong> {businessDetails.marketSize}</li>
                        <li className="mb-2"><strong>Unique Selling Proposition:</strong> {businessDetails.usp}</li>
                        <li className="mb-2"><strong>Competitors:</strong> {businessDetails.competitors.join(', ')}</li>
                    </ul>
                </div>
            </section>

            {/* Financial Information Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Information</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ul className="list-disc list-inside text-gray-700">
                        <li className="mb-2"><strong>Funding Goal:</strong> {financialInfo.fundingGoal}</li>
                        <li className="mb-2"><strong>Valuation:</strong> {financialInfo.valuation}</li>
                        <li className="mb-2"><strong>Annual Revenue:</strong> {financialInfo.annualRevenue}</li>
                        <li className="mb-2"><strong>Equity Offered:</strong> {financialInfo.equityOffered}</li>
                        <li className="mb-2">
                            <strong>Financial Projections:</strong>
                            <img src={financialInfo.financialProjections} alt="Financial Projections" className="mt-2 rounded" />
                        </li>
                    </ul>
                </div>
            </section>


            {/* //product deatails */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Details</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Product Name */}
                    <h3 className="text-xl font-bold text-gray-700 mb-2">{productDetails.productName}</h3>

                    {/* Key Features */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-600">Key Features:</h4>
                        <ul className="list-disc list-inside text-gray-700 ml-4">
                            {productDetails.keyFeatures.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-600">Tech Stack:</h4>
                        <ul className="list-disc list-inside text-gray-700 ml-4">
                            {productDetails.techStack.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Target Audience */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-600">Target Audience:</h4>
                        <p className="text-gray-700">{productDetails.targetAudience}</p>
                    </div>

                    {/* Product Demo Video */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-600">Product Demo Video:</h4>
                        <div className="mt-2">
                            <iframe
                                src={productDetails.productDemoVideoUrl}
                                title="Product Demo Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-64 sm:h-80 md:h-96 rounded-md shadow-md"
                            ></iframe>
                        </div>
                    </div>

                    {/* Product Images */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-600">Product Images:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            {productDetails.productImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-full h-auto rounded-md shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* founder details */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Information</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Founders */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Founders</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {teamInformation.founders.map((founder, index) => (
                                <div key={index} className="flex items-center">
                                    <img
                                        src={founder.profileImage}
                                        alt={`${founder.name}'s profile`}
                                        className="w-16 h-16 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{founder.name}</h4>
                                        <p className="text-gray-600">{founder.role}</p>
                                        <a
                                            href={founder.linkedInUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            LinkedIn Profile
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Size and Hiring Status */}
                    <div>
                        <p className="text-gray-700">
                            <strong>Team Size:</strong> {teamInformation.teamSize} members
                        </p>
                        <p className="text-gray-700">
                            <strong>Currently Hiring:</strong>{' '}
                            {teamInformation.currentlyHiring ? 'Yes' : 'No'}
                        </p>
                    </div>
                </div>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Traction & Metrics</h2>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
                    {/* Key Metrics */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Key Metrics</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {tractionMetrics.keyMetrics.map((metric, index) => (
                                <li key={index}>{metric}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Active Customers */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Active Customers</h3>
                        <p className="text-gray-700">{tractionMetrics.activeCustomers}+ active customers</p>
                    </div>

                    {/* Strategic Partnerships */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Strategic Partnerships</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {tractionMetrics.strategicPartnerships.map((partner, index) => (
                                <li key={index}>{partner}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Testimonials */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Customer Testimonials</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tractionMetrics.customerTestimonials.map((testimonial, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg">
                                    <img
                                        src={testimonial}
                                        alt={`Testimonial ${index + 1}`}
                                        className="w-full h-auto object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Our Office</h3>
                        <p className="text-gray-700">123 Startup Lane</p>
                        <p className="text-gray-700">Innovation City, IN 12345</p>
                        <p className="text-gray-700">Phone: (123) 456-7890</p>
                        <p className="text-gray-700">Email: contact@startup.com</p>
                    </div>

                    {/* Website and Pitch Deck */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">More Information</h3>
                        <p className="text-gray-700">
                            Visit our website:{' '}
                            <a
                                href={contactDetails.websiteUrl}
                                className="text-indigo-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {contactDetails.websiteUrl}
                            </a>
                        </p>
                        <p className="text-gray-700">
                            View our pitch deck:{' '}
                            <a
                                href={contactDetails.pitchDeck}
                                className="text-indigo-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Pitch Deck
                            </a>
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Get in Touch</h3>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                    rows="4"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default StartupDetail;

