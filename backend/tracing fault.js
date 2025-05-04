const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes  } = require('@opentelemetry/semantic-conventions');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const provider = new NodeTracerProvider({
  resource: Resource.create({
    [SemanticResourceAttributes.SERVICE_NAME]: 'backend',  // Corrected usage of ResourceAttributes
  }),
});

const exporter = new OTLPTraceExporter({
  url: 'http://otel-collector:4318/v1/traces',
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();

// registerInstrumentations({
//   instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
// });

console.log('✅ OpenTelemetry Backend tracing initialized');
