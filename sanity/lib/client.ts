import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; // Use NEXT_PUBLIC_ for client-side access
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'; // Default to 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-14'; // Or your preferred API version

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to 'true' for production if appropriate, but 'false' during development for more up-to-date data.
  token: process.env.SANITY_API_TOKEN, // If you're using a private dataset
});
