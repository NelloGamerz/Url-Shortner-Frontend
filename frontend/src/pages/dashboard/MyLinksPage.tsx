import { useState } from "react";
import { Plus, Link2, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { LinkTable } from "../../components/common/LinkTable";
import { EmptyState } from "../../components/common/EmptyState";
import { CreateLinkModal } from "../../components/common/CreateLinkModal";
import { DeleteConfirmDialog } from "../../components/common/DeleteConfirmDialog";
import { TableSkeleton } from "../../components/common/LoadingSkeleton";
import { useLinks, useDeleteLink } from "../../hooks/useApi";
import { Link } from "../../types";
import { useToast } from "../../hooks/use-toast";
import { mockLinks } from "../../utils/mockData";
import { QRCodeDialog } from "../../components/common/QRCodeDialog";
import { useSubscription } from "../../hooks/useSubscription";

export function MyLinksPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteLink, setDeleteLink] = useState<Link | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useLinks(1, 10);
  const [qrLink, setQrLink] = useState<Link | null>(null);
  const deleteMutation = useDeleteLink();
  const { toast } = useToast();
  const { subscription } = useSubscription();

  const isFreePlan =
    (subscription?.planId ?? subscription?.plan ?? "FREE").toUpperCase() ===
    "FREE";

  const links = data?.data || mockLinks;

  const filteredLinks = links.filter(
    (link) =>
      link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async () => {
    if (!deleteLink) return;

    try {
      await deleteMutation.mutateAsync(deleteLink.id);
      toast({
        title: "Link Deleted",
        description: "The short link has been deleted successfully",
      });
      setDeleteLink(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            My Links
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and organize your short links
          </p>
        </div>
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by URL or alias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          />
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Link
        </Button>
      </div>

      {/* Links Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : filteredLinks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          {searchQuery ? (
            <EmptyState
              icon={Search}
              title="No links found"
              description="Try adjusting your search query"
            />
          ) : (
            <EmptyState
              icon={Link2}
              title="No links yet"
              description="Create your first short link to get started"
              actionLabel="Create Link"
              onAction={() => setIsCreateModalOpen(true)}
            />
          )}
        </div>
      ) : (
        <LinkTable
          // onQrCode={(link) => setQrLink(link)}
          onQrCode={(link) => setQrLink(link)}
          links={filteredLinks}
          onDelete={(link) => setDeleteLink(link)}
          isFreePlan={isFreePlan}
        />
      )}

      {/* Create Link Modal */}
      <CreateLinkModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteLink}
        onOpenChange={(open) => !open && setDeleteLink(null)}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />

      <QRCodeDialog
        open={!!qrLink}
        onOpenChange={(open) => {
          if (!open) {
            setQrLink(null);
          }
        }}
        shortUrl={qrLink?.shortUrl ?? ""}
      />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}

export default MyLinksPage;
