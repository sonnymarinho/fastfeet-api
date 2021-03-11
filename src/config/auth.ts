const jwt = {
  secret: process.env.APP_SECRET || 'default',
  expiresIn: process.env.EXPIRES_IN || 604800, // 604800 = 7d,
}

export { jwt }
