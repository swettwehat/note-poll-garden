
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, Download, CheckCircle2 } from "lucide-react";

interface QRCodeProps {
  url: string;
  size?: number;
}

const QRCode = ({ url, size = 200 }: QRCodeProps) => {
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate QR code using Google Charts API
    if (url) {
      const encodedUrl = encodeURIComponent(url);
      const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodedUrl}&chs=${size}x${size}&chco=00E676&chf=bg,s,00000000`;
      setQrCodeSrc(qrUrl);
    }
  }, [url, size]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeSrc;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded");
  };

  if (!url) return null;

  return (
    <div className="card-primary flex flex-col items-center p-6 animate-scale-in">
      {qrCodeSrc && (
        <div className="relative group mb-4">
          <img
            src={qrCodeSrc}
            alt="QR Code"
            className="rounded-lg bg-white p-2"
            width={size}
            height={size}
          />
          <div className="absolute inset-0 bg-theme-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <button 
              onClick={downloadQRCode}
              className="text-white bg-theme-green/80 hover:bg-theme-green p-2 rounded-full transition-all duration-300"
              aria-label="Download QR Code"
            >
              <Download className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full relative">
        <input
          type="text"
          value={url}
          readOnly
          className="input-primary w-full pr-10 font-mono text-sm"
        />
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-theme-green hover:text-theme-lightGreen transition-colors duration-300"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default QRCode;
