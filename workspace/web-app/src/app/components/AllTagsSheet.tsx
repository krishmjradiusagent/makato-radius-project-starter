import { X, Plus, Search, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface AllTagsSheetProps {
  onClose: () => void;
}

interface Tag {
  id: string;
  name: string;
}

/**
 * Tags Bottom Sheet - Mirrors Additional Details UX
 * 
 * Design Note: Tags must mirror Additional Details pattern:
 * - Chevron row + bottom-sheet tag manager (search/create/edit/delete)
 * - Search input with live filter and quick-create
 * - Selectable chips with remove (×) affordance
 * - Overflow menu (⋮) for Edit and Delete
 * - Empty states and confirmation modals
 */
export function AllTagsSheet({ onClose }: AllTagsSheetProps) {
  // Master tag list (shared across all clients)
  const initialTags: Tag[] = [
    { id: '1', name: 'First Time Buyer' },
    { id: '2', name: 'VIP' },
    { id: '3', name: 'Pre-Approved' },
    { id: '4', name: 'Investor' },
    { id: '5', name: 'Luxury Segment' },
    { id: '6', name: 'Relocation' },
    { id: '7', name: 'Downsizing' },
    { id: '8', name: 'Future' }
  ];

  const [allTags, setAllTags] = useState<Tag[]>(initialTags);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['1', '2', '3']);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editingTagName, setEditingTagName] = useState('');
  const [menuOpenTagId, setMenuOpenTagId] = useState<string | null>(null);
  const [deleteConfirmTag, setDeleteConfirmTag] = useState<Tag | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Filter tags based on search
  const filteredTags = allTags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if search query matches existing tag
  const exactMatch = allTags.some(tag => 
    tag.name.toLowerCase() === searchQuery.trim().toLowerCase()
  );

  const showCreateAction = searchQuery.trim().length > 0 && !exactMatch;

  const toggleTagSelection = (tagId: string) => {
    setSelectedTagIds(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const removeTagSelection = (tagId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTagIds(prev => prev.filter(id => id !== tagId));
  };

  const handleQuickCreate = () => {
    if (searchQuery.trim()) {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: searchQuery.trim()
      };
      setAllTags([...allTags, newTag]);
      setSelectedTagIds([...selectedTagIds, newTag.id]); // Auto-select
      setSearchQuery(''); // Clear search
    }
  };

  const handleManualAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() && !exactMatch) {
      handleQuickCreate();
    }
  };

  const handleStartEdit = (tag: Tag) => {
    setEditingTagId(tag.id);
    setEditingTagName(tag.name);
    setMenuOpenTagId(null);
  };

  const handleSaveEdit = () => {
    if (editingTagName.trim() && editingTagId) {
      setAllTags(allTags.map(tag => 
        tag.id === editingTagId 
          ? { ...tag, name: editingTagName.trim() }
          : tag
      ));
      setEditingTagId(null);
      setEditingTagName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
    setEditingTagName('');
  };

  const handleDeleteTag = (tag: Tag) => {
    setAllTags(allTags.filter(t => t.id !== tag.id));
    setSelectedTagIds(selectedTagIds.filter(id => id !== tag.id));
    setDeleteConfirmTag(null);
    setMenuOpenTagId(null);
  };

  const handleFocusAddInput = () => {
    searchInputRef.current?.focus();
  };

  // Empty state when no tags exist
  const isEmptyState = allTags.length === 0;
  const isNoResults = !isEmptyState && searchQuery.length > 0 && filteredTags.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl z-50 max-w-[390px] mx-auto animate-slide-up max-h-[85vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#2d2d2d] shrink-0">
          <h2 className="text-white font-semibold text-lg">Tags</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-4 pt-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a6a6a]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleManualAdd}
              placeholder="Search or create a tag"
              className="w-full bg-[#252525] text-white text-sm pl-10 pr-4 py-2.5 rounded-lg border border-[#2d2d2d] outline-none focus:border-[#5a5ff2] transition-colors"
            />
          </div>
        </div>

        {/* Quick Create Action */}
        {showCreateAction && (
          <div className="px-4 pt-3 shrink-0">
            <button
              onClick={handleQuickCreate}
              className="w-full bg-[#252525] border border-[#2d2d2d] hover:border-[#5a5ff2] text-white py-2.5 rounded-lg flex items-center gap-2 px-3 transition-colors"
            >
              <Plus className="w-4 h-4 text-[#5a5ff2]" />
              <span className="text-sm">Create tag "<span className="font-medium">{searchQuery.trim()}</span>"</span>
            </button>
          </div>
        )}

        {/* Scrollable Tags Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isEmptyState ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-16 h-16 bg-[#252525] rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-[#4a4a4a]" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">No tags yet</h3>
              <p className="text-[#8a8a8a] text-sm mb-6 max-w-[260px]">
                Create tags to categorize clients (e.g., VIP, Investor, First-time buyer).
              </p>
              <button
                onClick={handleFocusAddInput}
                className="bg-[#5a5ff2] text-white px-6 py-2.5 rounded-full text-sm font-semibold"
              >
                Create your first tag
              </button>
            </div>
          ) : isNoResults ? (
            /* No Results State */
            <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
              <p className="text-[#8a8a8a] text-sm">No tags found</p>
            </div>
          ) : (
            /* Tags List */
            <div className="space-y-2">
              {filteredTags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id);
                const isEditing = editingTagId === tag.id;
                const isMenuOpen = menuOpenTagId === tag.id;

                if (isEditing) {
                  return (
                    <div key={tag.id} className="flex items-center gap-2 bg-[#2d2d2d] px-3 py-2.5 rounded-lg border border-[#5a5ff2]">
                      <input
                        type="text"
                        value={editingTagName}
                        onChange={(e) => setEditingTagName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                        className="bg-transparent text-white text-sm outline-none flex-1"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="text-[#5a5ff2] text-xs font-semibold px-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-[#8a8a8a] text-xs font-semibold px-2"
                      >
                        Cancel
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={tag.id} className="relative">
                    <button
                      onClick={() => toggleTagSelection(tag.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-[#5a5ff2] text-white'
                          : 'bg-[#252525] text-[#8a8a8a] border border-[#2d2d2d]'
                      }`}
                    >
                      <span className="text-sm font-medium">{tag.name}</span>
                      <div className="flex items-center gap-1">
                        {isSelected && (
                          <button
                            onClick={(e) => removeTagSelection(tag.id, e)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenTagId(isMenuOpen ? null : tag.id);
                          }}
                          className={`p-1 hover:bg-white/10 rounded transition-colors ${
                            isSelected ? 'text-white/80' : 'text-[#6a6a6a]'
                          }`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </button>

                    {/* Context Menu */}
                    {isMenuOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-[60]" 
                          onClick={() => setMenuOpenTagId(null)}
                        />
                        <div className="absolute top-full right-0 mt-1 bg-[#2d2d2d] border border-[#404040] rounded-lg shadow-xl z-[70] min-w-[140px] overflow-hidden">
                          <button
                            onClick={() => handleStartEdit(tag)}
                            className="w-full px-3 py-2.5 flex items-center gap-2 text-white text-sm hover:bg-[#3a3a3a] transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setDeleteConfirmTag(tag);
                              setMenuOpenTagId(null);
                            }}
                            className="w-full px-3 py-2.5 flex items-center gap-2 text-[#ff6b6b] text-sm hover:bg-[#3a3a3a] transition-colors border-t border-[#404040]"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Padding */}
        <div className="h-6 shrink-0" />
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmTag && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-[60]" 
            onClick={() => setDeleteConfirmTag(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl shadow-2xl z-[70] w-[300px] p-5">
            <h3 className="text-white font-semibold text-lg mb-2">Delete Tag</h3>
            <p className="text-[#8a8a8a] text-sm mb-4">
              Are you sure you want to delete "{deleteConfirmTag.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmTag(null)}
                className="flex-1 bg-[#2d2d2d] text-white py-2.5 rounded-lg text-sm font-medium border border-[#404040] hover:bg-[#3a3a3a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTag(deleteConfirmTag)}
                className="flex-1 bg-[#ff6b6b] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#ff5252] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
