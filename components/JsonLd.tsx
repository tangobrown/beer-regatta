/**
 * Renders a JSON-LD structured-data block. Kept as a plain script tag so it
 * ships in the static HTML (no client JS needed).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, author-controlled content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
