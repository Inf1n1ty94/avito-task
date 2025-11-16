import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdById,
  approveAd,
  rejectAd,
  requestChangesAd,
} from "../../services/api";
import ModerationHistory from "../../components/ModerationHistory/ModerationHistory.jsx";

import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  CardMedia,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

export default function AdDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useQueryClient();

  const [rejectReason, setRejectReason] = useState("");
  const [template, setTemplate] = useState("");

  const { data: ad, isLoading } = useQuery({
    queryKey: ["ad", id],
    queryFn: () => getAdById(id),
  });

  const approveMutation = useMutation({
    mutationFn: () => approveAd(id),
    onSuccess: () => {
      client.invalidateQueries(["ad", id]);
      client.invalidateQueries(["ads"]);
      navigate("/");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectAd(id, { reason: rejectReason }),
    onSuccess: () => {
      client.invalidateQueries(["ad", id]);
      client.invalidateQueries(["ads"]);
      navigate("/");
    },
  });

  const requestChangesMutation = useMutation({
    mutationFn: () => requestChangesAd(id, { reason: rejectReason }),
    onSuccess: () => {
      client.invalidateQueries(["ad", id]);
      client.invalidateQueries(["ads"]);
      navigate("/");
    },
  });

  useEffect(() => {
    if (template === "Другое") {
      setRejectReason("");
    } else if (template) {
      setRejectReason(template);
    }
  }, [template]);

  function Hotkeys(id, navigate, approve) {
    useEffect(() => {
      const handleKey = (event) => {
        if (event.key === "ArrowLeft") {
          navigate(`/ads/${Number(id) - 1}`);
        } else if (event.key === "ArrowRight") {
          navigate(`/ads/${Number(id) + 1}`);
        } else if (
          event.key.toLowerCase() === "a" &&
          (ad.status === "rejected" || ad.status === "pending")
        ) {
          approve();
        }
      };

      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [id, navigate, approve]);
  }

  Hotkeys(id, navigate, () => approveMutation.mutate());

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ad) return <p>Объявление не найдено</p>;

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Укажите причину");
      return;
    }
    rejectMutation.mutate();
  };

  const handleRequestChanges = () => {
    if (!rejectReason.trim()) {
      alert("Укажите причину");
      return;
    }
    requestChangesMutation.mutate();
  };

  return (
    <Box>
      <Box display="flex" gap={2} justifyContent={"center"} mb={3}>
        <Button
          variant="outlined"
          component={Link}
          to={`/ads/${Number(id) - 1}`}
        >
          Предыдущее
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Назад
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to={`/ads/${Number(id) + 1}`}
        >
          Следующее
        </Button>
      </Box>

      {/* свайпер изображений */}
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: false }}
      >
        {ad.images.map((img, index) => (
          <SwiperSlide key={index}>
            <CardMedia component="img" height="240" image={img} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Typography variant="h5" mt={5}>
        {ad.title}
      </Typography>

      <Box display="flex" justifyContent="center">
        <Grid container columns={2} columnSpacing={20} mt={5}>
          {/* описание и характеристики */}
          <Stack width={"500px"}>
            <Grid>
              <Typography variant="h6" mb={1}>
                Описание
              </Typography>
              <Typography mb={3}>{ad.description}</Typography>

              <Typography variant="h6" mb={1}>
                Характеристики
              </Typography>

              <Table>
                <TableBody>
                  {Object.entries(ad.characteristics).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Stack>

          {/* информация о продавце */}
          <Stack width={"500px"}>
            <Grid>
              <Box>
                <Typography variant="h6">Продавец</Typography>
                <Typography>ФИО: {ad.seller.name}</Typography>
                <Typography>
                  На площадке с:{" "}
                  {ad.seller.registeredAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join(".")}
                </Typography>
                <Typography>Всего объявлений: {ad.seller.totalAds}</Typography>
                <Typography>Рейтинг продавца: {ad.seller.rating}</Typography>
              </Box>
            </Grid>
          </Stack>
        </Grid>
      </Box>
      <Grid container columns={2} justifyContent={"space-evenly"} mt={3}>
        {/* история модерации */}
        <Box mt={5}>
          <ModerationHistory ad={ad} />
        </Box>

        {/* модерация объявления */}
        <Box mt={5} width={425}>
          <Typography variant="h5" mb={2}>
            Управление модерацией
          </Typography>

          <Stack gap={2} mb={3}>
            {/* кнопки отображаются в зависимости от статуса объявления */}
            {ad.status !== "approved" && (
              <Button
                variant="contained"
                color="success"
                onClick={() => approveMutation.mutate()}
              >
                Одобрить
              </Button>
            )}

            <Button
              variant="contained"
              color="warning"
              onClick={handleRequestChanges}
            >
              На доработку
            </Button>
          </Stack>

          <Box mt={3} p={2} border="1px solid #ccc" borderRadius={2}>
            <Typography mb={1}>Причина отклонения/доработки</Typography>

            <TextField
              fullWidth
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              label="Причина"
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Шаблон"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              <MenuItem value=" ">Не выбрано</MenuItem>
              <MenuItem value="Запрещенный товар">Запрещенный товар</MenuItem>
              <MenuItem value="Неверная категория">Неверная категория</MenuItem>
              <MenuItem value="Некорректное описание">
                Некорректное описание
              </MenuItem>
              <MenuItem value="Проблемы с фото">Проблемы с фото</MenuItem>
              <MenuItem value="Подозрение на мошенничество">
                Подозрение на мошенничество
              </MenuItem>
              <MenuItem value="Другое">Другое</MenuItem>
            </TextField>
          </Box>
          {ad.status !== "rejected" && (
            <Button
              variant="contained"
              color="error"
              onClick={handleReject}
              sx={{ mt: 2 }}
            >
              Отклонить
            </Button>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
