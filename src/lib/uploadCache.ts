type CachedFile = {
  buffer: Buffer;
  contentType: string;
};

const globalForUploads = globalThis as unknown as {
  uploadedFileCache?: Map<string, CachedFile>;
};

export const uploadedFileCache =
  globalForUploads.uploadedFileCache ?? new Map<string, CachedFile>();

if (process.env.NODE_ENV !== "production") {
  globalForUploads.uploadedFileCache = uploadedFileCache;
}
