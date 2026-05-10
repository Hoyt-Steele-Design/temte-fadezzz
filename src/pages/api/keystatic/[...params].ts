import process from "node:process";
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import { parseString } from "set-cookie-parser";
import type { APIContext } from "astro";

import keystaticConfig from "../../../../keystatic.config";

function getEnv(context: APIContext) {
  const runtime = context.locals as {
    runtime?: { env?: Record<string, string | undefined> };
  };

  return { ...process.env, ...(runtime.runtime?.env ?? {}) };
}

function handleKeystaticRequest(context: APIContext) {
  const env = getEnv(context);
  const handler = makeGenericAPIRouteHandler({
    config: keystaticConfig,
    clientId:
      env["KEYSTATIC_GITHUB_CLIENT_ID"] ??
      env["PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID"],
    clientSecret: env["KEYSTATIC_GITHUB_CLIENT_SECRET"],
    secret: env["KEYSTATIC_SECRET"],
  });

  return handler(context.request).then(({ body, headers, status }) => {
    const responseHeaders = new Map<string, string[]>();

    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          const normalizedKey = key.toLowerCase();
          responseHeaders.set(normalizedKey, [
            ...(responseHeaders.get(normalizedKey) ?? []),
            value,
          ]);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          responseHeaders.set(key.toLowerCase(), [value]);
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          responseHeaders.set(key.toLowerCase(), [value]);
        }
      }
    }

    const setCookieHeaders = responseHeaders.get("set-cookie");
    responseHeaders.delete("set-cookie");

    if (setCookieHeaders) {
      for (const setCookieHeader of setCookieHeaders) {
        const { name, value, ...options } = parseString(setCookieHeader);
        const sameSite = options.sameSite?.toLowerCase();

        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite:
            sameSite === "lax" || sameSite === "strict" || sameSite === "none"
              ? sameSite
              : undefined,
        });
      }
    }

    return new Response(body, {
      status,
      headers: [...responseHeaders.entries()].flatMap(([key, values]) =>
        values.map((value) => [key, value])
      ),
    });
  });
}

export const prerender = false;
export const ALL = handleKeystaticRequest;
export const all = handleKeystaticRequest;
