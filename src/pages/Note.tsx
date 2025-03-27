
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Note = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        // In a real app, this would be an API call
        const noteData = localStorage.getItem(`note_${id}`);
        
        if (!noteData) {
          setError("Note not found");
          return;
        }
        
        setNote(noteData);
      } catch (err) {
        setError("Failed to load note");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-black">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-6 w-24 bg-theme-green/20 rounded mx-auto"></div>
          <div className="h-4 w-64 bg-theme-green/10 rounded mx-auto"></div>
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
          <span className="text-sm text-foreground/50">Shared Note</span>
        </div>
      </header>
      
      <main className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <div className="max-w-3xl w-full card-primary animate-fade-in">
          <div className="px-6 py-10 text-center md:text-left">
            <p className="text-xl font-bold whitespace-pre-wrap break-words">{note}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Note;
