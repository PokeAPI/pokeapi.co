export function endpointAnchor(resource: {name: string; exampleRequest?: string}): string {
  const path = resource.exampleRequest
    ?.split("/")
    .slice(2)
    .filter((part) => part && !part.startsWith("{"))
    .join("-");

  return (path || resource.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
