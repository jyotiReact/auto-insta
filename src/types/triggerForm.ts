export interface Trigger {
  label: string;
  icon: JSX.Element;
  disabled?: boolean;
  comingSoon?: boolean;
  type: string;
}

export interface TriggerListProps {
  items: Trigger[];
  onClick: (label: string, disabled?: boolean) => void;
}

export interface PostSelectorModalProps {
  isOpen: boolean;
  postData: VideoItem[];
  selectedVideo: VideoItem | null;
  onClose: () => void;
  onSelect: (video: VideoItem) => void;
  onConfirm: () => void;
}

export interface VideoItem {
  id: string;
  media_type: string;
  thumbnail_url?: string;
  media_url?: string;
  caption?: string;
  permalink?: string;
}

interface Keyword {
  id: string;
  text: string;
  isActive: boolean;
}

export interface SetupKeywordsModalProps {
  tempKeywords: Keyword[];
  setTempKeywords: (keywords: Keyword[]) => void;
  setNodesData: (nodes: any[]) => void;
  setSelectedKeywords: (keywords: Keyword[]) => void;
  selectedKeywords: Keyword[];
  nodesData: any[];
  closeModal: () => void;
}
