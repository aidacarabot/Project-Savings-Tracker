import {useState} from 'react';
import { Legend, Pie, PieChart, Tooltip, Cell } from 'recharts';

const data01 = [
  { "name": "Home 🏠", "value": 450, fill: "#0d47a1", darkFill: "#7D9BB3" },
  { "name": "Transportation 🚗", "value": 320, fill: "#1565c0", darkFill: "#D68F7F" },
  { "name": "Food & Groceries 🍽️", "value": 500, fill: "#1976d2", darkFill: "#A577A0" },
  { "name": "Health & Wellness 🏥", "value": 250, fill: "#1e88e5", darkFill: "#77B49A" },
  { "name": "Leisure & Entertainment 🎭", "value": 180, fill: "#2196f3", darkFill: "#E5B183" },
  { "name": "Travel ✈️", "value": 600, fill: "#42a5f5", darkFill: "#42a5f5" },
  { "name": "Subscriptions 💳", "value": 120, fill: "#90caf9", darkFill: "#96C5D7" },
  { "name": "Shopping 🛍️", "value": 220, fill: "#bbdefb", darkFill: "#DFA59F" },
  { "name": "Education 📚", "value": 150, fill: "#e3f2fd", darkFill: "#A1C6D5" },
  { "name": "Gifts 🎁", "value": 130, fill: "#023e8a", darkFill: "#8CCF7E" },
  { "name": "Debt 🏦", "value": 800, fill: "#01497c", darkFill: "#C0A3A4" },
  { "name": "Other ❓", "value": 50, fill: "#2a6f97", darkFill: "#D2E29B" }
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
  if (value === 0) return null;  // Si el valor es 0, no se muestra la etiqueta

  // Ajustar el radio para que las etiquetas estén fuera del pie
  const radius = outerRadius + 10;  // Ajusta el 10 según el espacio que necesites
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}  {/* Mostrar solo el porcentaje */}
    </text>
  );
};


const PieChartExpenses = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <PieChart width={800} height={350}>
      <Pie
        data={data01}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        outerRadius={120}
        isAnimationActive={true}
        stroke="white"
        strokeWidth={4}
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {data01.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={hoveredIndex === index ? entry.darkFill : entry.fill}
            onMouseEnter={() => setHoveredIndex(index)} 
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </Pie>
      <Legend 
        iconType='circle' 
        wrapperStyle={{ fontSize: '12px' }}
        />
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(31, 41, 55, 0.8)',  // Dark background similar to Shadcn
          borderColor: '#4B5563',  // Dark border for tooltip
          borderRadius: '8px',  // Rounded corners
          padding: '5px',  // Padding inside the tooltip
        }}
        itemStyle={{
          color: '#E5E7EB',  // Light text color for better contrast
          fontSize: '10px',  // Slightly larger font
          fontWeight: '500',  // Medium weight
        }}
        separator="‎ ‎‎ ‎ ‎ ‎ $ "
      />
    </PieChart>
  )
};

export default PieChartExpenses;