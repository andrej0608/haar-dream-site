import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

/** Consistente sectiekop voor alle secties. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
