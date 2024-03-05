function createRegexURL(domain: string | string[], tld: string | string[]): RegExp {
  const parseDomain = Array.isArray(domain) ? domain.join("|") : domain;
  const parseTld = Array.isArray(tld) ? tld.join("|") : tld;
  return new RegExp(`(?:http(s)?:\\/\\/)?(www\\.)?(${parseDomain})\\.(${parseTld})(\\/[\w-]+)?`, "i");
}

export { createRegexURL };
