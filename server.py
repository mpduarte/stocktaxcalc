from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os


def main():
    port = int(os.environ.get("PORT", "8000"))
    try:
        server = ThreadingHTTPServer(("0.0.0.0", port), SimpleHTTPRequestHandler)
    except OSError as exc:
        print(f"Could not start server on port {port}: {exc}")
        print("Try a different port, for example: PORT=8017 python3 server.py")
        raise SystemExit(1)

    print(f"Serving Stock Sale Tax Estimator on http://127.0.0.1:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
