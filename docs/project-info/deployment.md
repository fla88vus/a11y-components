# Guide: Deploying Documentation

This guide explains how to deploy the documentation site.

## Options

### 1. GitHub Pages (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

**Setup:**

1. Go to your repository settings on GitHub
2. Navigate to **Settings > Pages**
3. Under "Build and deployment", select **GitHub Actions**
4. Push to `main` branch - the workflow will run automatically

Your docs will be available at: `https://fla88vus.github.io/a11y-components/`

---

### 2. Vercel

Deploy the docs folder directly to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd docs
vercel
```

---

### 3. Netlify

**Option A: Via Git**
1. Connect your repository to Netlify
2. Set build command: `npm run docs:build`
3. Set publish directory: `docs/.vitepress/dist`

**Option B: Manual Deploy**
```bash
npm run docs:build
cd docs/.vitepress/dist
netlify deploy --prod
```

---

### 4. Local Preview

Preview the built docs locally:

```bash
npm run docs:build
npm run docs:preview
```

---

## Development

Run the docs site locally in development mode:

```bash
npm run docs:dev
```

Then visit `http://localhost:5173`

---

## Custom Domain

### GitHub Pages

1. Add a `docs/public/CNAME` file with your domain:
   ```
   docs.your-domain.com
   ```

2. Configure DNS:
   ```
   Type: CNAME
   Name: docs
   Value: fla88vus.github.io
   ```

### Vercel/Netlify

Follow their respective documentation for custom domains.

---

## Troubleshooting

**Docs don't build:**
- Check that VitePress is installed: `npm install -D vitepress`
- Verify all markdown files have valid frontmatter

**Links broken:**
- Update the `base` in `docs/.vitepress/config.ts` to match your deployment path
- For GitHub Pages: `base: '/a11y-components/'`
- For root domain: `base: '/'`

**404 on navigation:**
- Ensure all internal links use relative paths
- Check that all referenced files exist
