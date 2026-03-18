# Deployment Guide - Fin Buddy

## Production Deployment Information

This guide covers deploying the Fin Buddy application to various platforms.

## Prerequisites for Deployment

- Node.js 18+ installed
- Git repository initialized and committed
- Package.json properly configured
- Build passes: `npm run build`

## Vercel Deployment (Recommended)

Vercel is the optimal choice for Next.js applications as it's created by the Next.js team.

### Steps:

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub account

3. **Import Project**
   - Click "New Project"
   - Select your GitHub repository (fin-buddy)
   - Vercel auto-detects it as a Next.js project

4. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./ (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: .next (auto-detected)
   - Environment Variables: (add if needed)

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at: `https://<project-name>.vercel.app`

## Environment Variables

The application doesn't require any environment variables for basic functionality. However, you can add these if needed:

Create `.env.local`:

```env
# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# API endpoints (if expanding features)
NEXT_PUBLIC_API_URL=https://api.example.com
```

Create `.env.example` for documentation:

```env
# Example environment variables
# NEXT_PUBLIC_ANALYTICS_ID=
# NEXT_PUBLIC_API_URL=
```

## Alternative Deployment Platforms

### Heroku

1. **Install Heroku CLI**

   ```bash
   choco install heroku-cli
   ```

2. **Create Procfile**

   ```
   web: npm start
   ```

3. **Deploy**
   ```bash
   heroku create fin-buddy
   git push heroku main
   ```

### AWS (Using EC2)

1. **Create EC2 Instance**
   - Ubuntu 22.04 LTS
   - Install Node.js 18+

2. **Deploy Application**

   ```bash
   git clone <your-repo>
   cd fin-buddy
   npm install
   npm run build
   npm start
   ```

3. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "fin-buddy" -- start
   pm2 startup
   pm2 save
   ```

### Google Cloud Run

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Deploy**
   ```bash
   gcloud run deploy fin-buddy --source .
   ```

### Docker Deployment

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   # Install dependencies
   COPY package*.json ./
   RUN npm install

   # Copy source
   COPY . .

   # Build
   RUN npm run build

   # Expose port
   EXPOSE 3000

   # Start
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t fin-buddy .
   docker run -p 3000:3000 fin-buddy
   ```

## Performance Optimization

### Before Deployment

1. **Verify Build Size**

   ```bash
   npm run build
   # Check .next/static folder size
   ```

2. **Analyze Bundle**

   ```bash
   npm install --save-dev @next/bundle-analyzer
   # Update next.config.js to include analyzer
   ANALYZE=true npm run build
   ```

3. **Run Tests**
   ```bash
   npm run type-check
   npm run lint
   ```

### Deployment Checklist

- [ ] Build completes without warnings
- [ ] TypeScript compilation successful
- [ ] All environment variables set
- [ ] Database/API endpoints configured
- [ ] Monitoring tools configured (if needed)
- [ ] SSL certificate configured
- [ ] CDN configured (if applicable)

## Monitoring & Maintenance

### Vercel Analytics

- Automatically included in Vercel deployments
- Monitor performance at vercel.com dashboard

### Error Tracking

Consider adding error tracking:

- Sentry (https://sentry.io)
- LogRocket (https://logrocket.com)

### Updates

Keep dependencies updated:

```bash
npm outdated  # Check for updates
npm update    # Update dependencies
npm audit     # Check for vulnerabilities
```

## Troubleshooting Deployment

### Build Fails

```bash
# Clear and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Memory Issues

```bash
# Increase Node memory if needed
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Port Already in Use

```bash
# Vercel automatically assigns ports
# For local testing: npm run dev -- -p 3001
```

## Post-Deployment

1. **Test Live Application**
   - Visit https://your-domain.com
   - Test all three calculators
   - Check form validation
   - Verify charts render correctly
   - Test on mobile devices

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor error rates
   - Check PageSpeed Insights

3. **Set Up Auto-Deployment**
   - Vercel: Auto-deploys on push to main
   - Others: Set up webhook for GitHub

## SSL/HTTPS

- Vercel: Automatic SSL certificate
- Other platforms: Use Let's Encrypt or AWS Certificate Manager

## Performance Benchmarks

Target metrics:

- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

## Backup & Recovery

- Git repository serves as version control backup
- Data is stored in browser localStorage (client-side)
- Consider database backup if adding backend features

---

**Deployment completed!** Your Fin Buddy application is live and ready for users.
