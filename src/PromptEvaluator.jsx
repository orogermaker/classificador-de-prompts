import React, { useState } from 'react';

export default function PromptEvaluator() {
  const [prompt, setPrompt] = useState('');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const evaluatePrompt = () => {
    let points = 0;
    let feedbackParts = [];
    let suggestions = [];
    const promptLower = prompt.toLowerCase();

    const actionVerbs = ['crie', 'resuma', 'explique', 'elabore', 'planeje'];
    if (actionVerbs.some(verb => promptLower.includes(verb))) {
      points++;
      feedbackParts.push('✔️ Verbo de ação identificado.');
    } else {
      feedbackParts.push('❌ Falta um verbo de ação.');
      suggestions.push('Adicione um verbo de ação como "crie".');
    }

    const publicoRegex = /(educa\w* infan\w*|\d+º?\s*ano|ensino médio|disciplina)/i;
    if (publicoRegex.test(prompt)) {
      points++;
      feedbackParts.push('✔️ Público-alvo identificado.');
    } else {
      feedbackParts.push('❌ Falta indicação do público-alvo.');
      suggestions.push('Informe para qual série ou disciplina.');
    }

    const recursoRegex = /(tempo|minutos|tecnologia|objetivos|ferramentas)/i;
    if (recursoRegex.test(prompt)) {
      points++;
      feedbackParts.push('✔️ Recursos/contexto identificados.');
    } else {
      feedbackParts.push('❌ Falta descrição de recursos ou objetivos.');
      suggestions.push('Inclua detalhes sobre tempo, ferramentas ou objetivos.');
    }

    const formatoRegex = /(lista|tabela|plano de aula|atividade)/i;
    if (formatoRegex.test(prompt)) {
      points++;
      feedbackParts.push('✔️ Formato desejado identificado.');
    } else {
      feedbackParts.push('❌ Falta indicação do formato.');
      suggestions.push('Especifique o formato da resposta (lista, tabela, plano de aula).');
    }

    setScore(points);
    setFeedback(feedbackParts.join('\n'));
    setSuggestion(suggestions.length ? suggestions.join(' ') : '✔️ Seu prompt está bem estruturado!');
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '24px',
      backgroundColor: '#F3E8FF',
      borderRadius: '24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'system-ui, sans-serif'
    },
    title: {
      textAlign: 'center',
      color: '#5B21B6',
      marginBottom: '16px'
    },
    textarea: {
      width: '100%',
      padding: '16px',
      borderRadius: '16px',
      border: '2px solid #D8B4FE',
      outline: 'none',
      resize: 'vertical',
      marginBottom: '16px',
      fontSize: '16px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#A78BFA',
      border: 'none',
      borderRadius: '16px',
      color: '#FFFFFF',
      fontSize: '16px',
      cursor: 'pointer'
    },
    result: {
      backgroundColor: '#EDE9FE',
      padding: '24px',
      borderRadius: '16px',
      marginTop: '24px'
    },
    score: {
      color: '#4C1D95',
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    feedback: {
      whiteSpace: 'pre-wrap',
      color: '#6B21A8',
      fontSize: '16px'
    },
    suggestion: {
      marginTop: '12px',
      color: '#5B21B6',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Classificador de Prompts Educacionais</h1>
      <textarea
        rows={6}
        placeholder="Digite seu prompt aqui..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={styles.textarea}
      />
      <button
        onClick={evaluatePrompt}
        style={styles.button}
      >
        Avaliar Prompt
      </button>

      {score !== null && (
        <div style={styles.result}>
          <div style={styles.score}>Pontuação: {score} / 4</div>
          <div style={styles.feedback}>{feedback}</div>
          <div style={styles.suggestion}><strong>Sugestão de melhoria:</strong> {suggestion}</div>
        </div>
      )}
    </div>
  );
}
