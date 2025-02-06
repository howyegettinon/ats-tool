module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      https: false,
      tls: false,
      net: false
    }
    return config
  }
}
