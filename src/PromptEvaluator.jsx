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

  return (
    <div className="p-8 max-w-lg mx-auto space-y-8 bg-purple-50 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-purple-800 text-center">Classificador de Prompts Educacionais</h1>
      <textarea
        rows={6}
        placeholder="Digite seu prompt aqui..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-4 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200"
      />
      <button
        onClick={evaluatePrompt}
        className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-2xl shadow-md transition"
      >
        Avaliar Prompt
      </button>

      {score !== null && (
        <div className="bg-purple-100 p-6 rounded-2xl shadow-inner space-y-4">
          <p className="text-xl font-semibold text-purple-900">Pontuação: {score} / 4</p>
          <pre className="whitespace-pre-wrap text-base text-purple-700">{feedback}</pre>
          <p className="mt-2 text-base text-purple-900 font-medium">Sugestão de melhoria:</p>
          <p className="text-base text-purple-800">{suggestion}</p>
        </div>
      )}
    </div>
  );
}
