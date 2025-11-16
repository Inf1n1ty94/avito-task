import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ActivityChart({ data }) {
  if (!data) return null;

  const chartData = data.map((d) => ({
    date: d.date.split("-").reverse().join(".").slice(0, 5),
    total: d.approved + d.rejected + d.requestChanges,
  }));

  return (
    <Card>
      <CardContent sx={{width: "400px"}}>
        <Typography variant="h6" mb={2}>
          Активность за недавний период
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
