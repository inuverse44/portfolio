import { NodeSDK } from '@opentelemetry/sdk-node';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

const sdk = new NodeSDK({
  serviceName: 'portfolio-nextjs',
  // Use SimpleSpanProcessor for Cloud Functions / Cloud Run (serverless) to ensure flushes,
  // though BatchSpanProcessor is usually more performant. For low traffic, Simple is safer against termination.
  spanProcessor: new SimpleSpanProcessor(new TraceExporter()),
});

sdk.start();
