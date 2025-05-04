const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),
  instrumentations: getNodeAutoInstrumentations(),
});

(async () => {
    try {
      await sdk.start();
      console.log('✅ OpenTelemetry tracing initialized');
    } catch (err) {
      console.error('❌ Error starting OpenTelemetry SDK:', err);
    }
  })();
