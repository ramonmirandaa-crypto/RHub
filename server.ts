import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // OAuth Mock Endpoints (since we don't have real keys initially, but we will set up the flow)
  app.get("/api/auth/google/url", (req, res) => {
    const redirectUri = `${process.env.APP_URL}/auth/callback/google`;
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/drive.readonly",
      access_type: "offline",
      prompt: "consent",
    });
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    res.json({ url: authUrl });
  });

  app.get("/api/auth/microsoft/url", (req, res) => {
    const redirectUri = `${process.env.APP_URL}/auth/callback/microsoft`;
    const params = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "offline_access Mail.Read Contacts.Read Notes.Read.All",
    });
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
    res.json({ url: authUrl });
  });

  app.get("/api/auth/apple/url", (req, res) => {
    const redirectUri = `${process.env.APP_URL}/auth/callback/apple`;
    const params = new URLSearchParams({
      client_id: process.env.APPLE_CLIENT_ID || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "name email",
      response_mode: "form_post",
    });
    const authUrl = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
    res.json({ url: authUrl });
  });

  // Mock endpoint for Apple App-Specific Password verification
  app.post("/api/auth/apple/app-password", (req, res) => {
    const { appleId, appPassword } = req.body;
    
    // In a real app, you would verify these credentials against an IMAP/CardDAV server
    if (appleId && appPassword) {
      setTimeout(() => {
        res.json({ success: true, message: "Connected to iCloud successfully" });
      }, 1500); // Simulate network delay
    } else {
      res.status(400).json({ error: "Missing credentials" });
    }
  });

  // Mock endpoint for Nextcloud verification
  app.post("/api/auth/nextcloud/verify", (req, res) => {
    const { url, username, password } = req.body;
    
    // In a real app, you would verify these credentials via WebDAV
    if (url && username && password) {
      setTimeout(() => {
        res.json({ success: true, message: "Connected to Nextcloud successfully" });
      }, 1500); // Simulate network delay
    } else {
      res.status(400).json({ error: "Missing credentials" });
    }
  });

  // Callback routes for OAuth
  app.get("/auth/callback/:provider", async (req, res) => {
    const { provider } = req.params;
    const { code } = req.query;
    
    // Here we would normally exchange the code for tokens.
    // For now, we just send a success message back to the popup.
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', provider: '${provider}' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful for ${provider}. This window should close automatically.</p>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
