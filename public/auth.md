# auth.md

Nexis CRO agent authentication and registration for **nexiscro.com** (public marketing origin).

## Audience

AI agents and crawlers consuming public product, pricing, and install information. Merchant admin APIs
require the Shopify embedded app after install.

## Public access (no registration)

Marketing pages are public. Preferred machine-readable formats:

| Format | URL |
| --- | --- |
| Markdown (negotiated) | `GET /` with `Accept: text/markdown` |
| Markdown (static) | https://nexiscro.com/index.md |
| API catalog | https://nexiscro.com/.well-known/api-catalog |
| Agent skills | https://nexiscro.com/.well-known/agent-skills/index.json |

## Anonymous agent registration

For structured bearer access to public content metadata:

```http
POST /api/agent-auth/register
Content-Type: application/json

{}
```

Response includes `client_id: nexiscro-public-agent` with grant type `client_credentials`.

### Token

```http
POST /api/agent-auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=nexiscro-public-agent&scope=content.read
```

Returns a bearer token scoped to `content.read` (public marketing content only).

### Claim

`GET /api/agent-auth/claim` — anonymous identity claim metadata.

## OAuth discovery

| Document | URL |
| --- | --- |
| Authorization Server (RFC 8414) | https://nexiscro.com/.well-known/oauth-authorization-server |
| OpenID Provider (minimal) | https://nexiscro.com/.well-known/openid-configuration |
| Protected Resource (RFC 9728) | https://nexiscro.com/.well-known/oauth-protected-resource |
| JWKS | https://nexiscro.com/.well-known/jwks.json |

Issuer: `https://nexiscro.com`

## Shopify merchant authentication

The Nexis CRO **Shopify app** uses Shopify OAuth for merchants. Agents must not impersonate merchants
from this marketing domain. Direct users to:

- Install: https://apps.shopify.com/partners/nexis-cro
- Support: support@nexiscro.com

## Commerce & payments

Paid subscriptions are sold via **Shopify managed billing** after app install (not HTTP micropayments on
this origin). Discovery:

- ACP: https://nexiscro.com/.well-known/acp.json
- UCP: https://nexiscro.com/.well-known/ucp
- OpenAPI (MPP): https://nexiscro.com/openapi.json
- x402 probe: `GET /api/agent-premium` returns HTTP 402 with `PAYMENT-REQUIRED`

## Content policy

`Content-Signal: ai-train=no, search=yes, ai-input=yes` (see `/robots.txt`).
