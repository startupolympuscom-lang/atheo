import { Users, Briefcase, Layers } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { MomentumArc } from "@/components/brand/MomentumArc";
import { AtheoMark } from "@/components/brand/AtheoMark";
import { ECOSYSTEM_NODES, TECHNOLOGY_PRODUCTS } from "@/lib/data";
import { SECTION_IDS } from "@/lib/routes";

const NODE_ICONS = [Users, Briefcase, Layers];

export function FutureEcosystem() {
  return (
    <Section id={SECTION_IDS.about} tone="white" className="overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-0 opacity-[0.04]" aria-hidden="true">
        <AtheoMark size={560} />
      </div>

      <div className="relative max-w-2xl">
        <p className="eyebrow">What Atheo Becomes</p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-atheo-aubergine sm:text-4xl lg:text-5xl">
          From representation to creator infrastructure.
        </h2>
        <p className="mt-6 text-atheo-aubergine-soft">
          A trusted operating layer where talent, brands and technology grow together.
        </p>
      </div>

      <MomentumArc
        className="relative mt-16"
        items={ECOSYSTEM_NODES.map((node, i) => {
          const Icon = NODE_ICONS[i];
          return {
            marker: (
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-atheo-coral bg-atheo-white text-atheo-coral shadow-[0_10px_25px_-15px_rgba(255,69,80,0.5)]">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
            ),
            content: (
              <div key={node.title}>
                <p className="eyebrow">{node.title}</p>
                <p className="mt-1 font-display font-semibold text-atheo-aubergine">{node.description}</p>
                {node.title === "Technology" && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {TECHNOLOGY_PRODUCTS.map((product) => (
                      <li
                        key={product}
                        className="rounded-full border border-atheo-line px-3 py-1 text-xs font-medium text-atheo-aubergine-soft"
                      >
                        {product}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
          };
        })}
      />
    </Section>
  );
}
