import express from "express";
import { logger } from "./logger";

const SKOSMOS_URL = process.env.SEARCHKIT_SKOSMOS_URL || "https://thesauri.cessda.eu/";
const ELSST_VOCABULARY = process.env.SEARCHKIT_ELSST_VOCABULARY || "elsst-4";

interface SkosmosLookupResponse {
  result: {
    uri: string;
  }[];
}

export interface TermURIResult extends Record<string, string> {}

const termCache = new Map<string, string | undefined>();

async function getELSSTTerm(labels: string[], lang: string): Promise<TermURIResult> {

  // Request term from ELSST, the label is encoded
  const termUris = labels.map(async originalLabel => {
    // Normalise the label by converting it to upper case
    const normalisedLabel = originalLabel.toUpperCase();

    if(termCache.has(normalisedLabel)) {
      return {
        label: originalLabel, // UI expects the original label
        uri: termCache.get(normalisedLabel)
      };
    }

    const response = await fetch(`${SKOSMOS_URL}/rest/v1/${ELSST_VOCABULARY}/lookup?label=${encodeURIComponent(normalisedLabel)}&lang=${lang}`);

    // Match potentially found - try to extract the URI
    if (response.ok) {
      const results = await response.json() as SkosmosLookupResponse;
      if (results.result.length > 0) {

        // Write the result to the cache
        termCache.set(normalisedLabel, results.result[0].uri);

        return {
          label: originalLabel,
          uri: results.result[0].uri
        };
      }
    } else if (response.status === 404) {
      // If a 404 response is returned, the term doesn't exist in ELSST
      termCache.set(normalisedLabel, undefined);
    }

    // Match not found
    return {
      label: normalisedLabel, // UI expects the original label
      uri: undefined
    };
  });


  const destObject: TermURIResult = {}

  // Copy each result into the destination object, awaiting each in turn
  for (const promise of termUris) {
    const termResult = await promise;
    if (termResult.uri) {
      destObject[termResult.label] = termResult.uri;
    }
  }

  return destObject;
}

export function getELSSTRouter() {
  const router = express.Router();

  router.post('/_terms', async (req, res) => {
    const terms = req.body as {
      labels: string[],
      lang: string
    };

    try {
      const lookup = await getELSSTTerm(terms.labels, terms.lang);
      res.json(lookup);
    } catch (e) {
      logger.error('ELSST request failed: %s', e);
      res.sendStatus(502);
    }
  });

  return router;
}
