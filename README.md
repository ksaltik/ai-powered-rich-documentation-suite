# AI-Powered Rich Documentation Suite (Revize)

Bu proje; React tabanlı, gerçek zamanlı işbirliği desteği sunan, WYSIWYG ve Markdown/AsciiDoc hibrit yapısında, AI yetenekleriyle donatılmış bir dökümantasyon platformudur.

## Başlangıç Kılavuzu

### 1. Gereksinimler

- Node.js (v18+)
- Docker ve Docker Compose (PostgreSQL ve Redis için)

### 2. Kurulum

\`\`\`bash
# Frontend Bağımlılıkları
cd frontend
npm install --legacy-peer-deps

# Backend Bağımlılıkları
cd ../backend
npm install
\`\`\`

### 3. Çalıştırma

1. **Altyapı (Veritabanı ve Önbellek)**:
   \`\`\`bash
   cd infra
   docker-compose up -d
   \`\`\`

2. **Backend**:
   \`\`\`bash
   cd backend
   npm run start:dev &
   \`\`\`

3. **Frontend**:
   \`\`\`bash
   cd frontend
   npm run dev &
   \`\`\`

## Özellikler

- **Hibrit Editör**: TipTap tabanlı, WYSIWYG ve Markdown destekli
- **Gerçek Zamanlı İşbirliği**: Hocuspocus ve Yjs altyapısı
- **Teknik Bloklar**: LaTeX formülleri (KaTeX ile) ve Mermaid şemaları (Geliştirme aşamasında)
- **Güvenlik**: DOMPurify ile XSS koruması
