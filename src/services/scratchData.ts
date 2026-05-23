import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Fetches data from the given site
 * @param {string} url The url of the site to scrach
 * @returns {$} - An object of cheerio
 */
export const scratchDataFromSite = async (url: string) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);

    return $;
  } catch (error) {
    throw new Error(`Error fetching site: ${url}. ${error}`);
  }
};
