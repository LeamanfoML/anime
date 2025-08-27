/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'anilibria.tv',
      'animego.org', 
      'yummyani.me',
      'anitype.net',
      'anixart.tv',
      'jut.su'
    ],
    unoptimized: true
  },
  swcMinify: false,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST' },
        ],
      },
    ];
  },
}

module.exports = nextConfig