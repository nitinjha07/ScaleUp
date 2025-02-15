import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStartup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 9;
  const industries = [
    "Tech",
    "Fintech",
    "Healthcare",
    "E-commerce",
    "Edtech",
    "AI/ML",
    "SaaS",
    "Other",
  ];
  const businessModels = [
    "B2B",
    "B2C",
    "B2B2C",
    "Subscription",
    "Marketplace",
    "Freemium",
    "Other",
  ];
  const stages = [
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Bootstrapped",
  ];

  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    tagline: "",
    description: "",
    logo: null,
    foundedYear: new Date().getFullYear(),
    location: "",

    // Business Details
    industry: "",
    businessModel: "",
    stage: "",
    usp: "",
    marketSize: "",
    competitors: "",

    // Financials
    fundingGoal: "",
    valuation: "",
    revenue: "",
    equityOffered: "",

    // Product
    productName: "",
    productFeatures: "",
    techStack: "",
    targetAudience: "",
    demoVideo: "",

    // Team
    founders: [{ name: "", role: "", linkedin: "" }],
    teamSize: "",
    hiring: false,

    // Traction
    keyMetrics: "",
    customers: "",
    partnerships: "",

    // Contact
    website: "",
    email: "",
    phone: "",
    linkedin: "",
    twitter: "",

    // Documents
    pitchDeck: null,
    financialProjections: null,
    productImages: [],

    // Legal Documents
    wordmarkTrademark: null,
    companyRegistration: null,
    shareholdersAgreement: null,
    partnershipAgreement: null,
    termsOfService: null,
    privacyPolicy: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFounderChange = (index, e) => {
    const newFounders = [...formData.founders];
    newFounders[index][e.target.name] = e.target.value;
    setFormData({ ...formData, founders: newFounders });
  };

  const addFounder = () => {
    setFormData({
      ...formData,
      founders: [...formData.founders, { name: "", role: "", linkedin: "" }],
    });
  };

  const handleFileUpload = (e) => {
    const { name } = e.target;
    const files = e.target.files;
    if (name === "productImages") {
      setFormData({
        ...formData,
        [name]: [...formData.productImages, ...files],
      });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submitting:", formData);

    try {
      const logo = await storageServices.uploadImage(formData.logo);
      const photos = await Promise.all(
        formData.photos.map(async (photo) => {
          return await storageServices.uploadImage(photo);
        })
      );
      const pitchDeck = await storageServices.uploadVideo(formData.pitchDeck);

      const { founders, ...restFormData } = formData;

      restFormData.pitchDeck = pitchDeck;
      restFormData.logo = logo;
      restFormData.photos = photos;

      const startupDetails = await startupDetailsServices.addStartup(
        restFormData
      );

      await Promise.all(
        founders.map(async (founder) => {
          await startupDetailsServices.addStartupFounder({
            ...founder,
            startupId: startupDetails?.$id,
          });
        })
      );
    } catch (error) {
      throw new Error();
    }

    alert("Startup added successfully!");
    navigate("/startups");
  };
  const ProgressBar = () => (
    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
      <div
        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Register Your Startup
        </h1>
        <ProgressBar />

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Startup Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Tagline *</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block mb-2">Founded Year *</label>
                <input
                  type="number"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Logo *</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    name="logo"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                  {formData.logo && (
                    <span className="text-sm">{formData.logo.name}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={nextStep}
                className="ml-auto bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Business Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Industry *</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  {industries.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Business Model *</label>
                <select
                  name="businessModel"
                  value={formData.businessModel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Business Model</option>
                  {businessModels.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Current Stage *</label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Stage</option>
                  {stages.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Market Size ($)</label>
                <input
                  type="text"
                  name="marketSize"
                  value={formData.marketSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">
                  Unique Selling Proposition (USP) *
                </label>
                <textarea
                  name="usp"
                  value={formData.usp}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Main Competitors</label>
                <input
                  type="text"
                  name="competitors"
                  value={formData.competitors}
                  onChange={handleChange}
                  placeholder="Separate with commas"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Financial Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              Financial Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Funding Goal ($)*</label>
                <input
                  type="number"
                  name="fundingGoal"
                  value={formData.fundingGoal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Valuation ($)</label>
                <input
                  type="number"
                  name="valuation"
                  value={formData.valuation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Annual Revenue ($)</label>
                <input
                  type="number"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Equity Offered (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="equityOffered"
                  value={formData.equityOffered}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Financial Projections</label>
                <input
                  type="file"
                  name="financialProjections"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Product Details */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2">Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Key Features *</label>
                <textarea
                  name="productFeatures"
                  value={formData.productFeatures}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block mb-2">Tech Stack</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="Technologies used (comma separated)"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Target Audience</label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Product Demo Video URL</label>
                <input
                  type="url"
                  name="demoVideo"
                  value={formData.demoVideo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Product Images</label>
                <input
                  type="file"
                  name="productImages"
                  onChange={handleFileUpload}
                  multiple
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 5 - Team Information */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Team Information</h2>
            <div className="grid grid-cols-1 gap-4">
              {formData.founders.map((founder, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Founder #{index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={founder.name}
                        onChange={(e) => handleFounderChange(index, e)}
                        className="w-full px-4 py-2 rounded bg-gray-600 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Role *</label>
                      <input
                        type="text"
                        name="role"
                        value={founder.role}
                        onChange={(e) => handleFounderChange(index, e)}
                        className="w-full px-4 py-2 rounded bg-gray-600 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={founder.linkedin}
                        onChange={(e) => handleFounderChange(index, e)}
                        className="w-full px-4 py-2 rounded bg-gray-600 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addFounder}
                className="w-full py-2 border-2 border-dashed border-gray-600 rounded hover:border-blue-500"
              >
                + Add Another Founder
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Team Size *</label>
                  <input
                    type="number"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="hiring"
                    checked={formData.hiring}
                    onChange={() =>
                      setFormData({ ...formData, hiring: !formData.hiring })
                    }
                    className="w-5 h-5 rounded bg-gray-700"
                  />
                  <label className="block">Currently Hiring?</label>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 6 - Traction & Metrics */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Traction & Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2">Key Metrics</label>
                <textarea
                  name="keyMetrics"
                  value={formData.keyMetrics}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Monthly Active Users, Revenue Growth, Churn Rate, etc."
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block mb-2">Active Customers</label>
                <input
                  type="number"
                  name="customers"
                  value={formData.customers}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Strategic Partnerships</label>
                <input
                  type="text"
                  name="partnerships"
                  value={formData.partnerships}
                  onChange={handleChange}
                  placeholder="Partner names (comma separated)"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Customer Testimonials</label>
                <input
                  type="file"
                  name="testimonials"
                  onChange={handleFileUpload}
                  multiple
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 7 - Contact Information */}
        {step === 7 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Website URL *</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Contact Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Twitter Handle</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="@yourhandle"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Pitch Deck *</label>
                <input
                  type="file"
                  name="pitchDeck"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Legal Documents</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2">Wordmark Trademark *</label>
                <input
                  type="file"
                  name="wordmarkTrademark"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
                {formData.wordmarkTrademark && (
                  <span className="text-sm text-gray-400 ml-2">
                    {formData.wordmarkTrademark.name}
                  </span>
                )}
              </div>

              <div>
                <label className="block mb-2">
                  Company Registration Certificate *
                </label>
                <input
                  type="file"
                  name="companyRegistration"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>

              <div>
                <label className="block mb-2">Shareholders Agreement *</label>
                <input
                  type="file"
                  name="shareholdersAgreement"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Partnership/Co-founder Agreement *
                </label>
                <input
                  type="file"
                  name="partnershipAgreement"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>

              <div>
                <label className="block mb-2">Terms of Service</label>
                <input
                  type="file"
                  name="termsOfService"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>

              <div>
                <label className="block mb-2">Privacy Policy</label>
                <input
                  type="file"
                  name="privacyPolicy"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === totalSteps && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Review & Submit</h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Legal Documents Summary
              </h3>
              <div className="space-y-2">
                {formData.wordmarkTrademark && (
                  <p>Wordmark Trademark: {formData.wordmarkTrademark.name}</p>
                )}
                {formData.companyRegistration && (
                  <p>
                    Company Registration: {formData.companyRegistration.name}
                  </p>
                )}
                {formData.shareholdersAgreement && (
                  <p>
                    Shareholders Agreement:{" "}
                    {formData.shareholdersAgreement.name}
                  </p>
                )}
                {formData.partnershipAgreement && (
                  <p>
                    Partnership Agreement: {formData.partnershipAgreement.name}
                  </p>
                )}
                {/* Add other document previews similarly */}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 px-6 py-2 rounded hover:bg-green-600"
              >
                Submit Application
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStartup;
