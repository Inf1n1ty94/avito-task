import { Card, Typography } from "@mui/material";
import { useState } from "react";
import PaginationBlock from "../PaginationBlock/PaginationBlock";

export default function ModerationHistory({ ad }) {
  const [page, setPage] = useState(1);
  
  // вычисления для отображения истории модерации и пагинации
  const itemsPerPage = 3;

  const totalItems = ad.moderationHistory.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = ad.moderationHistory.slice(startIndex, endIndex);

  return (
    <div>
      <Typography variant="h6" mb={2}>
        История модерации
      </Typography>

      {ad.moderationHistory.length === 0 && (
        <Typography>История отсутствует</Typography>
      )}

      {/* история модерации */}
      {currentItems.map((moderationHistory) => (
        <Card key={moderationHistory.id} sx={{ p: 2, mb: 2 }}>
          <Typography>
            <b>Статус:</b> {moderationHistory.comment}
          </Typography>

          {moderationHistory.reason && (
            <Typography>
              <b>Причина:</b> {moderationHistory.reason}
            </Typography>
          )}

          <Typography>
            <b>Дата:</b>{" "}
            {moderationHistory.timestamp
              .split("T")[0]
              .split("-")
              .reverse()
              .join(".") +
              ", " +
              moderationHistory.timestamp.split("T")[1].split(":")[0] +
              ":" +
              moderationHistory.timestamp.split("T")[1].split(":")[1]}
          </Typography>

          <Typography>
            <b>Ответственный за проверку:</b> {moderationHistory.moderatorName}
          </Typography>
        </Card>
      ))}

      {/* пагинация */}
      {totalPages > 1 && (
        <PaginationBlock
          page={page}
          totalPages={totalPages || 1}
          onChange={(value) => setPage(value)}
        />
      )}
    </div>
  );
}
