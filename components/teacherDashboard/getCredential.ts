import * as vcjs from "@transmute/vc.js";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import * as jose from "node-jose";
import documentLoader from "./documentLoader";

const signerFactory = (controller, jwk) => {
  return {
    sign: (payload: string, header) => {
      // typ: 'JWT', MUST NOT be present per well known did configuration...
      const adjustedHeader = {
        ...header,
        kid: controller + (jwk.kid ? jwk.kid : ""),
      };
      return jose.JWS.createSign(
        {
          alg: "RS256",
          format: "compact",
          fields: adjustedHeader,
        },
        jwk
      )
        .update(JSON.stringify(payload), "utf8")
        .final();
    },
  };
};

const privateKey = {
  p: "_GwxbK84QZZT_b44ZdiR69bPIyMXe-CZ15NAxQugykLG1C8itB2ls0lHWkPWXrCaTMOcAg0frV3wdTnDW1td4ffwDY_c0HDXfAGyiY0COdolusqStkPd2CYFEgjQjrYvgIB7Nk74ifHy4z03ihAeU3Cu1FkJBR9sSzJ5DDMyN_0",
  kty: "RSA",
  q: "nSDHYQKdCCf8hy98H47CQzjWPcrc8eCCsKbmkJy9bIuHkchmsfyXQJYS-lqXUICqLwueuFYSFc-8Xe_pTpwHjeEYD8CVJV5D2osx_-FzIAEq85RpwUYUVwYEks16FR0Pjg6kXaR8mYtYk0brcUz153QxkKr12BiJWYtk4bgqIg0",
  d: "M49OTsI-0_IeTEwhIuDWAmKG9Z3dju1_5pBHAnIW4eKFPTlTLUrUNh20kgb8Lxw-jfDuggjw-qLqTIfXHXYJI0kacH-Pf5ZGf8q5eBHHQmUSbiRZTXaShdXUK4RQ7qqVWUHGMsRvTUJjhPHXuazzfZkBhrBjiMYvdhKSfDQmKb_715V8HcRXUBz6-Qlg-fCFRKPeSPbfZsH3EKYeWCG5qE01Fume-Lnko9tixc0L60OKT_MBHZfQ4xRUnUNF2IEQEmt5lStUyYUnG0IFVZm7635WcLPLs-MYb_Tmlg2dPlViEGqIah0lkMGhigLvXueFeTf2tJ74Vf_5cFH9k--2oQ",
  e: "AQAB",
  use: "sig",
  qi: "rUCE8zuTWHaJ3HlI98w5LEJOXlFhuZ79N4uxECgWxRpDTPCXxSNGi6EubhRDTC-Pv8Lo53rnAaBYiz8PybJPGU95-JGMAO6xeyhBnJ_wjbKFiPfjZNGyYpesw5mCF-Eoju0vLIO84wZ9eTbuU8jWiiSdXOZ1oUQVSwYb5py8_Cg",
  dp: "0861ak1dFyvdLn3_NPaU-yA0j3dSrU-5x3p4Tt-C_DUsQb-LjzeRYu-KP-PMbYgi8Wbx8YaxnffFXZgqpO31yTcS505gK0eEiTmjZmg8Be9W2XZBxU8NR-IfPxLGbfnRwjINMXTyeE3dUXB8ugzsZXeYO_a56uKDLFYd3G7ZJME",
  alg: "RS256",
  dq: "lxkkYeePdn5tWtqQ9A_mQ5pue3GPUpHhW1rEMaBoj-8FaW1bRCFwmc03ZsSi6ekwvpjgAsfSEGN58qN4qf1lTkx9RPie9BZYDdr5M-VrPgWhdibsI83uVVkWIM2zboZJpQPzj5FTuJvFi6sRUhz-A5s65rFgRHQj8JYZZu4gpik",
  n: "mu6sbZcJTGx7pnIzlmIvUUFBDV4Cc2T0SVbms7GzkEXyVZMgHybqn_v-ZokfaUriACKDo2gCG5sdCFvg-w9oLRllsOlAki3ZPidoGXxLc8LtL9omqXHJEnq00ujJvHqWzfamfpBN9VyqtK7mbfeQAUYEXOQ1KYBX2SYDab2vpG4fQwor_KGhmA2OdbPjLhz70-oOJCxaAdNtbOXlirIi7CdZ-O4bdF7eA41lpwq1XsGyYkuSjn58YwyT5EGU9AbEYHrW0zDWtskWX40lBb8y_ugw6Cf4xIDTNR1qpw-vTdey9JdiDLxJ_PHoUi-4yQeazM69emDor54e0UxDTH5x2Q",
};

export default async function getCredential(
  credentialSubject: unknown,
  credentialUri: string
): Promise<string> {
  // Get Signer
  const controller = getDefaultSession().info.webId;
  if (!controller) {
    throw Error("Could not get WebId");
  }
  const jwk = privateKey;
  const signer = signerFactory(controller, jwk);

  // Create Credential
  const credential = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    id: credentialUri,
    type: ["VerifiableCredential"],
    issuer: { id: controller },
    issuanceDate: new Date().toISOString(),
    credentialSubject,
  };
  const credentialIssued = await vcjs.jwt.issue(
    credential,
    signer,
    documentLoader
  );
  return credentialIssued;
}
