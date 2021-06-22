import { fetch } from "@inrupt/solid-client-authn-browser";

export default async function getCredentailFromPod(
  uri: string
): Promise<string | undefined> {
  const result = await fetch(uri);
  if (result.status !== 200) {
    return undefined;
  }
  return result.text();
}
