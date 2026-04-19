"use client";

import { useState, useEffect } from "react";
import { Mic, Send, Edit3, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

type ExpenseDraft = {
  amount: number | "";
  description: string;
  category: string;
  date: string;
  paymentMethod: string;
  paidBy: string;
  splitWith: string[];
  splitType: string;
  isRecurring: boolean;
  recurringInterval: string;
};

const DEFAULT_DRAFT: ExpenseDraft = {
  amount: "",
  description: "",
  category: "Other",
  date: new Date().toISOString().split("T")[0],
  paymentMethod: "UPI",
  paidBy: "me",
  splitWith: [],
  splitType: "none",
  isRecurring: false,
  recurringInterval: "none",
};

export default function AddExpenseSheet() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"input" | "parsing" | "refine">("input");
  const [inputStr, setInputStr] = useState("");
  const [draft, setDraft] = useState<ExpenseDraft>(DEFAULT_DRAFT);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
      setStep("input");
      setInputStr("");
      setError("");
      setDraft(DEFAULT_DRAFT);
    };
    document.addEventListener("open-quick-add", handleOpen);
    return () => document.removeEventListener("open-quick-add", handleOpen);
  }, []);

  const handleParse = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputStr.trim() || step === "parsing") return;
    
    setStep("parsing");
    setError("");
    try {
      const response = await fetch('/api/parse-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputStr }),
      });
      const data = await response.json();
      if (data.success) {
        setDraft({ ...DEFAULT_DRAFT, ...data.data });
        setStep("refine");
      } else {
        setError(data.error);
        setStep("input");
      }
    } catch (err) {
      setError("Failed to parse expense");
      setStep("input");
    }
  };

  const handleManual = () => {
    setDraft(DEFAULT_DRAFT);
    setStep("refine");
  };

  const handleSave = async () => {
    // Here we would save to the database using Drizzle
    console.log("Saving expense:", draft);
    setOpen(false);
    // Reset after close
    setTimeout(() => {
      setStep("input");
      setInputStr("");
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="rounded-t-3xl min-h-[50vh] sm:max-w-md mx-auto sm:mb-8 sm:rounded-3xl p-6">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-bold">
            {step === "refine" ? "Review Details" : "Add Expense"}
          </SheetTitle>
        </SheetHeader>

        {step === "input" || step === "parsing" ? (
          <div className="mt-6 flex flex-col items-center justify-center space-y-6">
            
            <div className="w-full text-center space-y-2">
              <p className="text-muted-foreground text-sm">
                Describe your expense or hit manual.
              </p>
              <div className="relative">
                <Input
                  autoFocus
                  value={inputStr}
                  onChange={(e) => setInputStr(e.target.value)}
                  placeholder="e.g. Paid 1500 for internet via UPI..."
                  onKeyDown={(e) => e.key === "Enter" && handleParse()}
                  className="h-14 pr-12 rounded-2xl text-base bg-muted/50 border-border/60 focus-visible:ring-expenzo"
                  disabled={step === "parsing"}
                />
                <Button 
                  onClick={handleParse}
                  disabled={!inputStr.trim() || step === "parsing"}
                  size="icon" 
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-expenzo hover:bg-expenzo-dark"
                >
                  {step === "parsing" ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            </div>

            <Button 
              variant="ghost" 
              onClick={handleManual}
              disabled={step === "parsing"}
              className="text-expenzo hover:text-expenzo flex items-center gap-2 mt-4"
            >
              <Edit3 className="w-4 h-4" />
              Add Manually Instead
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-4 max-h-[65vh] overflow-y-auto px-1 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Amount (₹)</label>
                <Input 
                  type="number"
                  value={draft.amount} 
                  onChange={e => setDraft({...draft, amount: Number(e.target.value)})}
                  className="h-12 bg-muted/30 font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Date</label>
                <Input 
                  type="date"
                  value={draft.date} 
                  onChange={e => setDraft({...draft, date: e.target.value})}
                  className="h-12 bg-muted/30"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Description</label>
              <Input 
                value={draft.description} 
                onChange={e => setDraft({...draft, description: e.target.value})}
                className="h-12 bg-muted/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Category</label>
                <select 
                  value={draft.category}
                  onChange={e => setDraft({...draft, category: e.target.value})}
                  className="w-full h-12 rounded-md border border-input bg-muted/30 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-expenzo"
                >
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Entertainment</option>
                  <option>Auto</option>
                  <option>Shopping</option>
                  <option>Utilities</option>
                  <option>Health</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Payment Method</label>
                <select 
                  value={draft.paymentMethod}
                  onChange={e => setDraft({...draft, paymentMethod: e.target.value})}
                  className="w-full h-12 rounded-md border border-input bg-muted/30 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-expenzo"
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>GPay</option>
                  <option>PhonePe</option>
                  <option>Card</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Split With (Group/People)</label>
              <Input 
                value={draft.splitWith.join(", ")} 
                onChange={e => setDraft({...draft, splitWith: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                placeholder="Leave blank if personal"
                className="h-12 bg-muted/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 items-center pt-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input 
                  type="checkbox" 
                  checked={draft.isRecurring}
                  onChange={e => setDraft({...draft, isRecurring: e.target.checked})}
                  className="w-4 h-4 text-expenzo accent-expenzo rounded"
                />
                Recurring?
              </label>

              {draft.isRecurring && (
                <select 
                  value={draft.recurringInterval || "monthly"}
                  onChange={e => setDraft({...draft, recurringInterval: e.target.value})}
                  className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-expenzo"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              )}
            </div>

            <Button 
              onClick={handleSave}
              className="w-full h-12 mt-6 bg-expenzo hover:bg-expenzo-dark text-white rounded-xl shadow-md transition-all font-semibold"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Confirm & Save Expense
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
