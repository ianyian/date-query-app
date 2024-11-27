const fs = require("fs");
const timestamp = new Date().toISOString();

fs.writeFileSync(".env", `REACT_APP_BUILD_TIMESTAMP=${timestamp}\n`);
console.log("Build timestamp set to:", timestamp);
