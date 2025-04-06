---
category: Components
group:
  title: Tools
  order: 5
title: XStream
order: 1
description: Transform binary stream
demo:
  cols: 1
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*OD9kTJOmGdsAAAAAAAAAAAAADgCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*PxJISo5t2YgAAAAAAAAAAAAADgCCAQ/original
---

## When To Use

- Transform SSE protocol `ReadableStream` to `Record`
- Decode and read any protocol `ReadableStream`

## Use

Common `ReadableStream` instances, such as `await fetch(...).body`, usage example:

```js
import { XStream } from '@ant-design/x';

async function request() {
  const response = await fetch();
  // .....

  for await (const chunk of XStream({
    readableStream: response.body,
  })) {
    console.log(chunk);
  }
}
```

## Examples

<code src="./demo/default-protocol.tsx">Default Protocol - SSE</code> <code src="./demo/custom-protocol.tsx">Custom Protocol</code>

## API

### XStreamOptions

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| readableStream | Readable stream of binary data | ReadableStream<'Uint8Array'> | - | - |
| transformStream | Support customizable transformStream to transform streams | TransformStream<string, T> | sseTransformStream | - |
