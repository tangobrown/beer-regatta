import Footer from "@/components/Footer";
import { SOCIAL } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-navy px-5 pb-[72px] pt-[72px] text-center sm:px-8 lg:px-14 lg:pt-[96px] xl:px-[72px]"
    >
      <h2 className="mb-[18px] font-sans text-h2-contact font-bold text-cyan">Any Questions?</h2>
      <p className="mx-auto mb-[30px] max-w-[520px] text-body-muted text-white/90">
        We&rsquo;d love to hear your questions or suggestions about Beer Regatta.
        <br />
        You can get in touch by contacting a member of the committee or…
      </p>
      <a
        href={SOCIAL.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto block w-full max-w-[420px] bg-cyan px-[30px] py-[14px] text-center font-sans text-body-muted font-bold text-white transition-colors duration-150 hover:bg-cyan-hover sm:inline-block sm:w-auto sm:max-w-none"
      >
        Post a Question on our Facebook Page
      </a>

      <Footer wrap={false} />
    </section>
  );
}
