import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#4caf50", "#f44336", "#ffa000"];

export default function DecisionsPieChart({ data }) {
  if (!data) return null;

  const chartData = [
    { name: "Одобрено", value: Number(`${data.approved.toFixed(2)}`) },
    { name: "Отклонено", value: Number(`${data.rejected.toFixed(2)}`) },
    { name: "На доработку", value: Number(`${data.requestChanges.toFixed(2)}`) },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Распределение решений
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
