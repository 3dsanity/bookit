/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
    CLOUDINARY_CLOUD_NAME: 'dutauawc3',
    CLOUDINARY_API_KEY: '295565324278193',
    CLOUDINARY_API_SECRET: 'NcDv32wxu9M7MtFYTS0x7pSYEBA',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;

