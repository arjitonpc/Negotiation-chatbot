import express from "express";
import { createNegotiation, addMessage, getLogs, getTerms, finalizeRecap } from "../services/negotiationService.js";

const router = express.Router();

router.post("/create", (req, res) => {
  const negotiation = createNegotiation(req.body.title);
  res.json(negotiation);
});

router.post("/:id/message", (req, res) => {
  const message = addMessage(req.params.id, req.body);
  res.json(message);
});

router.get("/:id/logs", (req, res) => {
  const logs = getLogs(req.params.id);
  res.json(logs);
});

router.get("/:id/terms", (req, res) => {
  const terms = getTerms(req.params.id);
  res.json(terms);
});

router.post("/:id/finalize", (req, res) => {
  const recap = finalizeRecap(req.params.id);
  res.json(recap);
});

export default router;
