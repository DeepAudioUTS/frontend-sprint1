export type StoryStatus =
  | 'generating_abstract'
  | 'abstract_ready'
  | 'generating_text'
  | 'generating_audio'
  | 'failed_generating_abstract'
  | 'failed_generating_text'
  | 'failed_generating_audio';

export interface AbstractCandidate {
  abstract: string;
  story_prompt: string;
}

export interface Story {
  id: string;
  child_id: string;
  theme: string;
  title: string | null;
  abstracts: string[] | null;
  story_prompts: string[] | null;
  abstract: string | null;
  story_prompt: string | null;
  content: string | null;
  audio_url: string | null;
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
  story_prompt: string;
}

export interface InProgressStory {
  draft_id: string;
  status: StoryStatus;
  error: string | null;
}

export interface DraftResponse {
  draft_id: string;
  status: StoryStatus;
  error: string | null;
}
