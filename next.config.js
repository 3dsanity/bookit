/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRIPE_API_KEY:
      'pk_test_51KjQuIFt23BaYq3X7uhJTyUOcLNkDTkqJ70JJg6ohwEZQkmi6UWPbqy92ND5bOicQDY96L30w3iEnNqdxJdpN6Jf009wJBquwi',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;

