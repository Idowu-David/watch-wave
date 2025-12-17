import ResultCard from "./ResultCard";

type Props = {
  title: string;
  items: any[];
};

export default function Row({ title, items }: Props) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto">
        {items.map((item) => (
          <div key={item.id} className="min-w-37.5">
            <ResultCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
