export default async function GroupDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Group Dashboard</h1>
      <p>Group ID: {id}</p>
      {/* BalanceTable, group expenses */}
    </div>
  );
}
