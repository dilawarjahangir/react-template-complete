import React, { useState } from "react";
import {
  Box, Button, Container, Grid, TextField, Typography, Paper,
} from "@mui/material";
import AppLayout from "../../../components/layout/AppLayout";
import apiService from "../../../services/apiService";
import toast from "../../../services/ToastService";
import { useNavigate } from "react-router-dom";

const TextForm = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const content = await file.text();
    setText(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.warning("Please enter some text.");
    try {
      const { data } = await apiService().post("/api/analyze-text", { text });
      if (data.success) {
        toast.success("Analysis complete!");
        navigate("/", { state: { analysis: data.analysis } });
      }
    } catch {
      toast.error("Analysis failed");
    }
  };

  return (
    <AppLayout>
      <Container maxWidth="md">
        <Paper sx={{ p:3 }}>
          <Typography variant="h6" gutterBottom>New Text Feedback</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="outlined" component="label">
                  Upload .txt
                  <input type="file" hidden accept=".txt" onChange={handleFile}/>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Paste text here"
                  multiline rows={10}
                  fullWidth
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">Analyze</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default TextForm;
