import { Reveal } from "../Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const FAQS = [
  {
    q: "Do I need to be an experienced host to work with Hart Hosting?",
    a: "Not at all. Most homeowners I work with have never hosted before. I handle setup, pricing, guest communication, and day-to-day management so you don't have to.",
  },
  {
    q: "What kind of properties do you manage?",
    a: "Basement suites, laneway homes, condos, and investment properties across Surrey and the Lower Mainland.",
  },
  {
    q: "How much can I expect to earn?",
    a: "It depends on your property's location, size, and condition. That's exactly what the Free Property Income Assessment is for: I'll give you a realistic estimate based on your specific property.",
  },
  {
    q: "Is short-term rental hosting legal in my city?",
    a: "Regulations vary by municipality. Part of the assessment process includes reviewing your property against current local short-term rental rules before we move forward.",
  },
  {
    q: "How involved do I need to be?",
    a: "As little or as much as you'd like. Most homeowners choose a fully hands-off arrangement, and I manage everything from guest communication to cleaning coordination.",
  },
  {
    q: "How does payment work?",
    a: "Revenue is collected through the platform and paid out to you on a clear, agreed schedule after my management fee.",
  },
  {
    q: "Is there a contract or minimum commitment?",
    a: "Terms are discussed and agreed upon during your Property Income Assessment, with flexibility built in.",
  },
];

function FaqColumn({ items }: { items: { q: string; a: string; index: number }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <AccordionItem key={item.q} value={`faq-${item.index}`}>
          <AccordionTrigger className="py-6    text-[16.5px] [font-family:var(--font-heading)] font-bold">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-[15.5px] leading-relaxed [font-family:var(--font-body)]">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </div>
  );
}

export function Faq() {
  const half = Math.ceil(FAQS.length / 2);
  const indexed = FAQS.map((item, index) => ({ ...item, index }));
  const leftFaqs = indexed.slice(0, half);
  const rightFaqs = indexed.slice(half);

  return (
    <section className="sec on-sand" id="faq">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">Frequently Asked Questions</h2>
        </Reveal>
        <Reveal as="div" className="mt-13">
          <Accordion defaultValue={["faq-0"]} className="grid grid-cols-1 items-start gap-x-14 md:grid-cols-2">
            <FaqColumn items={leftFaqs} />
            <FaqColumn items={rightFaqs} />
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
