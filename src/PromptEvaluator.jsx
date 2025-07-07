import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
      feedbackParts.push('❌ Falta um verbo de ação no início.');
      suggestions.push('Adicione um verbo de ação, como "crie" ou "explique".');
    }

    const publicoRegex = /(educa\w* infan\w*|\d+º?\s*ano|ensino médio|faixa etária|disciplina)/i;
    if (publicoRegex.test(prompt)) {
      points++;
      feedbackParts.push('✔️ Público-alvo identificado.');
    } else {
      feedbackParts.push('❌ Falta indicação do público-alvo (série, faixa etária ou disciplina).');
      suggestions.push('Informe para quem é o prompt (ex: 5º ano, Ensino Médio, Educação Infantil).');
    }

    const recursoRegex = /(tempo|minutos|tecnologia|objetivos|ferramentas|metodologia)/i;
    if (recursoRegex.test(prompt)) {
      points++;
      feedbackParts.push('✔️ Recursos ou contexto identificados.');
    } else {
      feedbackParts.push('❌ Falta descrição de recursos, tempo ou objetivos.');
      suggestions.push('Inclua detalhes sobre tempo, ferramentas, ou objetivos pedagógicos.');
    }

    const formatoRegex = /(lista|tabela|parágrafo|plano de aula|roteiro|atividade)/i;
    if (formatoRegex.test(prompt)) {
      points++;
      feedbackParts.push('✔️ Formato desejado identificado.');
    } else {
      feedbackParts.push('❌ Falta indicação do formato desejado (lista, plano de aula etc).');
      suggestions.push('Indique o formato esperado da resposta (ex: plano de aula, lista, tabela).');
    }

    setScore(points);
    setFeedback(feedbackParts.join('\n'));
    setSuggestion(suggestions.length ? suggestions.join(' ') : '✔️ Seu prompt está bem estruturado!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-purple-50 rounded-xl">
      <h1 className="text-2xl font-bold text-purple-700">Classificador de Prompts Educacionais</h1>
      <Textarea
        placeholder="Digite seu prompt aqui..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[120px] border-purple-300 focus:border-purple-500 focus:ring-purple-500"
      />
      <Button onClick={evaluatePrompt} className="bg-purple-400 hover:bg-purple-500 text-white">Avaliar Prompt</Button>

      {score !== null && (
        <Card className="bg-purple-100">
          <CardContent className="space-y-2 py-4">
            <p className="font-semibold text-purple-800">Pontuação: {score} / 4</p>
            <pre className="whitespace-pre-wrap text-sm text-purple-700">{feedback}</pre>
            <p className="mt-2 text-sm text-purple-900 font-medium">Sugestão de melhoria:</p>
            <p className="text-sm text-purple-800">{suggestion}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}