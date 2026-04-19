'use client';

// Group card for groups list
export default function GroupCard({
  group,
}: {
  group: {
    id: string;
    name: string;
    memberCount: number;
  };
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <h3 className="font-medium">{group.name}</h3>
      <p className="text-xs text-gray-500">{group.memberCount} members</p>
    </div>
  );
}
