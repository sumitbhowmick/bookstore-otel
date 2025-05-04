# 📚 Bookstore App with OpenTelemetry Observability

This is a full-stack bookstore application with:

- React frontend (Vite)
- Node.js backend (Express + MongoDB)
- OpenTelemetry tracing enabled across frontend, backend, and database
- Jaeger used to visualize distributed traces
- Runs with Docker Compose using **two separate stacks**: one for the app and one for monitoring

---

## 🧱 Project Structure

```
bookstore-app/
│
├── frontend/               # React frontend (Vite)
│   ├── tracing.js          # OpenTelemetry browser tracing setup
│   └── ...
│
├── backend/                # Node.js backend (Express + MongoDB)
│   ├── tracing.js          # OpenTelemetry Node.js tracing setup
│   └── ...
│
├── docker-compose.app.yaml          # App stack: frontend, backend, MongoDB
├── docker-compose.monitoring.yaml   # Monitoring stack: Jaeger, Otel Collector
├── otel-config.yaml                 # Configuration for Otel Collector
└── README.md
```

---

## 🚀 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js (for local development)](https://nodejs.org/en/)
- Internet access to download packages on first build

---

## 🛠️ How to Run

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/bookstore-app.git
cd bookstore-app
```

---

### Step 2: Start the Monitoring Stack

```bash
docker compose -f docker-compose.monitoring.yaml up -d
```

This starts:

- **Jaeger UI** on [http://localhost:16686](http://localhost:16686)
- **OpenTelemetry Collector** listening on port `4317`

---

### Step 3: Start the Application Stack

```bash
docker compose -f docker-compose.app.yaml up -d --build
```

This launches:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3050/api/books](http://localhost:3050/api/books)
- MongoDB: default internal usage

---

## 🔍 Observing Traces in Jaeger

1. Visit [http://localhost:16686](http://localhost:16686)
2. Use the **Service** dropdown to select `frontend` or `backend`
3. Click **Find Traces**
4. You will see spans for:
   - User interaction on the frontend
   - API calls to backend
   - MongoDB operations

---

## 📦 Useful Commands

### Rebuild and Restart

```bash
docker compose -f docker-compose.app.yaml down
docker compose -f docker-compose.monitoring.yaml down
docker compose -f docker-compose.monitoring.yaml up -d --build
docker compose -f docker-compose.app.yaml up -d --build
```

### Logs

```bash
docker compose -f docker-compose.app.yaml logs -f
docker compose -f docker-compose.monitoring.yaml logs -f
```

---

## 🧼 Cleanup

```bash
docker compose -f docker-compose.app.yaml down -v
docker compose -f docker-compose.monitoring.yaml down -v
```

---

## 📚 Tech Stack

- React + Vite
- Node.js + Express
- MongoDB
- OpenTelemetry SDK (frontend & backend)
- OTLP Exporter
- Jaeger
- Docker Compose

---

## 🧪 Tracing Setup Summary

| Layer    | Package(s) Used                                           | Tracing File          |
|----------|-----------------------------------------------------------|-----------------------|
| Frontend | `@opentelemetry/sdk-trace-web`, `zone.js`, etc.          | `frontend/tracing.js` |
| Backend  | `@opentelemetry/sdk-trace-node`, `express-instrumentation` | `backend/tracing.js`  |
| Collector| `otel-config.yaml` + `docker-compose.monitoring.yaml`    | -                     |

---

