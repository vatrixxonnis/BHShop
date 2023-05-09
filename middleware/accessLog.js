const geoip = require('geoip-lite');
const AccessLogs = require('../models/accessLogs');

const logAccess = async (req, res, next) => {
  try {
    const { ip, headers, method, protocol, originalUrl } = req;
    const { 'user-agent': userAgent } = headers;
    const { country, region, city } = geoip.lookup(ip) || {};
    const { referer } = headers;

    const newAccessLog = new AccessLogs({
      IP: ip,
      userAgent,
      country,
      region,
      city,
      referrer: referer,
    });

    await newAccessLog.save();

    next();
 
