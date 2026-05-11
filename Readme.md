# Mokomint E-Commerce

A modern e-commerce web application built with Next.js and React.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
cd next-app
npm install
```

### Development

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
next-app/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── contact/           # Contact page
│   ├── shop/              # Shop page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── HomeCategories.tsx
│   ├── HomeHero.tsx
│   ├── HomFeatures.tsx
│   ├── Layout.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ShopBreadcrumb.tsx
│   └── ShopFilters.tsx
├── public/                # Static assets
│   ├── css/               # Stylesheets
│   ├── img/               # Images
│   ├── js/                # JavaScript files
│   └── lib/               # Third-party libraries
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.4
- **UI Library:** React 18.3.1
- **Language:** TypeScript
- **Styling:** CSS
- **State Management:** Redux Toolkit
- **UI Enhancements:** React Toastify

## 🚀 Deployment to Azure Storage

This project includes an automated CI/CD pipeline for deploying to Azure Storage with backup management.

### Quick Start
1. **Setup**: Follow [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) for complete instructions
2. **Configure**: Add 4 GitHub Secrets with Azure credentials
3. **Deploy**: Push to `main` branch, approve in GitHub Actions
4. **Monitor**: Check backups and manage versions with [scripts/manage-storage.ps1](./scripts/manage-storage.ps1)

### Key Features
- ✅ Automated static site generation
- ✅ Manual approval gate before deployment
- ✅ Automatic backup with incremental versioning (`backup1`, `backup2`, etc.)
- ✅ One-click version recovery
- ✅ Automatic cleanup of old backups (30-day retention)

### Documentation
- **Full Setup Guide**: [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
- **Quick Reference**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Implementation Summary**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Scripts Documentation**: [scripts/README.md](./scripts/README.md)

### Scripts
- `backup-and-deploy.ps1` - Automated deployment with backup
- `manage-storage.ps1` - Manual operations (restore, list backups, etc.)

## 📄 License

Private - Mokomint Official
