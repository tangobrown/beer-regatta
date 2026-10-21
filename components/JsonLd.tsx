/**
 * Renders a JSON-LD structured-data block. Kept as a plain script tag so it
 * ships in the static HTML (no client JS needed).
 *
 * The serialized JSON is escaped so that `<`, `>` and `&` can never break out
 * of the <script> element (e.g. a literal "</script>" in the data) — a
 * defence-in-depth measure even though this data is author-controlled.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
