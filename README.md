# 📦 E-commerce Project
## 📌 Descrição
Este projeto é um sistema de e-commerce desenvolvido em duas partes onde,
a Primeira parte é com Node.js e MongoDB, contendo uma API REST, junto com o seu front-end feito com react-native, expo e axios, e a Segunda é uma API GraphQL Simplificada com MongoDB e seu front-end feitocom react-native, expo e apollo server.

## 📂 Entidades

### 🏷️ Categoria `category.js`
- Atributos: name, description
- Descrição: Representa as categorias dos produtos vendidos no e-commerce.
- Relacionamento: Uma categoria pode conter vários produtos.

### 🎟️ Cupom `cupon.js`
- Atributos: code, discount, expiration, order
- Descrição: Cupons de desconto aplicáveis a pedidos.
- Relacionamento: Um cupom pode estar associado a vários pedidos, e um pedido pode conter vários cupons.

### 📦 Pedido `order.js`
- Atributos: totalAmount, created_at, cupon
- Descrição: Representa uma compra realizada por um usuário.
- Relacionamento: Um pedido pode conter vários cupons de desconto.

### 🛒 Produto `product.js`
- Atributos: name, src, storage, category
- Descrição: Produtos disponíveis para venda no e-commerce.
- Relacionamento: Um produto pertence a uma única categoria.

### 👤 Usuário `user.js`
- Atributos: name, email, password, created_at, profile
- Descrição: Representa os clientes que utilizam a plataforma.
- Relacionamento: Cada usuário tem um único perfil associado.

### 🏠 Perfil de Usuário `userProfile.js`
- Atributos: phone, address, user
- Descrição: Informações adicionais sobre o usuário.
- Relacionamento: Um perfil pertence a um único usuário.

## ⚙️ Funcionalidades
- ✔️ CRUD e autenticação de usuários
- ✔️ CRUD de categorias, cupons, pedidos, produtos e perfis de usuários

## 🚀 Tecnologias Utilizadas
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT) para autenticação
- bcrypt para hash de senhas
- express-validator para validação de dados
- dotenv para configuração de variáveis de ambiente
