"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
async function checkSlugs() {
    const blogRepo = inversify_config_1.container.get(types_1.TYPES.BlogRepo);
    const posts = await blogRepo.findAll(100, 0);
    console.log("Current BlogPost Data:");
    posts.forEach(p => {
        console.log(`ID: ${p.id}, Slug: ${p.slug}, Title: ${p.title}`);
    });
    process.exit(0);
}
checkSlugs();
//# sourceMappingURL=check-slugs.js.map