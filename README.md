# Treinador de Silogismos Aristotélicos

## 📚 Sobre o Projeto

O Treinador de Silogismos Aristotélicos é uma aplicação web interativa desenvolvida para auxiliar no estudo e prática da lógica aristotélica, especificamente no que diz respeito aos silogismos categóricos. Este projeto implementa um gerador de problemas lógicos com sistema de correção automática, fornecendo feedback imediato ao usuário.

## 🔍 O que são Silogismos Aristotélicos?

Um silogismo é uma forma de raciocínio lógico que consiste em duas premissas e uma conclusão, onde a conclusão é inferida das premissas. Na lógica aristotélica, os silogismos categóricos são compostos por três partes:

1. **Premissa Maior**: Proposição geral
2. **Premissa Menor**: Proposição específica
3. **Conclusão**: Inferência lógica das premissas

O sistema classifica os silogismos em quatro figuras, determinadas pela posição do termo médio (M) nas premissas:

1. **1ª Figura**: M-P, S-M ∴ S-P
2. **2ª Figura**: P-M, S-M ∴ S-P
3. **3ª Figura**: M-P, M-S ∴ S-P
4. **4ª Figura**: P-M, M-S ∴ S-P

## 🛠 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização responsiva e design moderno
- **JavaScript**: Lógica de funcionamento e interatividade
- **DOM Manipulation**: Atualização dinâmica da interface
- **Local Storage**: Persistência do placar de acertos/erros (opcional)

## 💡 Técnicas Implementadas

1. **Geração Aleatória de Problemas**:
   - Seleção randômica de termos (Sujeito, Predicado e Termo Médio)
   - Construção automática de premissas e conclusões
   - Garantia de concordância gramatical (plural/singular)

2. **Validação de Respostas**:
   - Verificação da figura selecionada
   - Análise da validade do silogismo
   - Detecção de regras violadas

3. **Feedback Detalhado**:
   - Explicação das regras de validade
   - Análise passo-a-passo do silogismo
   - Destaque visual para acertos e erros

## 📝 Regras de Validação Implementadas

O sistema verifica automaticamente as seguintes regras aristotélicas:

1. **Distribuição do Termo Médio**: Deve aparecer distribuído em pelo menos uma premissa
2. **Termos Distribuídos**: Nenhum termo pode estar distribuído na conclusão sem estar distribuído nas premissas
3. **Premissas Negativas**: Não podem gerar conclusão afirmativa
4. **Particularidade**: Se uma premissa é particular, a conclusão também deve ser

## 🎯 Casos de Uso

1. **Estudo Individual**:
   - Prática autodidata de lógica aristotélica
   - Preparação para exames e avaliações

2. **Ensino de Lógica**:
   - Ferramenta auxiliar para professores
   - Geração de exercícios em sala de aula

3. **Desenvolvimento Cognitivo**:
   - Treino de raciocínio lógico
   - Aprimoramento da capacidade analítica

## 🚀 Como Utilizar

1. Clique em "Gerar Novo Problema" para criar um silogismo aleatório
2. Analise a estrutura e identifique:
   - A figura do silogismo (1ª a 4ª)
   - Os termos (Sujeito, Predicado e Termo Médio)
   - A validade do argumento
3. Selecione suas respostas nos campos correspondentes
4. Clique em "Verificar Resposta" para obter feedback detalhado
5. Acompanhe seu progresso no placar de acertos/erros

## 🌟 Recursos Didáticos

- **Exemplos de Cada Figura**: Modelos canônicos de silogismos válidos
- **Análise de Regras**: Explicação detalhada das violações encontradas
- **Solução Passo-a-Passo**: Demonstração completa do raciocínio lógico

## 📊 Estrutura do Projeto

```
silogismos-aristotelicos/
│── index.html          # Estrutura principal da aplicação
│── styles.css          # Estilos e layout responsivo
│── script.js           # Lógica de funcionamento e interatividade
```

## 🔮 Melhorias Futuras

1. Implementação de diferentes níveis de dificuldade
2. Adição de um sistema de progressão com conquistas
3. Integração com backend para armazenamento de estatísticas
4. Versão mobile otimizada

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido para fins educacionais, este projeto combina conceitos milenares de lógica com tecnologias web modernas, proporcionando uma experiência de aprendizado interativa e eficaz.
