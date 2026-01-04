export interface AtProtoConfig {
  service: string;
  identifier: string;
  password: string;
}

export interface PostEmbed {
  uri: string;
  title: string;
  description: string;
  thumbPath?: string;
}

export interface CreatePostOptions {
  text: string;
  embed?: PostEmbed;
  langs?: string[];
}

export interface PostResult {
  uri: string;
  cid: string;
}

export interface BlobRef {
  $type: "blob";
  ref: { $link: string };
  mimeType: string;
  size: number;
}
