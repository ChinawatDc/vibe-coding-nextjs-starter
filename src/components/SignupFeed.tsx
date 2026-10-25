type Signup = {
  id: string;
  name: string;
  note: string | null;
  createdAt: Date;
};

export function SignupFeed({ items }: { items: Signup[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted">
        ยังไม่มีรายชื่อ — เป็นคนแรกที่ลอง Server Action ได้เลย
      </p>
    );
  }

  return (
    <ul className="divide-y divide-line/60">
      {items.map((item) => (
        <li key={item.id} className="flex items-start justify-between gap-4 py-3">
          <div>
            <p className="font-medium text-ink">{item.name}</p>
            {item.note ? (
              <p className="mt-0.5 text-sm text-muted">{item.note}</p>
            ) : null}
          </div>
          <time
            dateTime={item.createdAt.toISOString()}
            className="shrink-0 font-mono text-xs text-muted"
          >
            {item.createdAt.toLocaleString("th-TH", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </time>
        </li>
      ))}
    </ul>
  );
}
