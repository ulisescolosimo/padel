/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
  typescript: {
    // ⚠️ Advertencia: Esto ignora errores de TypeScript durante la producción ⚠️
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Advertencia: Esto ignora errores de ESLint durante la producción ⚠️
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 