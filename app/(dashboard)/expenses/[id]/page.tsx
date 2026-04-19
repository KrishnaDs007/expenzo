export default async function ExpenseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Expense Detail</h1>
      <p>Expense ID: {id}</p>
    </div>
  );
}
