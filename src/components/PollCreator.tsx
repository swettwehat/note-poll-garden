
import { useState } from "react";
import { toast } from "sonner";
import { BarChart3, Plus, Trash2, ChevronDown } from "lucide-react";
import QRCode from "./QRCode";

const PollCreator = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state

  const MAX_FREE_POLLS = 1;

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      toast.error("A poll must have at least 2 options");
      return;
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    if (options.some(option => !option.trim())) {
      toast.error("All options must be filled");
      return;
    }

    if (!isLoggedIn && pollCount >= MAX_FREE_POLLS) {
      toast.error("Free tier limit reached. Please log in for unlimited access.");
      return;
    }

    try {
      // Generate a random ID for the poll (in production, this would be a more secure method)
      const id = Math.random().toString(36).substring(2, 10);
      
      // In a real app, here we would save the poll to a database
      localStorage.setItem(`poll_${id}`, JSON.stringify({
        question,
        options,
        votes: options.map(() => 0),
        created: new Date().toISOString()
      }));
      
      setGeneratedId(id);
      setShowQR(true);
      
      if (!isLoggedIn) {
        setPollCount(pollCount + 1);
      }
      
      toast.success("Poll created successfully!");
    } catch (error) {
      toast.error("Failed to create poll. Please try again.");
    }
  };

  const getPollUrl = (id: string) => {
    return `${window.location.origin}/poll/${id}`;
  };

  const getResultsUrl = (id: string) => {
    return `${window.location.origin}/poll-results/${id}`;
  };

  return (
    <section id="polls" className="py-20 px-6 md:px-12 bg-gradient-to-b from-theme-black to-theme-darkGray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-green/10 rounded-2xl mb-4">
            <BarChart3 className="h-8 w-8 text-theme-green" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Interactive Polls
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Create polls, share the QR code, and collect responses in real-time. Perfect for classrooms, events, and team meetings.
          </p>
          {!isLoggedIn && (
            <div className="mt-4 text-sm text-theme-green/80">
              <span className="font-medium">{MAX_FREE_POLLS - pollCount} free poll</span> remaining. Login for unlimited access.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="card-primary">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question..."
                className="input-primary w-full"
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Options</label>
                <span className="text-xs text-foreground/60">
                  {options.length} options
                </span>
              </div>
              
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="input-primary flex-1"
                    />
                    <button
                      onClick={() => removeOption(index)}
                      className="p-2 text-foreground/60 hover:text-destructive transition-colors duration-300"
                      aria-label="Remove option"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={addOption}
                className="mt-3 flex items-center text-sm font-medium text-theme-green hover:text-theme-lightGreen transition-colors duration-300"
              >
                <Plus className="h-4 w-4 mr-1" /> Add option
              </button>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="btn-primary"
                onClick={createPoll}
                disabled={!question.trim() || options.some(option => !option.trim())}
              >
                Create Poll
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className={`flex justify-center items-center min-h-[400px] w-full ${!showQR && "border-2 border-dashed border-border rounded-xl bg-muted/50"}`}>
              {showQR && generatedId ? (
                <div className="w-full flex flex-col items-center">
                  <QRCode url={getPollUrl(generatedId)} />
                  
                  <div className="mt-8 w-full">
                    <a
                      href={getResultsUrl(generatedId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full flex items-center justify-center"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" /> View Results
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center text-foreground/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-dashed border-foreground/30 rounded-full mb-4">
                    <Plus className="h-8 w-8" />
                  </div>
                  <p>Your QR code will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PollCreator;
