# Deployment Guide - Render with CI/CD

## Setup CI/CD with Render

### 1. Get Render Deploy Hook

In your Render dashboard:
1. Go to your service
2. Settings → Deploy Hook
3. Copy the deploy hook URL
4. It looks like: `https://api.render.com/deploy/srv-xxxxx?key=xxxxx`

### 2. Add to GitHub Secrets

In your GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `RENDER_DEPLOY_HOOK_URL`
4. Value: Paste your Render deploy hook URL
5. Save

### 3. How It Works

When you push to `main` or `master`:

1. **GitHub Actions runs:**
   - ✅ Linting check
   - ✅ Format check
   - ✅ TypeScript type check
   - ✅ Tests

2. **If all pass:**
   - 🚀 Triggers Render deployment
   - Render pulls latest code
   - Runs build
   - Deploys to production

### 4. Manual Deploy

Trigger manually in GitHub:
- Go to Actions tab
- Select "CI/CD Pipeline"
- Click "Run workflow"

### 5. Environment Variables in Render

Set these in Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGO_URL=your_mongodb_atlas_url
CORS_ORIGIN=https://your-frontend-domain.com
```

### 6. Build & Start Commands

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

## Tips

- Set up branch protection rules to require passing checks
- Monitor deployments in Render dashboard
- Check GitHub Actions tab for CI/CD logs
- Use pull requests to test before merging to main

## Troubleshooting

**Tests failing?**
- Make sure all dependencies are in package.json
- Check test scripts work locally first

**Deployment not triggering?**
- Verify RENDER_DEPLOY_HOOK_URL secret is set
- Check workflow file is in `.github/workflows/`
- Ensure pushing to main/master branch

**Build failing on Render?**
- Check environment variables are set
- Verify build command is correct
- Check logs in Render dashboard
