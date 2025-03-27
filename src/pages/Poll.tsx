
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, BarChart3, CheckCircle2 } from "lucide-react";

interface PollData {
  question: string;
  options: string[];
  votes: number[];
  created: string;
}

const Poll = () => {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        // In a real app, this would be an API call
        const pollData = localStorage.getItem(`poll_${id}`);
        
        if (!pollData) {
          setError("Poll not found");
          return;
        }
        
        setPoll(JSON.parse(pollData));
        
        // Check if user has already voted
        const votedPolls = JSON.parse(localStorage.getItem("voted_polls") || "[]");
        if (votedPolls.includes(id)) {
          setHasVoted(true);
        }
      } catch (err) {
        setError("Failed to load poll");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const submitVote = async () => {
    if (selectedOption === null) {
      toast.error("Please select an option");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      const pollData = localStorage.getItem(`poll_${id}`);
      
      if (!pollData) {
        setError("Poll not found");
        return;
      }
      
      const parsedPoll: PollData = JSON.parse(pollData);
      
      // Update votes
      parsedPoll.votes[selectedOption] += 1;
      
      // Save updated poll
      localStorage.setItem(`poll_${id}`, JSON.stringify(parsedPoll));
      
      // Mark as voted
      const votedPolls = JSON.parse(localStorage.getItem("voted_polls") || "[]");
      localStorage.setItem("voted_polls", JSON.stringify([...votedPolls, id]));
      
      setPoll(parsedPoll);
      setHasVoted(true);
      toast.success("Vote submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit vote");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-black">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-6 w-40 bg-theme-green/20 rounded mx-auto"></div>
          <div className="h-4 w-64 bg-theme-green/10 rounded mx-auto"></div>
          <div className="h-10 w-56 bg-theme-green/10 rounded mx-auto mt-6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-theme-black p-6 text-center">
        <div className="card-primary max-w-md w-full">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
          <p className="mb-6">{error}</p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!poll) return null;

  return (
    <div className="min-h-screen flex flex-col bg-theme-black">
      <header className="p-4 border-b border-border">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center text-sm text-foreground/70 hover:text-theme-green transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
          
          <Link
            to={`/poll-results/${id}`}
            className="flex items-center text-sm text-theme-green hover:text-theme-lightGreen transition-colors duration-300"
          >
            <BarChart3 className="h-4 w-4 mr-1" /> View Results
          </Link>
        </div>
      </header>
      
      <main className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <div className="max-w-lg w-full card-primary animate-fade-in">
          {hasVoted ? (
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-green/10 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-theme-green" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
              <p className="mb-6 text-foreground/70">Your vote has been recorded.</p>
              <Link
                to={`/poll-results/${id}`}
                className="btn-primary"
              >
                View Results
              </Link>
            </div>
          ) : (
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">{poll.question}</h1>
              
              <div className="space-y-3 mb-8">
                {poll.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                      selectedOption === index 
                        ? "border-theme-green bg-theme-green/10" 
                        : "border-border hover:border-theme-green/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div 
                        className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                          selectedOption === index 
                            ? "border-theme-green" 
                            : "border-foreground/30"
                        }`}
                      >
                        {selectedOption === index && (
                          <div className="w-3 h-3 rounded-full bg-theme-green"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={submitVote}
                disabled={selectedOption === null || submitting}
                className="btn-primary w-full"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Vote"
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Poll;
