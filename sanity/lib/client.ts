import { createClient } from 'next-sanity';

const projectId = "c1ekgkma"; // Use NEXT_PUBLIC_ for client-side access
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'; // Default to 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-14'; // Or your preferred API version

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to 'true' for production if appropriate, but 'false' during development for more up-to-date data.
  token: "skYxgRUAkxw7rkvL4sC0vakADZRUZgzRomRwHHOsDFnwFmHbIbSlXEerUliW0riXKCi6xzVnigMx2eexr5MbDHbWGt743EXC8ytuEF8QUqlW5BhNp1ADCK18TZptUmyBR3oGYLUZzCy1TEf3KZdXsylxAJANVn7aGrBph3aJ2fSEjNoKqnPD", // If you're using a private dataset
});
