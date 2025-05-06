import React, { useEffect, useState } from "react";
import {
  Container, Paper, Typography, Grid, CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import apiService from "../../../services/apiService";
import AppLayout from "../../../components/layout/AppLayout";
import toast from "../../../services/ToastService";

const ScoreBox = ({ label, value }) => (
  <Paper elevation={3} sx={{ p:2, textAlign:"center" }}>
    <Typography variant="h6">{label}</Typography>
    <Typography variant="h4">{value ?? "—"}</Typography>
  </Paper>
);

const Dashboard = () => {
  // If redirected from TextForm we have state
  const { state } = useLocation();
  const [analysis, setAnalysis] = useState(state?.analysis);
  const [loading, setLoading] = useState(!state?.analysis);

  useEffect(() => {
    if (analysis) return;
    const fetchLatest = async () => {
      try {
        const { data } = await apiService().get("/api/history/latest");
        setAnalysis(data.analysis);
      } catch {
        toast.error("Could not load latest feedback");
      } finally { setLoading(false); }
    };
    fetchLatest();
  }, [analysis]);

  if (loading) return (
    <AppLayout>
      <Container sx={{ mt:4, textAlign:"center" }}><CircularProgress /></Container>
    </AppLayout>
  );

  if (!analysis) return (
    <AppLayout>
      <Container sx={{ mt:4, textAlign:"center" }}>
        <Typography>No analysis yet. Click “New Feedback”.</Typography>
      </Container>
    </AppLayout>
  );

  return (
    <AppLayout>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ my:2 }}>
          Latest Feedback
        </Typography>

        <Grid container spacing={2}>
          {["clarity","grammar","structure"].map((k) => (
            <Grid item xs={12} sm={4} key={k}>
              <ScoreBox label={`${k.charAt(0).toUpperCase()+k.slice(1)} Score`} value={analysis[`${k}_score`]} />
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p:3, mt:3 }}>
          <Typography variant="h6" gutterBottom>Suggestions</Typography>
          <ul>
            {analysis.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
