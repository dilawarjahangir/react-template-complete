import React, { useEffect, useState } from "react";
import {
  Container, Paper, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import apiService from "../../../services/apiService";
import AppLayout from "../../../components/layout/AppLayout";
import toast from "../../../services/ToastService";

const History = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService().get("/api/history")
      .then(({ data }) => setRows(data.history))
      .catch(() => toast.error("Failed to fetch history"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ my:2 }}>Feedback History</Typography>

        {loading ? <CircularProgress/> :
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell><TableCell>Clarity</TableCell>
                <TableCell>Grammar</TableCell><TableCell>Structure</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{dayjs(r.created_at).format("YYYY-MM-DD HH:mm")}</TableCell>
                  <TableCell>{r.clarity_score}</TableCell>
                  <TableCell>{r.grammar_score}</TableCell>
                  <TableCell>{r.structure_score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>}
      </Container>
    </AppLayout>
  );
};

export default History;
