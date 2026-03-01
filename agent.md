# 🚀 TASK – Evolução Estrutural do EducaRank Moz

## 🎯 Contexto

EducaRank Moz é uma plataforma de ranking educacional focada inicialmente na Cidade de Maputo.

Stack:
- Frontend: React + TypeScript (Vite)
- Backend: Supabase (PostgreSQL + Auth)
- Auth: Google Auth ativo
- Deploy: Vercel
- Repositório público

A partir de agora, o projeto deve evoluir com arquitetura profissional, foco em segurança e experiência do usuário.

Você também será responsável pelo UI/UX Design do sistema.

Prioridade máxima: EXPERIÊNCIA DO UTILIZADOR.

---

# 🔐 1️⃣ ADMIN INICIAL

Criar um usuário administrador no banco com:

Email:
admin.educamz@gmail.com

Role:
admin

⚠️ A senha NÃO deve ser hardcoded no código ou repositório.
A senha deve ser criada manualmente via Supabase Auth ou via variável de ambiente segura.

O admin deve:
- Ter acesso total
- Poder alterar roles
- Verificar instituições
- Moderar reviews
- Criar e editar blogs

---

# 🧱 2️⃣ BANCO DE DADOS – SUPABASE + RLS

Gerar script SQL completo com:

## Tabelas

profiles  
institutions  
reviews  
blog_posts  
moderation_flags  

Aplicar:
- Constraints
- Índices
- Unique (user_id + institution_id)
- Foreign Keys corretas
- created_at e updated_at automáticos

---

# 🔐 3️⃣ RLS OBRIGATÓRIO

Criar políticas para:

## 👤 User
- Pode ler instituições
- Pode criar 1 review por instituição
- Pode editar apenas sua review
- Pode editar próprio perfil
- Pode ver perfis públicos

## 🏫 Institution
- Pode editar apenas sua própria instituição
- Só se verified = true
- Pode ver reviews da sua instituição
- Não pode alterar ranking manualmente

## 🛡 Admin
- Acesso total
- Pode verificar instituições
- Pode publicar blogs
- Pode moderar reviews
- Pode alterar roles

---

# 📊 4️⃣ DASHBOARDS

Cada nível terá dashboard próprio:

## 👤 User Dashboard
- Editar perfil
- Histórico de avaliações
- Atividade recente

## 🏫 Institution Dashboard
- Editar informações institucionais
- Upload de banner e logo
- Estatísticas de avaliações
- Distribuição de notas
- Solicitar verificação

## 🛡 Admin Dashboard
- Gerenciar usuários
- Gerenciar instituições
- Aprovar verificação
- Moderar reviews
- Criar e editar blog

---

# 🌐 5️⃣ MELHORIAS NA ABA INSTITUIÇÕES

Transformar em sistema moderno de descoberta:

- Barra de pesquisa dinâmica
- Filtros inteligentes
- Cards com imagem, nome e descrição
- Layout responsivo
- Paginação ou infinite scroll

Ao clicar:
Abrir página estilo perfil institucional:

- Banner grande
- Logo destacada
- Nome
- Tipo
- Descrição
- Informações de matrícula
- Estatísticas
- Reviews
- Seção visual moderna

Design dinâmico e informativo.

---

# 📰 6️⃣ BLOG

Separado dos perfis institucionais.

Apenas Admin pode:
- Criar
- Editar
- Publicar
- Remover

Blog deve ter:
- Layout editorial moderno
- Destaques
- Leitura confortável
- Estrutura SEO friendly

---

# 🎨 7️⃣ UI/UX – VOCÊ É O DESIGNER

Você é responsável pelo design da aplicação.

Aplicar boas práticas modernas:

- Layout minimalista e institucional
- Hierarquia visual clara
- Microinterações suaves
- Feedback visual em ações
- Skeleton loading states
- Responsividade total
- Acessibilidade básica (contraste adequado)
- Espaçamento consistente
- Design System coerente

Prioridade absoluta:
Experiência fluida e intuitiva.

---

# 📁 8️⃣ REPOSITÓRIO

- Adicionar .env ao .gitignore
- Garantir que nenhuma chave sensível esteja versionada
- Atualizar README.md

README deve conter:
- Objetivo do projeto
- Impacto social
- Stack
- Estrutura de permissões
- Como rodar localmente
- Variáveis necessárias
- Visão futura

---

# 📈 9️⃣ BOAS PRÁTICAS OBRIGATÓRIAS

- Sempre atualizar versão do projeto
- Separação clara de responsabilidades
- Camada de services no frontend
- Nunca lógica crítica apenas no frontend
- Segurança via RLS
- Indexação para performance
- Código limpo e escalável

---

# 🎯 OBJETIVO FINAL

Transformar EducaRank Moz em:

- Plataforma educacional confiável
- Sistema seguro
- Base escalável
- Experiência moderna e profissional
- Estrutura pronta para futura integração com FastAPI