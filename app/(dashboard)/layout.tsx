// Dashboard layout with bottom nav and QuickAddBar
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {children}
      {/* <QuickAddBar /> */}
      {/* <BottomNav /> */}
    </div>
  );
}
