// components/stats/CategoriesBarChart.jsx
import { Card, CardContent, Typography } from "@mui/material";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#f44336",
  "#ffa000",
  "#e2f10cff",
  "#4caf50",
  "#15c0ebff",
  "#101ee9ff",
  "#7b10f5ff",
];

export default function CategoriesBarChart({ data }) {
  if (!data) return null;

  const chartData = Object.entries(data).map(([category, value]) => ({
    category,
    value
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Проверенные объявления по категориям
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              outerRadius={90}
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Legend verticalAlign="top" height={36} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
