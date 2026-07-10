import { useState } from "react";
import {
  Copy,
  Edit,
  Trash2,
  ExternalLink,
  MoreHorizontal,
  QrCode,
} from "lucide-react";
import { Link } from "../../types";
import { Button } from "../ui/button";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useToast } from "../../hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "../../lib/utils";
import { Link2 } from "lucide-react";

interface LinkTableProps {
  links: Link[];
  onEdit?: (link: Link) => void;
  onDelete?: (link: Link) => void;
  isLoading?: boolean;
  className?: string;
  onQrCode: (link: Link) => void;
  isFreePlan?: boolean;
}

export function LinkTable({
  links,
  onEdit,
  onDelete,
  onQrCode,
  isLoading,
  className,
  isFreePlan,
}: LinkTableProps) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (shortUrl: string, id: string) => {
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-xl border border-slate-200 dark:border-slate-800",
          className,
        )}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Short URL</TableHead>
              <TableHead>Original URL</TableHead>
              <TableHead className="w-[100px]">Clicks</TableHead>
              <TableHead className="w-[150px]">Created</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="p-8 text-center text-slate-500">Loading...</div>
      </div>
    );
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
            <TableHead className="w-[300px] font-semibold">Short URL</TableHead>
            <TableHead className="font-semibold">Original URL</TableHead>
            <TableHead className="w-[100px] font-semibold">Clicks</TableHead>
            <TableHead className="w-[150px] font-semibold">Created</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow
              key={link.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <Link2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    {link.shortUrl.replace("https://", "")}
                  </a>
                </div>
              </TableCell>
              <TableCell>
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white max-w-md truncate block flex items-center gap-1"
                >
                  <span className="truncate">{link.originalUrl}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-50" />
                </a>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {link.clicks.toLocaleString()}
                </span>
              </TableCell>
              <TableCell className="text-slate-500 dark:text-slate-400">
                {format(new Date(link.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <DropdownMenuItem onClick={() => onQrCode(link)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Get QR Code
                    </DropdownMenuItem> */}
                    {!isFreePlan && (
                      <DropdownMenuItem
                        onClick={() => onQrCode(link)}
                        className="cursor-pointer"
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        Get QR Code
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleCopy(link.shortUrl, link.id)}
                      className="cursor-pointer"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      {copiedId === link.id ? "Copied!" : "Copy URL"}
                    </DropdownMenuItem>
                    {onEdit && (
                      <DropdownMenuItem
                        onClick={() => onEdit(link)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {onDelete && (
                      <DropdownMenuItem
                        onClick={() => onDelete(link)}
                        className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
