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
        <Container maxWidth="md">
            {/* Header Section */}
            <Card sx={{ display: 'flex', mb: 4 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={logo}
                    alt={`${name} logo`}
                />
                <CardContent>
                    <Typography component="h1" variant="h4">
                        {name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {tagline}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Founded:</strong> {foundedYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Location:</strong> {location}
                    </Typography>
                </CardContent>
            </Card>

            {/* Business Details Section */}
            <Typography variant="h5" gutterBottom>
                Business Details
            </Typography>
            <List>
                {Object.entries(businessDetails).map(([key, value]) => (
                    <ListItem key={key}>
                        <ListItemText
                            primary={<strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>}
                            secondary={Array.isArray(value) ? value.join(', ') : value}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />

            {/* Financial Information Section */}
            <Typography variant="h5" gutterBottom>
                Financial Information
            </Typography>
            <List>
                {Object.entries(financialInfo).map(([key, value]) => (
                    key !== 'financialProjections' && (
                        <ListItem key={key}>
                            <ListItemText
                                primary={<strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>}
                                secondary={value}
                            />
                        </ListItem>
                    )
                ))}
                <ListItem>
                    <ListItemText
                        primary={<strong>Financial Projections:</strong>}
                        secondary={<img src={financialInfo.financialProjections} alt="Financial Projections" />}
                    />
                </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />

            {/* Product Details Section */}
            <Typography variant="h5" gutterBottom>
                Product Details
            </Typography>
            <List>
                {Object.entries(productDetails).map(([key, value]) => (
                    key !== 'productDemoVideoUrl' && key !== 'productImages' && (
                        <ListItem key={key}>
                            <ListItemText
                                primary={<strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>}
                                secondary={Array.isArray(value) ? value.join(', ') : value}
                            />
                        </ListItem>
                    )
                ))}
                <ListItem>
                    <ListItemText
                        primary={<strong>Product Demo Video:</strong>}
                        secondary={
                            <Link href={productDetails.productDemoVideoUrl} target="_blank" rel="noopener">
                                Watch Demo
                            </Link>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<strong>Product Images:</strong>}
                        secondary={
                            <Grid container spacing={2}>
                                {productDetails.productImages.map((image, index) => (
                                    <Grid item xs={6} key={index}>
                                        <img src={image} alt={`Product ${index + 1}`} style={{ width: '100%' }} />
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    />
                </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />


            <Typography variant="h5" gutterBottom>
                Team Information
            </Typography>
            <List>
                {teamInformation.founders.map((founder, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={<strong>{founder.name}</strong>}
                            secondary={
                                <>
                                    <Typography variant="body2"><strong>Role:</strong> {founder.role}</Typography>
                                    <Typography variant="body2">
                                        <strong>LinkedIn:</strong> <Link href={founder.linkedInUrl} target="_blank" rel="noopener">{founder.linkedInUrl}</Link>
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemText
                        primary={<strong>Team Size:</strong>}
                        secondary={teamInformation.teamSize}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<strong>Currently Hiring:</strong>}
                        secondary={teamInformation.currentlyHiring ? 'Yes' : 'No'}
                    />
                </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" gutterBottom>
                Traction & Metrics
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary={<strong>Key Metrics:</strong>}
                        secondary={tractionMetrics.keyMetrics.join(', ')}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<strong>Active Customers:</strong>}
                        secondary={tractionMetrics.activeCustomers}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<strong>Strategic Partnerships:</strong>}
                        secondary={tractionMetrics.strategicPartnerships.join(', ')}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<strong>Customer Testimonials:</strong>}
                        secondary={
                            <Grid container spacing={2}>
                                {tractionMetrics.customerTestimonials.map((testimonial, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <img src={testimonial} alt={`Testimonial ${index + 1}`} style={{ width: '100%' }} />
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    />
                </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />


            <Typography variant="h5" gutterBottom>
                Contact Details
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary={<strong>Website:</strong>}
                        secondary={
                            <Link href={contactDetails.websiteUrl} target="_blank" rel="noopener">
                                {contactDetails.websiteUrl}
                            </Link>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<strong>Pitch Deck:</strong>}
                        secondary={
                            <Link href={contactDetails.pitchDeck} target="_blank" rel="noopener">
                                Download Pitch Deck
                            </Link>
                        }
                    />
                </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />


        </Container>
    );
};

export default StartupDetail;

