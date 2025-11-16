import React from "react";
import { Pagination, Stack } from "@mui/material";

export default function PaginationBlock({ page, totalPages, onChange }) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        color="primary"
      />
    </Stack>
  );
}
