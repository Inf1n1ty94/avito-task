// components/stats/MetricCards/MetricsCards.jsx
import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function MetricsCards({ stats, activity }) {
  if (!stats) return null;

  const items = [
    {
      label: "Сегодня",
      value:
        activity?.at(-1).approved +
        activity?.at(-1).rejected +
        activity?.at(-1).requestChanges,
    },
    {
      label: "За неделю",
      value:
        activity?.reduce(
          (sum, day) =>
            sum +
            (day.approved || 0) +
            (day.rejected || 0) +
            (day.requestChanges || 0),
          0
        ) || 0,
    },
    { label: "За месяц", value: stats.totalReviewedThisMonth },
    { label: "Одобрено", value: `${stats.approvedPercentage.toFixed(2)}%` },
    { label: "Отклонено", value: `${stats.rejectedPercentage.toFixed(2)}%` },
    {
      label: "На доработку",
      value: `${stats.requestChangesPercentage.toFixed(2)}%`,
    },
    { label: "Ср. время (сек)", value: stats.averageReviewTime },
  ];

  return (
    <Grid container spacing={3} mb={4} justifyContent={"center"}>
      {items.map((item) => (
        <Grid key={item.label}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2">
                {item.label}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
