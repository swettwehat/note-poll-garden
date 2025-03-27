
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Plus, Minus } from "lucide-react";
import QRCode from "./QRCode";

const NoteCreator = () => {
  const [note, setNote] = useState("");
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [noteCount, setNoteCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state

  const MAX_FREE_NOTES = 3;

  const createNote = () => {
    if (!note.trim()) {
      toast.error("Please enter a note");
      return;
    }

    if (!isLoggedIn && noteCount >= MAX_FREE_NOTES) {
      toast.error("Free tier limit reached. Please log in for unlimited access.");
      return;
    }

    try {
      // Generate a random ID for the note (in production, this would be a more secure method)
      const id = Math.random().toString(36).substring(2, 10);
      
      // In a real app, here we would save the note to a database
      localStorage.setItem(`note_${id}`, note);
      
      setGeneratedId(id);
      setShowQR(true);
      
      if (!isLoggedIn) {
        setNoteCount(noteCount + 1);
      }
      
      toast.success("Note created successfully!");
    } catch (error) {
      toast.error("Failed to create note. Please try again.");
    }
  };

  const getNoteUrl = (id: string) => {
    return `${window.location.origin}/note/${id}`;
  };

  return (
    <section id="notes" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-green/10 rounded-2xl mb-4">
            <FileText className="h-8 w-8 text-theme-green" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Shareable Notes
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Type your note below, generate a QR code, and share it instantly. Recipients can access your note by scanning the QR code or using the link.
          </p>
          {!isLoggedIn && (
            <div className="mt-4 text-sm text-theme-green/80">
              <span className="font-medium">{MAX_FREE_NOTES - noteCount} free notes</span> remaining. Login for unlimited access.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="card-primary">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your note here..."
                className="input-primary w-full min-h-[200px] resize-y"
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                className="btn-primary"
                onClick={createNote}
                disabled={!note.trim()}
              >
                Generate QR Code
              </button>
            </div>
          </div>

          <div className={`flex justify-center items-center min-h-[400px] ${!showQR && "border-2 border-dashed border-border rounded-xl bg-muted/50"}`}>
            {showQR && generatedId ? (
              <QRCode url={getNoteUrl(generatedId)} />
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
    </section>
  );
};

export default NoteCreator;
