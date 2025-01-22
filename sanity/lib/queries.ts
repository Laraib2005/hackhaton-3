
import { groq } from "next-sanity";

export const allcategory = groq`*[_type == "category"]`;

export const dandychair = groq`*[_type == "product"][11]`;