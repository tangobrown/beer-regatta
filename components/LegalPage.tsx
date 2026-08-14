import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

/** Inline text tokens: plain string, a line break, or a link. */
export type Inline = string | { br: true } | { link: { text: string; href: string } };
export type RichText = Inline[];

export type Block = { p: RichText; bold?: boolean } | { ul: RichText[] };

export type Section = {
  heading?: string;
  blocks: Block[];
};

export type LegalContent = {
  eyebrow: string;
  title: string;
  sections: Section[];
};

function RichTextView({ nodes }: { nodes: RichText }) {
  return (
    <>
      {nodes.map((node, i) => {
        if (typeof node === "string") return <Fragment key={i}>{node}</Fragment>;
        if ("br" in node) return <br key={i} />;
        return (
          <a
            key={i}
            href={node.link.href}
            className="text-cyan transition-colors duration-150 hover:text-cyan-light"
            {...(node.link.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {node.link.text}
          </a>
        );
      })}
    </>
  );
}

export default function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-legal px-5 pb-10 pt-16 sm:px-8 lg:px-14 lg:pt-20 xl:px-[72px]">
        <p className="mb-[14px] font-sans text-[16px] text-cyan">{content.eyebrow}</p>
        <h1 className="mb-12 font-sans text-h1-legal font-bold [text-wrap:pretty]">
          {content.title}
        </h1>

        {content.sections.map((section, si) => (
          <section key={si} className="mb-10">
            {section.heading && (
              <h3 className="mb-[14px] font-sans text-[22px] font-bold text-cyan">
                {section.heading}
              </h3>
            )}
            {section.blocks.map((block, bi) => {
              const last = bi === section.blocks.length - 1;
              const spacing = last ? "" : "mb-4";
              if ("ul" in block) {
                return (
                  <ul
                    key={bi}
                    className={`flex list-disc flex-col gap-4 pl-[26px] ${spacing}`}
                  >
                    {block.ul.map((item, ii) => (
                      <li key={ii} className="text-[18px] leading-[1.85] text-white/90">
                        <RichTextView nodes={item} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={bi}
                  className={`text-[18px] leading-[1.85] ${
                    block.bold ? "font-bold text-white" : "text-white/90"
                  } ${spacing}`}
                >
                  <RichTextView nodes={block.p} />
                </p>
              );
            })}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
