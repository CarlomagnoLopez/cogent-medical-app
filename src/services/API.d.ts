declare namespace API {
  export interface CurrentUser {
    sub?: string;
    phone_number?: string;
    custom_role?: string;
    email?: string;
    Username?: string;
    UserStatus?: string;
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    current_role?: String;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }
}
