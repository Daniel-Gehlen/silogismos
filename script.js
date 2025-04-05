document.addEventListener('DOMContentLoaded', function() {
    // Elementos da interface
    const generateBtn = document.getElementById('generate-btn');
    const submitBtn = document.getElementById('submit-btn');
    const problemContainer = document.getElementById('problem-container');
    const solutionDiv = document.getElementById('solution');
    const feedbackDiv = document.getElementById('feedback');
    const ruleNone = document.getElementById('rule-none');
    
    // Dados para gerar os problemas com tratamento correto de plural/singular
    const terms = {
        subjects: [
            {singular: 'homem', plural: 'homens', artigo: 'o', genero: 'm'},
            {singular: 'gato', plural: 'gatos', artigo: 'o', genero: 'm'},
            {singular: 'pássaro', plural: 'pássaros', artigo: 'o', genero: 'm'},
            {singular: 'peixe', plural: 'peixes', artigo: 'o', genero: 'm'},
            {singular: 'planta', plural: 'plantas', artigo: 'a', genero: 'f'},
            {singular: 'livro', plural: 'livros', artigo: 'o', genero: 'm'},
            {singular: 'computador', plural: 'computadores', artigo: 'o', genero: 'm'},
            {singular: 'cidade', plural: 'cidades', artigo: 'a', genero: 'f'}
        ],
        predicates: [
            {singular: 'mortal', plural: 'mortais', artigo: '', genero: null},
            {singular: 'mamífero', plural: 'mamíferos', artigo: 'o', genero: 'm'},
            {singular: 'voador', plural: 'voadores', artigo: 'o', genero: 'm'},
            {singular: 'aquático', plural: 'aquáticos', artigo: 'o', genero: 'm'},
            {singular: 'verde', plural: 'verdes', artigo: '', genero: null},
            {singular: 'útil', plural: 'úteis', artigo: '', genero: null},
            {singular: 'digital', plural: 'digitais', artigo: '', genero: null},
            {singular: 'grande', plural: 'grandes', artigo: '', genero: null}
        ],
        middleTerms: [
            {singular: 'animal', plural: 'animais', artigo: 'o', genero: 'm'},
            {singular: 'ser vivo', plural: 'seres vivos', artigo: 'o', genero: 'm'},
            {singular: 'objeto', plural: 'objetos', artigo: 'o', genero: 'm'},
            {singular: 'coisa', plural: 'coisas', artigo: 'a', genero: 'f'},
            {singular: 'artefato', plural: 'artefatos', artigo: 'o', genero: 'm'},
            {singular: 'organismo', plural: 'organismos', artigo: 'o', genero: 'm'}
        ]
    };
    
    const figures = [
        {
            name: "1ª Figura",
            structure: "M → P\nS → M\n∴ S → P",
            example: "Todos os humanos (M) são mortais (P).\nTodos os gregos (S) são humanos (M).\nLogo, todos os gregos (S) são mortais (P).",
            valid: true
        },
        {
            name: "2ª Figura",
            structure: "P → M\nS → M\n∴ S → P",
            example: "Nenhum pássaro (P) é mamífero (M).\nTodos os morcegos (S) são mamíferos (M).\nLogo, nenhum morcego (S) é pássaro (P).",
            valid: true
        },
        {
            name: "3ª Figura",
            structure: "M → P\nM → S\n∴ S → P",
            example: "Alguns gatos (M) são pretos (P).\nTodos os gatos (M) são animais (S).\nLogo, alguns animais (S) são pretos (P).",
            valid: true
        },
        {
            name: "4ª Figura",
            structure: "P → M\nM → S\n∴ S → P",
            example: "Todo P é M. Algum M é S. Logo, algum S é P.",
            valid: false
        }
    ];
    
    const rules = [
        "Termo médio deve estar distribuído em pelo menos uma premissa",
        "Nenhum termo distribuído na conclusão sem estar nas premissas",
        "Premissas negativas não geram conclusão afirmativa",
        "Se uma premissa é particular, a conclusão também deve ser"
    ];
    
    let currentProblem = {};
    let score = { correct: 0, wrong: 0 };

    // Função para formatar corretamente os termos com artigos e plural
    function formatTerm(term, isPlural, isNegative = false) {
        if (!term) return '';
        
        const artigo = term.artigo ? (isPlural ? `${term.artigo}s` : term.artigo) + ' ' : '';
        const palavra = isPlural ? term.plural : term.singular;
        
        return isNegative ? term.singular : (artigo + palavra);
    }

    // Gerar um problema aleatório com tratamento gramatical correto
    function generateProblem() {
        const randomFigure = figures[Math.floor(Math.random() * figures.length)];
        const S = terms.subjects[Math.floor(Math.random() * terms.subjects.length)];
        const P = terms.predicates[Math.floor(Math.random() * terms.predicates.length)];
        const M = terms.middleTerms[Math.floor(Math.random() * terms.middleTerms.length)];
        
        let majorPremise, minorPremise, conclusion;
        
        switch(randomFigure.name) {
            case "1ª Figura":
                majorPremise = `Todos ${formatTerm(M, true)} são ${formatTerm(P, true)}.`;
                minorPremise = `Todos ${formatTerm(S, true)} são ${formatTerm(M, true)}.`;
                conclusion = `Logo, todos ${formatTerm(S, true)} são ${formatTerm(P, true)}.`;
                break;
            case "2ª Figura":
                majorPremise = `Nenhum ${formatTerm(P, false, true)} é ${formatTerm(M, false)}.`;
                minorPremise = `Todos ${formatTerm(S, true)} são ${formatTerm(M, true)}.`;
                conclusion = `Logo, nenhum ${formatTerm(S, false, true)} é ${formatTerm(P, false)}.`;
                break;
            case "3ª Figura":
                majorPremise = `Alguns ${formatTerm(M, true)} são ${formatTerm(P, true)}.`;
                minorPremise = `Todos ${formatTerm(M, true)} são ${formatTerm(S, true)}.`;
                conclusion = `Logo, alguns ${formatTerm(S, true)} são ${formatTerm(P, true)}.`;
                break;
            case "4ª Figura":
                majorPremise = `Todo ${formatTerm(P, false)} é ${formatTerm(M, false)}.`;
                minorPremise = `Algum ${formatTerm(M, false)} é ${formatTerm(S, false)}.`;
                conclusion = `Logo, algum ${formatTerm(S, false)} é ${formatTerm(P, false)}.`;
                break;
        }
        
        // Atualizar a interface
        updateInterface(randomFigure, majorPremise, minorPremise, conclusion, S, P, M);
        
        // Determinar validade e análise das regras
        const isValid = isSilogismValid(randomFigure, majorPremise, minorPremise, conclusion);
        const rulesAnalysis = analyzeRules(randomFigure, majorPremise, minorPremise, conclusion);
        
        // Armazenar o problema atual
        currentProblem = {
            figure: randomFigure.name,
            figureIndex: figures.indexOf(randomFigure),
            majorPremise,
            minorPremise,
            conclusion,
            terms: { S: S.singular, P: P.singular, M: M.singular },
            isValid,
            rulesAnalysis
        };
        
        // Mostrar seções relevantes
        problemContainer.classList.remove('hidden');
        solutionDiv.classList.add('hidden');
        feedbackDiv.classList.add('hidden');
        
        // Limpar seleções anteriores
        resetForm();
    }
    
    function updateInterface(figure, major, minor, conclusion, S, P, M) {
        document.getElementById('problem-statement').innerHTML = `
            <p><strong>Premissa Maior:</strong> ${major}</p>
            <p><strong>Premissa Menor:</strong> ${minor}</p>
            <p><strong>Conclusão:</strong> ${conclusion}</p>
        `;
        
        document.getElementById('major-premise').textContent = major;
        document.getElementById('minor-premise').textContent = minor;
        document.getElementById('conclusion').textContent = conclusion;
        
        document.getElementById('terms').innerHTML = `
            <p><strong>Termo Sujeito (S):</strong> <span class="term">${S.singular}</span></p>
            <p><strong>Termo Predicado (P):</strong> <span class="term">${P.singular}</span></p>
            <p><strong>Termo Médio (M):</strong> <span class="term">${M.singular}</span></p>
        `;
        
        document.getElementById('rules').innerHTML = `
            <p>Avalie este silogismo segundo as seguintes regras:</p>
            <ul>
                ${rules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
        `;
        
        const isValid = isSilogismValid(figure, major, minor, conclusion);
        const rulesAnalysis = analyzeRules(figure, major, minor, conclusion);
        
        document.getElementById('solution-content').innerHTML = `
            <p>Este silogismo é <span class="${isValid ? 'valid' : 'invalid'}">${
                isValid ? 'VÁLIDO' : 'INVÁLIDO'
            }</span> segundo a ${figure.name}.</p>
            <p>Análise das regras:</p>
            <ul>
                ${rulesAnalysis.map(rule => 
                    `<li>${rule.rule}: <span class="${rule.valid ? 'valid' : 'invalid'}">${
                        rule.valid ? 'Respeitada' : 'Violada'
                    }</span>${!rule.valid ? ' - ' + rule.explanation : ''}</li>`
                ).join('')}
            </ul>
            <p><strong>Estrutura da ${figure.name}:</strong></p>
            <pre>${figure.structure}</pre>
            <p><strong>Exemplo:</strong></p>
            <pre>${figure.example}</pre>
        `;
    }
    
    function resetForm() {
        document.getElementById('figure-select').value = '';
        document.getElementById('validity-select').value = '';
        document.querySelectorAll('#rules-checklist input').forEach(cb => cb.checked = false);
    }
    
    function isSilogismValid(figure, majorPremise, minorPremise, conclusion) {
        if (!figure.valid) return false;
        return analyzeRules(figure, majorPremise, minorPremise, conclusion)
            .every(rule => rule.valid);
    }
    
    function analyzeRules(figure, majorPremise, minorPremise, conclusion) {
        const middleTerm = currentProblem?.terms?.M || '';
        
        return [
            {
                rule: rules[0],
                valid: majorPremise.includes(`Todos os ${middleTerm}`) || 
                      majorPremise.includes(`Nenhum ${middleTerm}`) ||
                      minorPremise.includes(`Todos os ${middleTerm}`),
                explanation: 'O termo médio deve aparecer distribuído em pelo menos uma premissa'
            },
            {
                rule: rules[1],
                valid: !hasIllicitMajorOrMinor(majorPremise, minorPremise, conclusion),
                explanation: 'Termo distribuído na conclusão deve estar distribuído nas premissas'
            },
            {
                rule: rules[2],
                valid: !(hasNegativePremise(majorPremise, minorPremise) && !isNegativeConclusion(conclusion)),
                explanation: 'Premissas negativas não podem gerar conclusão afirmativa'
            },
            {
                rule: rules[3],
                valid: !(hasParticularPremise(majorPremise, minorPremise) && !isParticularConclusion(conclusion)),
                explanation: 'Se há premissa particular, a conclusão deve ser particular'
            }
        ];
    }
    
    function hasIllicitMajorOrMinor(major, minor, conclusion) {
        // Implementação simplificada - poderia ser mais robusta
        return false;
    }
    
    function hasNegativePremise(major, minor) {
        return major.startsWith('Nenhum') || minor.startsWith('Nenhum');
    }
    
    function isNegativeConclusion(conclusion) {
        return conclusion.startsWith('Logo, nenhum');
    }
    
    function hasParticularPremise(major, minor) {
        return major.startsWith('Alguns') || minor.startsWith('Algum');
    }
    
    function isParticularConclusion(conclusion) {
        return conclusion.startsWith('Logo, alguns') || conclusion.startsWith('Logo, algum');
    }
    
    function checkAnswer() {
        if (!validateForm()) {
            showFeedback('Por favor, responda todas as questões.', false);
            return;
        }
        
        const { isFigureCorrect, isValidityCorrect, isRulesCorrect } = verifyAnswers();
        
        if (isFigureCorrect && isValidityCorrect && isRulesCorrect) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer();
        }
        
        updateScore();
        solutionDiv.classList.remove('hidden');
    }
    
    function validateForm() {
        const selectedFigure = document.getElementById('figure-select').value;
        const selectedValidity = document.getElementById('validity-select').value;
        const selectedRules = Array.from(document.querySelectorAll('#rules-checklist input:checked:not(#rule-none)')).length;
        const noneSelected = document.getElementById('rule-none').checked;
        
        return selectedFigure && selectedValidity && (noneSelected || selectedRules > 0);
    }
    
    function verifyAnswers() {
        const selectedFigure = parseInt(document.getElementById('figure-select').value) - 1;
        const selectedValidity = document.getElementById('validity-select').value;
        const selectedRules = Array.from(document.querySelectorAll('#rules-checklist input:checked:not(#rule-none)'))
            .map(cb => parseInt(cb.value));
        const noneSelected = document.getElementById('rule-none').checked;
        
        const isFigureCorrect = selectedFigure === currentProblem.figureIndex;
        const isValidityCorrect = (selectedValidity === 'valid') === currentProblem.isValid;
        
        const violatedRules = currentProblem.rulesAnalysis
            .filter(rule => !rule.valid)
            .map(rule => rules.indexOf(rule.rule));
        
        const isRulesCorrect = noneSelected ? 
            violatedRules.length === 0 : 
            arraysEqual(selectedRules.sort(), violatedRules.sort());
        
        return { isFigureCorrect, isValidityCorrect, isRulesCorrect, violatedRules };
    }
    
    function handleCorrectAnswer() {
        score.correct++;
        showFeedback('✓ Resposta correta! O silogismo está ' + 
            (currentProblem.isValid ? 'válido' : 'inválido') + 
            ' segundo a ' + currentProblem.figure + '.', true);
    }
    
    function handleIncorrectAnswer() {
        const { isFigureCorrect, isValidityCorrect, violatedRules } = verifyAnswers();
        
        score.wrong++;
        let feedback = '✗ Resposta incorreta. ';
        
        if (!isFigureCorrect) {
            feedback += `A figura correta é ${currentProblem.figure}. `;
        }
        if (!isValidityCorrect) {
            feedback += `O silogismo é ${currentProblem.isValid ? 'válido' : 'inválido'}. `;
        }
        
        if (violatedRules.length > 0) {
            feedback += 'Regras violadas: ' + 
                violatedRules.map(index => rules[index]).join(', ') + '.';
        } else if (!currentProblem.isValid) {
            feedback += 'Outras regras foram violadas.';
        }
        
        showFeedback(feedback, false);
    }
    
    function updateScore() {
        document.getElementById('correct-count').textContent = score.correct;
        document.getElementById('wrong-count').textContent = score.wrong;
    }
    
    function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
    }
    
    function showFeedback(message, isCorrect) {
        feedbackDiv.innerHTML = message;
        feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.classList.remove('hidden');
        feedbackDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    function setupRuleNoneCheckbox() {
        if (!ruleNone) return;
        
        ruleNone.addEventListener('change', function() {
            if (this.checked) {
                document.querySelectorAll('#rules-checklist input:not(#rule-none)')
                    .forEach(cb => cb.checked = false);
            }
        });
        
        document.querySelectorAll('#rules-checklist input:not(#rule-none)')
            .forEach(cb => {
                cb.addEventListener('change', function() {
                    if (this.checked && ruleNone) {
                        ruleNone.checked = false;
                    }
                });
            });
    }
    
    // Inicialização
    function init() {
        setupRuleNoneCheckbox();
        generateProblem();
        
        // Event listeners
        if (generateBtn) generateBtn.addEventListener('click', generateProblem);
        if (submitBtn) submitBtn.addEventListener('click', checkAnswer);
    }
    
    init();
});
