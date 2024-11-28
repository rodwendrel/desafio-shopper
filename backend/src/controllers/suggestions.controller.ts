import { Request, Response } from "express";
import { SuggestionsService } from "../services/suggestion.service";

const { fetchSuggestions } = new SuggestionsService();

export class SuggestionsController {

  async fetchSuggestions(req: Request, res: Response) {
    const { query } = req.query;
    const suggestions = await fetchSuggestions(query as string);
    res.send(suggestions);
  }

}