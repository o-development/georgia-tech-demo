import didV011 from "./contexts/did-v0.11.json";
import securityV1 from "./contexts/security-v1.json";
import securityV2 from "./contexts/security-v2.json";
import credentialsV1 from "./contexts/credentials-v1.json";
import examplesV1 from "./contexts/examples-v1.json";
import ordl from "./contexts/odrl.json";

const localOverrides: Record<string, unknown> = {
  "https://w3id.org/did/v0.11": didV011,
  "https://w3id.org/security/v1": securityV1,
  "https://w3id.org/security/v2": securityV2,
  "https://www.w3.org/2018/credentials/v1": credentialsV1,
  "https://www.w3.org/2018/credentials/examples/v1": examplesV1,
  "https://www.w3.org/ns/odrl.jsonld": ordl,
};

const documentLoader = (
  url: string
): { contextUrl?: string; document: unknown; documentUrl: string } => {
  const withoutFragment = url.split("#")[0];

  if (localOverrides[withoutFragment]) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: localOverrides[withoutFragment], // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  //   console.warn(url);
  throw new Error(`No custom context support for ${url}`);
};

export default documentLoader;
