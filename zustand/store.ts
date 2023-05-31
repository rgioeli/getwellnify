import { create } from "zustand";

interface StoreTypes {
  searchError: boolean;
  searchTerms: string[] | null;
  showChannelMenu: { channel: string | undefined; toggle: boolean };
  toggleCreatePost: { channel: string | undefined; toggle: boolean };
  editPost: {
    toggle: boolean;
    postId: string | undefined;
    postContent: string | undefined;
  };
  editReply: {
    toggle: boolean;
    commentId: string | undefined;
    commentContent: string | undefined;
  };
  replyToUser: {
    toggle: boolean;
    postId: string | undefined;
    channel: string | undefined;
    replyingTo: { id: string; username: string | null } | undefined;
    replyContent: string | undefined;
    parentId?: string;
  };
  nestedComments: {
    toggle: boolean;
    postId: string | undefined;
  };

  deleteModal: {
    toggle: boolean;
    id?: { postId: string | undefined; commentId: string | undefined };
    text?: string;
  };

  setDeleteModal: ({
    toggle,
    id,
    text,
  }: {
    toggle: boolean;
    id?: { postId: string | undefined; commentId: string | undefined };
    text?: string;
  }) => void;

  setEditReply: ({
    toggle,
    commentId,
    commentContent,
  }: {
    toggle: boolean;
    commentId: string | undefined;
    commentContent: string | undefined;
  }) => void;

  setNestedComments: ({
    toggle,
    postId,
  }: {
    toggle: boolean;
    postId: string | undefined;
  }) => void;
  setReplyToUser: ({
    toggle,
    postId,
    channel,
    replyingTo,
    replyContent,
    parentId,
  }: {
    toggle: boolean;
    postId: string | undefined;
    channel: string | undefined;
    replyingTo: { id: string; username: string | null } | undefined;
    replyContent: string | undefined;
    parentId?: string;
  }) => void;
  setEditPost: ({
    toggle,
    postId,
    postContent,
  }: {
    toggle: boolean;
    postId: string | undefined;
    postContent: string | undefined;
  }) => void;
  setShowChannelMenu: ({
    channel,
    toggle,
  }: {
    channel: string | undefined;
    toggle: boolean;
  }) => void;
  setToggleCreatePost: ({
    channel,
    toggle,
  }: {
    channel: string | undefined;
    toggle: boolean;
  }) => void;
  setSearchError: (hasError: boolean) => void;
  setSearchTerms: (terms: string[] | null) => void;
}

export const store = create<StoreTypes>((set) => ({
  searchError: false,
  searchTerms: null,
  showChannelMenu: { channel: undefined, toggle: false },
  toggleCreatePost: { channel: undefined, toggle: false },
  editPost: { toggle: false, postId: undefined, postContent: undefined },
  replyToUser: {
    toggle: false,
    postId: undefined,
    channel: undefined,
    replyingTo: undefined,
    replyContent: undefined,
    parentId: undefined,
  },
  nestedComments: { toggle: false, postId: undefined },
  editReply: { toggle: false, commentContent: undefined, commentId: undefined },
  deleteModal: {
    toggle: false,
    id: undefined,
    text: undefined,
  },
  setDeleteModal: ({ toggle, id, text }) =>
    set((state) => ({
      deleteModal: { toggle, id, text },
    })),
  setEditReply: ({ toggle, commentId, commentContent }) =>
    set((state) => ({ editReply: { toggle, commentId, commentContent } })),
  setNestedComments: ({ toggle, postId }) =>
    set((state) => ({ nestedComments: { toggle, postId } })),
  setReplyToUser: ({
    toggle,
    postId,
    channel,
    replyingTo,
    replyContent,
    parentId,
  }) =>
    set((state) => ({
      replyToUser: {
        toggle,
        postId,
        channel,
        replyingTo,
        replyContent,
        parentId,
      },
    })),
  setEditPost: ({ toggle, postId, postContent }) =>
    set((state) => ({ editPost: { toggle, postId, postContent } })),
  setShowChannelMenu: ({ channel, toggle }) =>
    set((state) => ({ showChannelMenu: { channel, toggle } })),
  setToggleCreatePost: ({ channel, toggle }) =>
    set((state) => ({ toggleCreatePost: { channel, toggle } })),
  setSearchError: (hasError) => set((state) => ({ searchError: hasError })),
  setSearchTerms: (terms) => set((state) => ({ searchTerms: terms })),
}));
