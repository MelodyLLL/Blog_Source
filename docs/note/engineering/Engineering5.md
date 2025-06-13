# 任务中心(上传下载)

## 背景

公司大文件上传以及下载解决方案

## 关于分片上传

### 重点

- 需要实行文件的切片，使用 slice 处理 Blob 对象
- 对文件进行 hash，这里涉及到的内存占用可能会过大，可使用增量上传或者取文件首尾分片以及中间分片某些字节进行 hash。(也是实现秒传的原理)
- 上传重试机制以及并发的控制，关于并发，可以使用 p-limit 控制，或者使用 Promise.race 控制

### 代码示例

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
						throw new Error(
							`Chunk ${index} upload failed after ${retryCount} attempts`
						);
					}
				}
			}
		});

	const tasks = chunks.map((chunk, index) => retryWrapper(chunk, index));
	const results = await Promise.allSettled(tasks);

	const failed = results
		.map((r, i) => (r.status === 'rejected' ? i : -1))
		.filter((i) => i !== -1);

	if (failed.length > 0) {
		throw new Error(`Some chunks failed: ${failed.join(', ')}`);
	}
}
```

## 关于上传的断点续传
待补充

## 关于下载

有一种方案是后端进行异步下载，前端可以轮询查询状态，这样处理前端只需查询状态即可

这里还增加了一些优化点，如页面只是提供去任务中心查看，可能大家不知道任务中心在哪，所以做了一个类似购物车的功能。主要原理用到了 translate3d 与贝塞尔二阶曲线
