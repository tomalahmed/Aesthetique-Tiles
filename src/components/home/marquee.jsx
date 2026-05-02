const marqueeItems = [
  "New Arrivals: Ceramic Blue Tile",
  "Weekly Feature: Modern Geometric Patterns",
  "Join the Community of Tile Designers",
];

export default function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems];

  return (
    <section className="surface-card mt-6 overflow-hidden py-3">
      <div className="marquee-track whitespace-nowrap">
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-6 text-[11px] font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
