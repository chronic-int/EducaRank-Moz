# 🚀 TASK – Implementação do Sistema de Reputação de Usuário  
## Projeto: EducaRank Moz

---

# 🎯 CONTEXTO

EducaRank Moz é uma plataforma educacional com:

- Frontend: React + TypeScript (Vite)
- Backend: Supabase (PostgreSQL + Auth + RLS)
- Auth: Google Auth
- Deploy: Vercel
- Repositório público

Objetivo agora:

👉 Implementar SISTEMA COMPLETO DE REPUTAÇÃO DE USUÁRIO  
👉 Integrar com reviews  
👉 Tornar a página institucional totalmente funcional  
👉 Manter segurança via RLS  
👉 Priorizar experiência do utilizador  

Você também será responsável pelo UI/UX dessa funcionalidade.

---

# 🏅 1️⃣ OBJETIVO DO SISTEMA DE REPUTAÇÃO

Criar um sistema que:

- Valorize usuários ativos
- Reduza spam
- Destaque reviews úteis
- Incentive comportamento saudável

O sistema deve ser automático e baseado em ações do usuário.

---

# 🧱 2️⃣ ALTERAÇÕES NO BANCO DE DADOS (SQL COMPLETO)

Gerar script SQL profissional contendo:

---

## 🔹 Atualização da tabela `profiles`

Adicionar colunas:

- reputation_score (integer default 0)
- total_reviews (integer default 0)
- helpful_votes_received (integer default 0)
- helpful_votes_given (integer default 0)
- reports_received (integer default 0)
- is_trusted (boolean default false)

Criar índices necessários.

---

## 🔹 Nova tabela `review_votes`

Campos:

- id (uuid, pk)
- review_id (fk reviews)
- voted_by (fk profiles)
- vote_type (enum: helpful, not_helpful)
- created_at

Constraint:

- UNIQUE (review_id, voted_by)

Criar índices.

---

## 🔹 Nova tabela `review_reports`

Campos:

- id
- review_id
- reported_by
- reason
- status (pending, reviewed, dismissed)
- created_at

Constraint:

- UNIQUE (review_id, reported_by)

---

# 🔐 3️⃣ RLS OBRIGATÓRIO

Criar policies para:

---

## 👤 User

Pode:

- Criar voto (1 por review)
- Remover seu próprio voto
- Criar denúncia
- Ver reviews
- Ver reputação pública

Não pode:

- Alterar reputation_score manualmente
- Alterar dados de outros usuários

---

## 🛡 Admin

Pode:

- Atualizar reputation_score
- Marcar is_trusted
- Resolver denúncias
- Remover reviews
- Remover votos

---

# 🧠 4️⃣ LÓGICA DE REPUTAÇÃO (FUNÇÕES SQL)

Criar função SQL que atualiza reputação automaticamente quando:

- Usuário cria review → +5 pontos
- Review recebe voto helpful → +2 pontos
- Review recebe voto not_helpful → -1 ponto
- Review é denunciada e confirmada → -5 pontos

Criar trigger:

Após insert/delete em review_votes  
Após resolução de denúncia  

Atualizar:

- reputation_score
- helpful_votes_received
- total_reviews
- is_trusted (true se reputation_score >= 50)

---

# 🎨 5️⃣ FRONTEND – IMPLEMENTAÇÃO

## 🔹 Atualizar Página Institucional (ABA AVALIAÇÕES)

Cada review deve mostrar:

- Nome do usuário
- Badge de reputação
- Score visual
- Botão 👍 Útil
- Botão 👎 Não útil
- Botão Denunciar

Se usuário já votou:
- Mostrar estado ativo

Se usuário não autenticado:
- Botões desativados

---

## 🔹 Perfil do Usuário (Página Pública)

Criar página:

/profile/:id

Mostrar:

- Nome
- Avatar
- Bio
- Instituição onde estudou
- Reputation Score
- Badge (Novo, Contribuidor, Confiável)
- Total de reviews
- Lista de reviews feitas

Perfil deve ser público.

---

# 🏆 6️⃣ BADGES DE REPUTAÇÃO

Definir:

- 0–19 → Novo membro
- 20–49 → Contribuidor ativo
- 50+ → Usuário confiável

Mostrar badge ao lado do nome em:

- Reviews
- Perfil público
- Dashboard

---

# 🎨 7️⃣ UX – BOAS PRÁTICAS OBRIGATÓRIAS

Você é responsável pelo design dessa funcionalidade.

Aplicar:

- Microinterações suaves
- Feedback visual ao votar
- Loading states
- Animação leve ao ganhar reputação
- Tooltip explicando sistema de reputação
- Design limpo e moderno
- Layout responsivo
- Hierarquia clara
- Evitar poluição visual

Prioridade: experiência fluida e intuitiva.

---

# 📊 8️⃣ ORDENAÇÃO INTELIGENTE DE REVIEWS

Na aba Avaliações:

Permitir ordenar por:

- Mais recentes
- Mais úteis
- Maior reputação do autor

Reviews de usuários confiáveis devem ter leve destaque visual.

---

# 🧩 9️⃣ ORGANIZAÇÃO DE CÓDIGO

No frontend:

Criar:

- services/reputationService.ts
- services/voteService.ts
- services/reportService.ts

Separar lógica de UI.

Não colocar lógica crítica apenas no frontend.

---

# 🔒 10️⃣ SEGURANÇA

- Garantir integridade via constraints
- Garantir integridade via RLS
- Não permitir manipulação manual de reputação
- Usar funções SQL para cálculos

---

# 🎯 OBJETIVO FINAL

Após implementação:

- Usuários podem votar em reviews
- Sistema calcula reputação automaticamente
- Perfis exibem reputação
- Reviews são ordenadas por utilidade
- Sistema é seguro
- Página institucional funciona completamente
- UX é moderna e profissional

---

# 🚀 IMPORTANTE

Sempre atualizar versão do projeto.

Garantir que o sistema funcione em produção no Vercel.

Testar:

- Criação de review
- Votação
- Atualização de reputação
- Exibição correta na interface
- Segurança RLS
