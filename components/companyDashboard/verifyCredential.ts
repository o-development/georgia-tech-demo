import * as jose from "node-jose";
import { serializedToDataset } from "o-dataset-pack";
import { namedNode } from "@rdfjs/data-model";
import * as vcjs from "@transmute/vc.js";

const verifyFactory = (jwk) => {
  return {
    verify: async (jws): Promise<jose.JWS.VerificationResult> => {
      const key = await jose.JWK.asKey(jwk);
      const verified = await jose.JWS.createVerify(key).verify(jws);
      const verifiedPayload = JSON.parse(verified.payload.toString());
      return verifiedPayload;
    },
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export async function getPublicKeysFromPod(issuer: string): Promise<object[]> {
  const rawData = await (await fetch(issuer)).text();
  const dataset = await serializedToDataset(rawData);
  return dataset
    .match(null, namedNode("http://www.w3.org/ns/auth/cert#key"), null)
    .toArray()
    .map((curQuad) => {
      try {
        return JSON.parse(curQuad.object.value);
      } catch {
        return null;
      }
    })
    .filter((val) => val);
}

export default async function verifyCredential(
  credential: string
): Promise<boolean> {
  // Note: this is not the issuer. This is a shortcut because node-jose
  // doesn't have a function to just parse the key
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issuer = (jose.parse(credential).header as any).kid;
  const publicKeys = await getPublicKeysFromPod(issuer);

  console.log(publicKeys);

  // Validate Public Keys
  try {
    await Promise.any(
      publicKeys.map(async (publicKey) => {
        const verifier = verifyFactory(publicKey);
        await vcjs.jwt.verify(credential, verifier);
      })
    );
    return true;
  } catch {
    return false;
  }
}
