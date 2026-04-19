"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickAddBar() {
  const [input, setInput] = useState("");

  const [isParsing, setIsParsing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isParsing) return;
    
    setIsParsing(true);
    try {
      const response = await fetch('/api/parse-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      
      const data = await response.json();
      if (data.success) {
        alert("Parsed Successfully: \n" + JSON.stringify(data.data, null, 2));
        setInput("");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Failed to parse expense");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent z-40 sm:relative sm:bg-none sm:p-0">
      <div className="max-w-3xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-background border border-border/60 rounded-full p-1.5 shadow-lg shadow-black/5"
        >
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="rounded-full flex-shrink-0 text-muted-foreground hover:text-expenzo"
          >
            <Mic className="w-5 h-5" />
          </Button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., Paid 850 for pizza with Amit..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 text-foreground placeholder:text-muted-foreground"
          />
          
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isParsing}
            className="rounded-full flex-shrink-0 bg-expenzo text-white hover:bg-expenzo-dark transition-colors disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground"
          >
            {isParsing ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4 ml-0.5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
