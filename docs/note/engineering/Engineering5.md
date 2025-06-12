# 任务中心(下载中心搭建)

## 关于分片上传核心代码

```js
import pLimit from 'p-limit';

// 分片上传核心函数
export async function uploadFileInChunks({
  file,
  chunkSize = 1 * 1024 * 1024, // 默认每片1MB
  concurrency = 5,
  retryCount = 3,
  uploadFn, // (chunk: Blob, index: number, total: number) => Promise
  onProgress, // (uploaded: number, total: number) => void
}) {
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunks = Array.from({ length: totalChunks }, (_, i) => {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    return file.slice(start, end);
  });

  let uploaded = 0;

  const limit = pLimit(concurrency);

  const retryWrapper = (chunk: Blob, index: number) =>
    limit(async () => {
      for (let i = 0; i < retryCount; i++) {
        try {
          await uploadFn(chunk, index, totalChunks);
          uploaded++;
          onProgress?.(uploaded, totalChunks);
          return;
        } catch (err) {
          if (i === retryCount - 1) {
            throw new Error(`Chunk ${index} upload failed after ${retryCount} attempts`);
          }
        }
      }
    });

  const tasks = chunks.map((chunk, index) => retryWrapper(chunk, index));
  const results = await Promise.allSettled(tasks);

  const failed = results
    .map((r, i) => (r.status === 'rejected' ? i : -1))
    .filter(i => i !== -1);

  if (failed.length > 0) {
    throw new Error(`Some chunks failed: ${failed.join(', ')}`);
  }
}

```