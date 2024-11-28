import { Router } from "express";
import { SuggestionsController } from "../controllers/suggestions.controller";

const router = Router()
const suggestionsController = new SuggestionsController();

router.get('/fetch', suggestionsController.fetchSuggestions)

export default router;