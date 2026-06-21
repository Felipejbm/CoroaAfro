export interface Conversation {
    id: string;
    name: string;
    initials: string;
    lastMessage: string;
    time: string;
    unread?: number;
    color: string;
    online?: boolean;
}

export interface Message {
    id: string;
    fromMe: boolean;
    text: string;
    time: string;
    highlight?: { tag: string; title: string; subtitle: string };
}
