Proje Özeti: AI-Powered Rich Documentation Suite (Revize)

Bu proje; React tabanlı, gerçek zamanlı işbirliği desteği sunan, WYSIWYG ve Markdown/AsciiDoc hibrit yapısında, AI yetenekleriyle donatılmış bir dökümantasyon platformudur.

## 1. Mimari ve Teknoloji Seçimi (Güncellenmiş)

| **Katman** | **Önerilen Teknolojiler** | **Neden** |
| --- | --- | --- |
| **Frontend** | React + TypeScript + Vite | Modern, hızlı ve tip güvenli geliştirme. |
| **Rich Editor** | **TipTap (ProseMirror)** | Modüler yapı; LaTeX, Mermaid ve Custom NodeView desteği için en iyisi. |
| **Real-time Sync** | **Hocuspocus (Y-JS)** | Çakışmaları otomatik çözen (CRDT) gerçek zamanlı işbirliği altyapısı. |
| **Görsel Düzenleme** | TipTap Custom NodeView | Görselleri editör akışında (inline) boyutlandırma ve manipüle etme. |
| **Teknik Araçlar** | **KaTeX** & **Mermaid.js** | Matematiksel formüller ve akış diyagramları için endüstri standardı. |
| **Backend** | Node.js + NestJS | Ölçeklenebilir, modüler ve WebSocket (Hocuspocus) uyumlu. |
| **Veritabanı** | **PostgreSQL + pgvector** | Hem metadata hem de AI vektör verilerini tek DB'de yönetme kolaylığı. |
| **Auth & OAuth** | JWT (HttpOnly Cookies) + OAuth2 | Google Drive/OneDrive token güvenliği için backend-side yönetim. |
| **AI Katmanı** | OpenAI / Anthropic + **RAG** | Uzun belgeler için akıllı bağlam yönetimi (Retrieval-Augmented Gen). |

---

## 2. Özellik Listesi (Önceliklendirilmiş)

1. **Hibrit Editör:** WYSIWYG konforu ile Markdown/AsciiDoc gücü arasında anlık geçiş.
  
2. **Gerçek Zamanlı İşbirliği:** Birden fazla kullanıcının aynı belgede çalışması (Cusor tracking).
  
3. **Teknik Bloklar:**
  
  - **LaTeX:** Karmaşık matematiksel denklemlerin render edilmesi.
    
  - **Mermaid:** Metin tabanlı komutlarla dinamik akış şemaları oluşturma.
    
4. **Entegre Görsel Manipülasyon:** Editör içinde resmi sürükle-bırak, boyutlandır ve hizala.
  
5. **Bulut Entegrasyonu (Import/Export Focus):** Google Drive ve OneDrive'dan dosya çekme ve geri yükleme (Backend-managed OAuth).
  
6. **AI Ajan Özellikleri:**
  
  - **Akıllı Özetleme:** Uzun belgelerde RAG kullanarak bölüm bazlı özetleme.
    
  - **Diyagram Oluşturucu:** Metni otomatik olarak Mermaid şemasına dönüştürme.
    
  - **Semantik Arama:** Belge içinde "ne demek istediğimi" bul (pgvector destekli).
    
7. **Sürüm Kontrolü:** Değişiklik geçmişi (diff) ve önceki versiyonlara geri dönme.
  

---

## 3. Gelişmiş AI Task Dosyası

Uzun metin yönetimi ve diyagram desteği eklenmiş versiyon.

**Dosya:** `ai/agent_tasks.json`

JSON

```
{
  "agent_name": "doc-assistant-pro",
  "version": "1.1",
  "tasks": [
    {
      "id": "generate_mermaid_diagram",
      "description": "Metni analiz et ve Mermaid.js formatında akış şeması üret.",
      "prompt_template": "Aşağıdaki süreci analiz et ve sadece Mermaid.js 'graph TD' kodunu döndür. Açıklama yapma.\n\nMetin:\n{text}",
      "post_processing": ["extract_code_block", "validate_mermaid_syntax"]
    },
    {
      "id": "semantic_rag_search",
      "description": "Postgres pgvector kullanarak dökümanlar arası akıllı arama yap.",
      "input_schema": { "query": "string", "limit": 5 },
      "process_steps": ["embed_query", "vector_similarity_search", "rerank_results"],
      "outputs": { "matches": "Array<{id, snippet, score}>" }
    },
    {
      "id": "smart_paraphrase",
      "description": "Metni yeniden yazarken LaTeX ve HTML taglerini koru.",
      "prompt_template": "Aşağıdaki metni {tone} tonda yeniden yaz. [DİKKAT] KaTeX ($...$) ve Mermaid yapılarını kesinlikle değiştirme.\n\nMetin:\n{text}"
    }
  ]
}
```

---

## 4. Dosya ve Klasör Yapısı (Revize)

Plaintext

```
/project-root
├─ /frontend
│  ├─ /src
│  │  ├─ /editor
│  │  │  ├─ /extensions        # Custom TipTap (LaTeX, Mermaid, ImageResizer)
│  │  │  ├─ Editor.tsx         # Hocuspocus Provider entegreli editör
│  │  │  └─ Collaboration.ts   # Y-JS konfigürasyonu
│  │  ├─ /components
│  │  │  └─ AICommandPanel.tsx # Slash komutları (/summarize vb.)
│  │  └─ /services
│  │     └─ driveService.ts    # Backend üzerinden çalışan proxy servisler
├─ /backend
│  ├─ /src
│  │  ├─ /collaboration        # Hocuspocus server logic
│  │  ├─ /ai
│  │  │  ├─ vector.service.ts  # pgvector embedding işlemleri
│  │  │  └─ agent.orchestrator.ts
│  │  ├─ /auth
│  │  │  └─ oauth.controller.ts # HttpOnly cookie yönetimi
│  │  └─ db.schema.ts          # Postgres + pgvector tanımları
├─ /infra
│  └─ docker-compose.yml       # Postgres, Redis (Hocuspocus cache)
```

---

## 5. Güvenlik ve Performans İyileştirmeleri

- **Vektör Optimizasyonu:** Belgeler kaydedilirken otomatik olarak "chunking" (parçalara ayırma) yapılır ve her parça `pgvector` ile indexlenir.
  
- **Token Güvenliği:** Google/OneDrive `refresh_token`'ları veritabanında AES-256 ile şifrelenmiş şekilde saklanır; tarayıcıya asla gönderilmez.
  
- **Sanitization:** AI'dan gelen içerikler editöre basılmadan önce `DOMPurify` ile temizlenerek XSS saldırıları önlenir.
  

---

## 6. Geliştirme Yol Haritası (Milestones)

1. **Hafta 1-2 (Altyapı):** NestJS + Postgres (pgvector) kurulumu. Hocuspocus ile temel WebSocket bağlantısı.
  
2. **Hafta 3-4 (Editör Çekirdeği):** TipTap entegrasyonu, Markdown desteği ve Y-JS ile çoklu kullanıcı desteği.
  
3. **Hafta 5-6 (AI & Teknik Bloklar):** OpenAI RAG entegrasyonu. KaTeX ve Mermaid.js extension'larının yazılması.
  
4. **Hafta 7-8 (Cloud & Görsel):** Backend-side OAuth ile Drive entegrasyonu. Inline görsel boyutlandırma (NodeView).
  
5. **Hafta 9+:** Testler, Performans optimizasyonu ve Deployment.
  

---

**Sıradaki Adım:** İstersen projenin kalbi olan, **TipTap + Hocuspocus (Collaboration)** destekli temel `Editor.tsx` bileşenini ve LaTeX desteğini içeren kod örneğini hazırlayabilirim. Ne dersin?
