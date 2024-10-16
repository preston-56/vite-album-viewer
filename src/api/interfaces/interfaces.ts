export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface SimplifiedUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface PhotoResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface SimplifiedPhoto {
  id: number;
  albumId: number;
  title: string;
  url: string;
}
