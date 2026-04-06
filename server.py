from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os


def main():
    port = int(os.environ.get("PORT", "8000"))
    web_dir = os.path.join(os.path.dirname(__file__), "web")

    if not os.path.isdir(web_dir):
        print(f"Could not find the web asset directory: {web_dir}")
        raise SystemExit(1)

    handler = partial(SimpleHTTPRequestHandler, directory=web_dir)

    try:
        server = ThreadingHTTPServer(("0.0.0.0", port), handler)
    except OSError as exc:
        print(f"Could not start server on port {port}: {exc}")
        print("Try a different port, for example: PORT=8017 python3 server.py")
        raise SystemExit(1)

    print(f"Serving Stock Sale Tax Estimator on http://127.0.0.1:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
