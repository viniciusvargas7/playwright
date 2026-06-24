Benchmark de Execucao: Playwright vs Cypress
Data da execucao: 2026-06-23

Escopo
Projeto avaliado:

playwright-tests: 1 spec, 3 testes de login
cypress-tests: 1 spec equivalente, 3 testes de login
Metodologia:

Medicao principal: tempo total de parede (wall-clock), do inicio ao fim de cada comando
Todas as execucoes foram feitas separadamente
Playwright foi executado em todas as combinacoes pedidas:
1 browser com paralelismo ligado
1 browser com paralelismo desligado
3 browsers com paralelismo ligado
3 browsers com paralelismo desligado
Cypress nao tem paralelismo nativo local equivalente, entao os cenarios foram medidos em modo serial
No host atual, Cypress executou com electron, chrome e edge
Antes de rodar Cypress, foi necessario limpar a variavel de ambiente ELECTRON_RUN_AS_NODE=1, que impedia o binario de iniciar corretamente
Comandos executados
Playwright
npx playwright test --project chromium
npx playwright test --project chromium --workers 1
npx playwright test
npx playwright test --workers 1
Cypress
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npx cypress run --browser electron --spec "cypress/e2e/login.cy.js" --headless

Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npx cypress run --browser chrome --spec "cypress/e2e/login.cy.js" --headless

Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npx cypress run --browser edge --spec "cypress/e2e/login.cy.js" --headless
Resultados
Tempo total por execucao
Ferramenta	Cenario	Browsers	Paralelismo	Tempo total
Playwright	1 browser (chromium)	1	Ligado	5.411s
Playwright	1 browser (chromium)	1	Desligado	6.395s
Playwright	3 browsers	3	Ligado	19.411s
Playwright	3 browsers	3	Desligado	21.659s
Cypress	1 browser (electron)	1	Nativo indisponivel	18.762s
Cypress	1 browser (chrome)	1	Nativo indisponivel	25.091s
Cypress	1 browser (edge)	1	Nativo indisponivel	23.485s
Cypress	3 browsers agregados (electron + chrome + edge)	3	Serial	67.831s
Ranking do mais rapido para o mais lento
Posicao	Cenario	Tempo total
1	Playwright, 1 browser, paralelismo ligado	5.411s
2	Playwright, 1 browser, paralelismo desligado	6.395s
3	Cypress, 1 browser (electron)	18.762s
4	Playwright, 3 browsers, paralelismo ligado	19.411s
5	Playwright, 3 browsers, paralelismo desligado	21.659s
6	Cypress, 1 browser (edge)	23.485s
7	Cypress, 1 browser (chrome)	25.091s
8	Cypress, 3 browsers agregados em serie	67.831s
Nota: o ranking acima prioriza o tempo medido. O Cypress em 3 browsers nao e diretamente equivalente ao Playwright em 3 browsers com paralelismo ligado, porque no Cypress os browsers foram executados em sequencia.

Analise
Ganho de paralelismo no Playwright
Em 1 browser, ativar paralelismo reduziu o tempo de 6.395s para 5.411s

Ganho aproximado: 15.4%

Em 3 browsers, ativar paralelismo reduziu o tempo de 21.659s para 19.411s

Ganho aproximado: 10.4%

Comparativo single-browser
Melhor tempo Playwright: 5.411s em Chromium com paralelismo ligado
Melhor tempo Cypress: 18.762s em Electron
O melhor cenario do Cypress foi cerca de 3.47x mais lento que o melhor cenario do Playwright
Se a comparacao considerar browser Chromium/Chrome:

Playwright Chromium com paralelismo: 5.411s
Cypress Chrome: 25.091s
Nesse recorte, Cypress ficou cerca de 4.64x mais lento
Comparativo multi-browser
Playwright, 3 browsers com paralelismo: 19.411s
Playwright, 3 browsers sem paralelismo: 21.659s
Cypress, 3 browsers agregados em serie: 67.831s
No pacote multi-browser:

Cypress levou cerca de 3.49x o tempo do Playwright com paralelismo
Cypress levou cerca de 3.13x o tempo do Playwright sem paralelismo
Conclusao
Para este projeto e nesta maquina, o Playwright foi claramente mais rapido em todos os cenarios comparaveis.

O melhor cenario geral foi:

Playwright + Chromium + paralelismo ligado: 5.411s
O ponto principal do comparativo e:

Playwright escala melhor quando aumenta a combinacao de testes e browsers
Cypress sofre mais com custo fixo de inicializacao por execucao
No comparativo multi-browser, a ausencia de paralelismo nativo local no Cypress amplia bastante a diferenca
Observacoes do ambiente
O Cypress inicialmente falhava para iniciar por causa de ELECTRON_RUN_AS_NODE=1
As execucoes validas do Cypress foram feitas somente apos limpar essa variavel no shell
O Cypress exibiu alertas de policy do Chrome, mas os testes passaram normalmente
Nao houve falhas de teste nas execucoes consideradas no relatorio
