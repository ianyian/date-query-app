const fs = require("fs");
const path = require("path");

const version = `Version: 1.0.${Date.now()} - Built on: ${new Date().toLocaleString()}`;
const envPath = path.join(__dirname, ".env");

fs.writeFileSync(envPath, `REACT_APP_BUILD_VERSION=${version}\n`);
console.log(`Updated build version: ${version}`);
