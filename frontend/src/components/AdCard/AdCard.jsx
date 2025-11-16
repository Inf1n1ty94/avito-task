import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
  Grid,
  Stack
} from "@mui/material";
import { Link } from "react-router-dom";

export default function AdCard({ ad }) {
  const date = ad.createdAt;
  let statusColor;
  let textDecorationStyle;

  // подчеркивание/нет по приоритету
  ad.priority === "urgent" ? textDecorationStyle = "underline" : "none";
  
  // разные цвета для разного статуса объявлений
  ad.status === "approved" ? statusColor = "green" :
  ad.status === "rejected" ? statusColor = "red" :
                             statusColor = "orange";

  return (
    
    <Box sx={{ width: "300px", height: "340px" }}>
      <Card>
        
        {/* изображение */}
        <CardMedia
          component="img"
          height="140"
          image={ad.images[0]}
          alt={ad.title}
        />
        
        {/* контент внутри карточки */}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {ad.title.split(":")[1]}
          </Typography>
          <Grid container justifyContent={"space-between"} columns={2}>
            <Stack  ml={2}>  
              <Grid>
                <Typography variant="body2" color="text.secondary">
                  {ad.category}
                </Typography>
              </Grid>
              <Grid>        
                  <Typography variant="body2" color="text.secondary">
                    {date.split("T")[0].split("-").reverse().join(".")}
                  </Typography>
              </Grid>
            </Stack>
            <Stack> 
              <Grid>  
                <Typography variant="body2" color={statusColor}>
                  {ad.status === "pending" ? "На модерации" : ad.status === "approved" ? "Одобрено" : ad.status === "draft" ? "На доработке": "Отклонено"}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body2" color="text.secondary" sx={{textDecoration: textDecorationStyle }}>
                  {ad.priority === "urgent" ? "Срочное" : "Обычное"}
                </Typography>
              </Grid>
            </Stack>  
          </Grid>
        </CardContent>
        
        {/* кнопка подробнее */}
        <CardActions>
          <Box display={"flex"} alignItems={"center"} gap={12}>
            <Button
              size="small"
              variant="contained"
              color="success"
              component={Link}
              to={`/ads/${ad.id}`}
              sx={{ml: 1}}
            >
              Подробнее
            </Button>
            <Typography variant="body1" color="black" fontWeight={"bold"}>
              {ad.price + " ₽"}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
