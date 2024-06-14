'use client';

import { Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Arms', value: 40 },
  { name: 'Chest', value: 30 },
  { name: 'Back', value: 20 },
  { name: 'Legs', value: 10 },
];

export function Overview() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="hsl(var(--primary))" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
