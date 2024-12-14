# NLW Pocket - Rocketseat

## Descrição do Projeto
Este repositório contém o projeto desenvolvido durante o evento **NLW Pocket** promovido pela **Rocketseat**. Trata-se de uma aplicação multiplataforma construída com **React Native** e **TypeScript**, cujo objetivo é escanear **QR Codes** de locais fictícios e disponibilizar cupons para os usuários. O projeto foi criado como um exercício prático para aprendizado de tecnologias modernas de desenvolvimento.

## Funcionalidades
- Leitura de **QR Codes** para identificar locais fictícios.
- Geração de cupons exclusivos para os usuários após a leitura do QR Code.
- Integração com um servidor interno e banco de dados.
- Permissões dinâmicas para acesso à câmera.

## Tecnologias Utilizadas
- **React Native**
- **TypeScript**
- **Expo**
- Bibliotecas:
  - **expo-camera**
  - **react-native-maps**

## Aprendizado
Durante o desenvolvimento deste projeto, foram abordados os seguintes tópicos:
- Estruturação de projetos em **React Native**.
- Uso de **hooks**: 
  - `useState`
  - `useEffect`
- Manipulação de funções assíncronas.
- Implementação de permissões de acesso do usuário (câmera).
- Tratamento de erros específicos.
- Configuração e uso de bibliotecas para map-view e câmera.

## Como Executar o Projeto
1. Clone este repositório:
   ```bash
   git clone https://github.com/NaderFares16/NearbyApp.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd nearby-app
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
5. Abra o aplicativo em um emulador ou dispositivo físico:
   - Utilize o QR Code gerado pelo Expo para abrir no aplicativo Expo Go no celular.

## Estrutura do Projeto
```
├── src
│   ├── app             # Router da Aplicação
│   ├── components      # Componentes reutilizáveis
│   ├── styles          # Definição dos estilos
│   ├── services        # Configuração de API e banco de dados
│   └── assets          # Imagens, ícones e outros recursos
├── package.json        # Dependências e scripts
└── README.md           # Documentação do projeto
```

## Licença
Este projeto foi desenvolvido para fins educacionais e não possui fins comerciais. Direitos reservados à Rocketseat e aos participantes do NLW Pocket.

---
**Desenvolvido durante o NLW Pocket - Rocketseat.**
