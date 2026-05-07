// Live content API configuration
// This is currently disabled to resolve build errors with next-sanity v12
/*
import { defineLive } from "next-sanity";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    apiVersion: 'vX' 
  }) 
});
*/

// Temporary placeholders to prevent import errors
export const sanityFetch = () => {};
export const SanityLive = () => null;
