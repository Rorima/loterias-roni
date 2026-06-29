# Loterias Roni

## Sprint 1
- [x] Criar projeto React
- [x] Executar pela primeira vez

## Sprint 2
- [x] Barra de navegação
- [x] Página Home
- [x] Página Apostas
- [x] Página Bolsa
- [x] Página Renda Fixa
- [x] Página Estatísticas

## Sprint 3
- [x] Sistema de pontos
- [x] Salvamento automático

## Sprint 4
- [x] Sistema de renda fixa

## Sprint 5
- [x] Sistema de apostas

## Sprint 6
- [x] Sistema da bolsa

## Sprint 7
- [x] Estatísticas

## Sprint 8
- [x] Transformar em PWA

## Ajustes

### Tela inicial
- [x] Centralizar nome Loterias Roni no topo do aplicativo

### Tela de apostas

- [x] Consigo colocar um valor que ainda não tenho e ao clicar em apostar, ele me diz se ganhei ou se perdi, embora não faça diferença na quantidade de pontos. Acho que não deveria haver nenhum feedback se o valor for maior do que o saldo disponível, assim como acontece quando tento apostar -1
- [x] Gostaria de melhores ideias para as probabilidades das apostas, porque só tenho vontade de apostar no 2x, já que é o único que posso ganhar algo. Que tal algo como 1.2x, 1.5x, 2x? Assim 2x seria o máximo. E não sei se seria legal mostrar ao usuário a chance que ele tem de ganhar, já que ele sempre vai escolher o botão que dá a maior chance possível
- [x] O input de quantidade pode ser menor. Tem telas pequenas, como a de celular, o botão de apostar vai para baixo do campo de quantidade, e não fica muito bonito

### Bolsa

- [x] Os gráficos são muito chatos. Não sei qual é o problema, mas todos eles se parecem muito, com uma linha basicamente reta, embora alguns stocks estejam no topo e outros estejam no fundo. Acho que tem a ver com o "histórico" que deve ter pouco registro, daí o gráfico parece que mostra só os últimos 5 pontos. Quando a volatilidade é baixa, o gráfico é praticamente reto. Seria legal se ele mostrasse um histórico longo para vermos um gráfico que sobe desce. Seria bom se desse pra controlar isso no arquivo de constantes
-[x] Quando compramos um stock, um botão de venda aparece. Ele sai da caixa do stock quando a tela é de ceular. Não sei qual seria o melhor ajuste para isso. Vou tentar enviar um print

### Renda fixa

-[x] Como os números de pontos não são float, o dividendo não começa a crescer até ter 100 pontos investidos. Depois dos 100, ele começa a crescer muito rápido, mesmo sendo 0.01 por segundo. Eu posso abaixar para 0.001, mas o problema do dividendo não subir até chegar em 100 continuaria, e talvez pioraria, não crescendo até chegar em 1000 investidos

---

Crie a próxima sprint adicionando itens colecionáveis através da compra de caixinhas da sorte