export function parseDOM(xmlString: string) {
  const doc = new DOMParser().parseFromString(xmlString, "text/xml");
  console.log(doc);
  return doc;
}
