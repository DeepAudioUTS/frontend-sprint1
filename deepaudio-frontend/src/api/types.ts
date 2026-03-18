export type StoryStatus =
  | 'generating_abstract'
  | 'abstract_ready'
  | 'generating_text'
  | 'generating_audio'
  | 'completed';

export interface Story {
  id: string;
  child_id: string;
  theme: string;
  title: string | null;
  abstract: string | null;
  content: string | null;
  audio_url: string | null;
  status: StoryStatus;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  user_id: string;
  name: string;
  age: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedStories {
  items: Story[];
  total: number;
  limit: number;
  offset: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface CreateStoryRequest {
  child_id: string;
  theme: string;
}

export interface SelectAbstractRequest {
  abstract: string;
}

export interface InProgressStory {
  story_id: string;
  status: StoryStatus;
}
