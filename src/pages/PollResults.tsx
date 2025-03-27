
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

interface PollData {
  question: string;
  options: string[];
  votes: number[];
  created: string;
}

const PollResults = () => {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        // In a real app, this would be an API call
        const pollData = localStorage.getItem(`poll_${id}`);
        
        if (!pollData) {
          setError("Poll not found");
          return;
        }
        
        const parsedPoll: PollData = JSON.parse(pollData);
        setPoll(parsedPoll);
        setTotalVotes(parsedPoll.votes.reduce((acc, vote) => acc + vote, 0));
      } catch (err) {
        setError("Failed to load poll results");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();

    // Poll for updates every 5 seconds (in a real app, this would be websockets)
    const interval = setInterval(fetchPoll, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const sharePoll = () => {
    const url = `${window.location.origin}/poll/${id}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Vote in this poll",
        text: poll?.question,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Poll link copied to clipboard");
    }
  };

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-black">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-6 w-40 bg-theme-green/20 rounded mx-auto"></div>
          <div className="h-4 w-64 bg-theme-green/10 rounded mx-auto"></div>
          <div className="space-y-2 mt-6">
            <div className="h-12 w-full max-w-md bg-theme-green/10 rounded mx-auto"></div>
            <div className="h-12 w-full max-w-md bg-theme-green/10 rounded mx-auto"></div>
            <div className="h-12 w-full max-w-md bg-theme-green/10 rounded mx-auto"></div>
          </div>
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
          
          <button
            onClick={sharePoll}
            className="flex items-center text-sm text-theme-green hover:text-theme-lightGreen transition-colors duration-300"
          >
            <Share2 className="h-4 w-4 mr-1" /> Share Poll
          </button>
        </div>
      </header>
      
      <main className="flex-1 p-6 md:p-12 flex flex-col items-center">
        <div className="max-w-2xl w-full card-primary animate-fade-in mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{poll.question}</h1>
            <p className="text-sm text-foreground/60 mb-6">
              {totalVotes} {totalVotes === 1 ? "vote" : "votes"} total
            </p>
            
            <div className="space-y-6">
              {poll.options.map((option, index) => {
                const percentage = getPercentage(poll.votes[index]);
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/90">{option}</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-theme-green h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-foreground/60">
                      {poll.votes[index]} {poll.votes[index] === 1 ? "vote" : "votes"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Link
            to={`/poll/${id}`}
            className="btn-outline"
          >
            Vote
          </Link>
          <button
            onClick={sharePoll}
            className="btn-secondary"
          >
            <Share2 className="h-4 w-4 mr-2" /> Share
          </button>
        </div>
      </main>
    </div>
  );
};

export default PollResults;
