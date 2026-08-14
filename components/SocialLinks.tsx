import { SOCIAL } from "@/lib/site";
import { TwitterIcon, FacebookIcon } from "./icons";

/**
 * Social circles: 19px glyph centred in a 40px circle with a 2px cyan border.
 * On hover the circle fills cyan with a white glyph.
 */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-[14px] ${className}`}>
      <a
        href={SOCIAL.twitter}
        aria-label="Beer Regatta on X (Twitter)"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan text-white transition-colors duration-150 hover:bg-cyan hover:text-white"
      >
        <TwitterIcon />
      </a>
      <a
        href={SOCIAL.facebook}
        aria-label="Beer Regatta on Facebook"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan text-white transition-colors duration-150 hover:bg-cyan hover:text-white"
      >
        <FacebookIcon />
      </a>
    </div>
  );
}
