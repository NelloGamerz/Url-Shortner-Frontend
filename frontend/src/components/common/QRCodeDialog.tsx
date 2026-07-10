import { Download, Share2 } from "lucide-react";
import QRCode from "react-qr-code";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortUrl: string;
}

export function QRCodeDialog({
  open,
  onOpenChange,
  shortUrl,
}: Props) {
  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;

      ctx?.drawImage(img, 0, 0, 512, 512);

      const png = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = png;
      link.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Short URL",
        text: shortUrl,
        url: shortUrl,
      });
    } else {
      navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCode
              id="qr-code"
              value={shortUrl}
              size={220}
            />
          </div>

          <p className="text-sm text-slate-500 break-all">
            {shortUrl}
          </p>

          <div className="flex gap-3">
            <Button onClick={downloadQRCode}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>

            <Button
              variant="outline"
              onClick={shareQRCode}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}