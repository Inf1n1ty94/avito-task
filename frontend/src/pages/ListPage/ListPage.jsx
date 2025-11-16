import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAds } from "../../services/api";
import AdCard from "../../components/AdCard/AdCard";
import PaginationBlock from "../../components/PaginationBlock/PaginationBlock";
import Navbar from "../../components/Navbar/Navbar";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
} from "@mui/material";

export default function ListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "ads",
      page,
      search,
      status,
      categoryId,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getAds({
        page,
        search,
        status,
        categoryId,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
  });

  const resetFilters = () => {
    setSearch("");
    setStatus([]);
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  return (
    <>
      <Navbar />

      <Box sx={{ mb: 3, mt: 3 }}>
        {/*поиск по названию */}
        <TextField
          label="Поиск по названию"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* выбор статуса */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            multiple
            value={status}
            label="Статус"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="pending">На модерации</MenuItem>
            <MenuItem value="approved">Одобрено</MenuItem>
            <MenuItem value="rejected">Отклонено</MenuItem>
          </Select>
        </FormControl>

        {/* выбор категории */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={categoryId}
            label="Категория"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <MenuItem value="">Все категории</MenuItem>
            <MenuItem value="0">Электроника</MenuItem>
            <MenuItem value="1">Недвижимость</MenuItem>
            <MenuItem value="2">Транспорт</MenuItem>
            <MenuItem value="3">Работа</MenuItem>
            <MenuItem value="4">Услуги</MenuItem>
            <MenuItem value="5">Животные</MenuItem>
            <MenuItem value="6">Мода</MenuItem>
            <MenuItem value="7">Детское</MenuItem>
          </Select>
        </FormControl>

        {/* выбор минимальной/максимальной цены */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Цена от"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            fullWidth
          />
          <TextField
            label="Цена до"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            fullWidth
          />
        </Box>

        {/* сортировка */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Сортировать по</InputLabel>
          <Select
            value={sortBy}
            label="Сортировать по"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="createdAt">Дате</MenuItem>
            <MenuItem value="price">Цене</MenuItem>
            <MenuItem value="priority">Приоритету</MenuItem>
          </Select>
        </FormControl>

        {/* порядок сортировки */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Порядок</InputLabel>
          <Select
            value={sortOrder}
            label="Порядок"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="desc">По убыванию</MenuItem>
            <MenuItem value="asc">По возрастанию</MenuItem>
          </Select>
        </FormControl>

        {/* кнопка для сброса фильтров */}
        <Button
          variant="outlined"
          color="error"
          onClick={resetFilters}
          sx={{ mb: 3 }}
        >
          Сбросить фильтры
        </Button>

        {/* загрузка и ошибка */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && <p style={{ textAlign: "center" }}>Ошибка загрузки данных.</p>}

        {/* основной контен + пагинация */}
        {!isLoading && data && (
          <>
            <Grid container spacing={3} justifyContent={"center"}>
              {data.ads.map((ad) => (
                <Grid key={ad.id}>
                  <AdCard ad={ad} />
                </Grid>
              ))}
            </Grid>

            <PaginationBlock
              page={page}
              totalPages={data.pagination.totalPages || 1}
              onChange={(value) => setPage(value)}
            />
            

            <Typography mt={3}>
              Всего: {data.pagination.totalItems} объявлений
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}