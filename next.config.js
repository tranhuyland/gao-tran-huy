/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" }, // Thêm dòng này để cho phép hiện ảnh từ Cloudinary
    ],
  },
};

module.exports = nextConfig;
