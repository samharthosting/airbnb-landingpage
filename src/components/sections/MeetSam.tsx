import Image from "next/image";
import { Reveal } from "../Reveal";

export function MeetSam() {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="headline">Meet Sam</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-photo">
            <Image
              src="/unnamed.jpg"
              alt="Sam, founder of Hart Hosting"
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
            <div className="photo-frame" />
          </Reveal>
          <Reveal className="about-copy">
            <p>
              Hi, I&apos;m Sam, the founder of Hart Hosting. I got my start managing my own
              short-term rental right here in Surrey, and built this business because I kept
              meeting homeowners sitting on properties that could be earning far more than a
              standard lease ever would.
            </p>
            <p>
              I treat every property I manage like my own: hands-on, detail-oriented, and always
              reachable. When you work with Hart Hosting, you&apos;re working directly with me, not
              a call centre, and not a rotating cast of account managers. Unlike large property
              management companies, I intentionally keep my portfolio small so every homeowner
              works directly with me.
            </p>
            <div className="signoff">
              <div>
                <div className="name">Sam</div>
                <div className="role">Founder, Hart Hosting</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
