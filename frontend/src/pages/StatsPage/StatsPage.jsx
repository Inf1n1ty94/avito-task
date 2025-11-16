// pages/StatsPage.jsx
import { useQuery } from "@tanstack/react-query";
import {
  getStatsSummary,
  getActivityChart,
  getDecisionsChart,
  getCategoriesChart,
  getModeratorInfo,
} from "../../services/api";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import MetricsCards from "../../components/stats/MetricCards/MetricsCards";
import ActivityChart from "../../components/stats/ActivityChart/ActivityChart";
import DecisionsPieChart from "../../components/stats/Decisions/DecisionsPieChart";
import CategoriesBarChart from "../../components/stats/Categories/Categories";
import Navbar from "../../components/Navbar/Navbar";

export default function StatsPage() {
  const { data: moderator } = useQuery({
    queryKey: ["moderatorInfo"],
    queryFn: getModeratorInfo,
  });

  const { data: summary } = useQuery({
    queryKey: ["statsSummary"],
    queryFn: getStatsSummary,
  });

  const { data: activity } = useQuery({
    queryKey: ["activityChart"],
    queryFn: getActivityChart,
  });

  const { data: decisions } = useQuery({
    queryKey: ["decisionsChart"],
    queryFn: getDecisionsChart,
  });

  const { data: categories } = useQuery({
    queryKey: ["categoriesChart"],
    queryFn: getCategoriesChart,
  });

  return (
    <Box p={4}>
      <Navbar />
      
      {/* модератор */}
      {moderator && (
        <Card sx={{ mt: 3, mb: 3, backgroundColor: "#1976D2" }}>
          <CardContent>
            <Typography color="#fff" variant="h5" gutterBottom>
              {moderator.name}
            </Typography>
            <Typography color="#fff" gutterBottom>
              {moderator.role}
            </Typography>
            <Typography color="#fff" variant="body1">
              Всего проверено: <strong>{moderator.statistics.totalReviewed}</strong>
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* статистика */}
      <Typography variant="h5" mb={2}>
        Общая статистика платформы
      </Typography>

      <MetricsCards stats={summary} activity={activity}/>

      {/* графики */}
      <Grid container spacing={3}>
        <Grid>
          <ActivityChart data={activity} />
        </Grid>
        <Grid>
          <DecisionsPieChart data={decisions} />
        </Grid>
        <Grid>
          <CategoriesBarChart data={categories} />
        </Grid>
      </Grid>
    </Box>
  );
}