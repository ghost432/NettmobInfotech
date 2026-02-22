
import "reflect-metadata";
import { container } from "./inversify.config";
import { TYPES } from "./types";
import { BlogRepo } from "./repositories/BlogRepo";

async function checkSlugs() {
    const blogRepo = container.get<BlogRepo>(TYPES.BlogRepo);
    const posts = await blogRepo.findAll(100, 0);
    console.log("Current BlogPost Data:");
    posts.forEach(p => {
        console.log(`ID: ${p.id}, Slug: ${p.slug}, Title: ${p.title}`);
    });
    process.exit(0);
}

checkSlugs();
