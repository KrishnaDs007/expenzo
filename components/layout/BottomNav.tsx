'use client';

// Bottom navigation for mobile-first layout
export default function BottomNav() {
  return (
    <nav className="fixed bottom-16 left-0 right-0 bg-white border-t z-40">
      <div className="flex justify-around items-center py-2 max-w-2xl mx-auto">
        {/* TODO: Add navigation items - Home, Groups, Settings */}
        <span className="text-xs text-gray-500">Home</span>
        <span className="text-xs text-gray-500">Groups</span>
        <span className="text-xs text-gray-500">Settings</span>
      </div>
    </nav>
  );
}
