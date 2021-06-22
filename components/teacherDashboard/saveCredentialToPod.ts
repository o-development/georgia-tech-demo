import { fetch } from "@inrupt/solid-client-authn-browser";

export default async function saveCredentialToPod(
  uri: string,
  credential: string
): Promise<void> {
  await fetch(uri, {
    method: "PUT",
    body: credential,
  });
}
