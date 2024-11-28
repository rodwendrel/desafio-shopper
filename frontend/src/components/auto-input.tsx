import { useState } from "react";
import api from "@/utils/axios";

interface AutoInputProps {
  onSelect: (value: string) => void;
}

export default function AutoInput({ onSelect }: AutoInputProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("suggestion/fetch", {
        params: { query },
      });
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  return (
    <div className="autocomplete-form" style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Digite um endereço"
        value={input}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-1 w-full"
      />

      {/* Renderizando sugestões */}
      {loading && <p>Carregando sugestões...</p>}
      {!loading && Array.isArray(suggestions) && suggestions.length > 0 && (
        <ul
          className="text-black border p-2"
        >
          {suggestions.map(
            (suggestion: { place_id: string; description: string }) => (
              <li
                key={suggestion.place_id}
                onClick={() => {
                  setInput(suggestion.description);
                  setSuggestions([]);
                  onSelect(suggestion.description);
                }}
                className="cursor-pointer hover:bg-zinc-200"
              >
                {suggestion.description}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
