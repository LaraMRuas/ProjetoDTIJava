import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [notas, setNotas] = useState(['', '', '', '', '']);
  const [frequencia, setFrequencia] = useState('');
  const [alunos, setAlunos] = useState<any[]>([]);
  const [relatorio, setRelatorio] = useState<any | null>(null);
  const [carregandoRelatorio, setCarregandoRelatorio] = useState(false);
  const [erroRelatorio, setErroRelatorio] = useState<string | null>(null);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);


  function handleAdicionarAluno() {
  setErroFormulario(null);

  if (!nome.trim()) {
    const msg = 'Nome é obrigatório';
    setErroFormulario(msg);
    Alert.alert('Formulário inválido', msg);
    return;
  }

  const notasPreenchidas = notas.every((n) => n.trim() !== '');
  if (!notasPreenchidas) {
    const msg = 'Preencha todas as notas';
    setErroFormulario(msg);
    Alert.alert('Formulário inválido', msg);
    return;
  }

  if (!frequencia.trim()) {
    const msg = 'Frequência é obrigatória';
    setErroFormulario(msg);
    Alert.alert('Formulário inválido', msg);
    return;
  }

 
  const notasNumericas = notas.map((n) => Number(n.replace(',', '.')));
  const frequenciaNumerica = Number(frequencia.replace(',', '.'));

 
  const notasInvalidas = notasNumericas.some(
    (nota) => isNaN(nota) || nota < 0 || nota > 10
  );

  if (notasInvalidas) {
    const msg = 'Cada nota deve ser um número entre 0 e 10.';
    setErroFormulario(msg);
    Alert.alert('Notas inválidas', msg);
    return;
  }


  if (
    isNaN(frequenciaNumerica) ||
    frequenciaNumerica < 0 ||
    frequenciaNumerica > 100
  ) {
    const msg = 'A frequência deve ser um número entre 0 e 100.';
    setErroFormulario(msg);
    Alert.alert('Frequência inválida', msg);
    return;
  }

  const novoAluno = {
    nome,
    notas: notasNumericas,
    frequencia: frequenciaNumerica,
  };

  const novaLista = [...alunos, novoAluno];

  setAlunos(novaLista);
  setNome('');
  setNotas(['', '', '', '', '']);
  setFrequencia('');

  gerarRelatorio(novaLista);
}

  async function gerarRelatorio(listaAlunos: any[]) {
    if (listaAlunos.length === 0) {
      return;
    }

    setCarregandoRelatorio(true);
    setErroRelatorio(null);

    try {
      const body = { alunos: listaAlunos };

      const response = await fetch('http://localhost:8080/relatorio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar relatório');
      }

      const data = await response.json();
      setRelatorio(data);
    } catch (error) {
      console.log('Erro na requisição:', error);
      setErroRelatorio('Não foi possível gerar o relatório.');
    } finally {
      setCarregandoRelatorio(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Text style={styles.appTitle}>Notas – Prof. Carlos</Text>
<Text style={styles.appSubtitle}>
  Cadastre alunos, notas e veja o resumo da turma.
</Text>

        <View style={styles.section}>
         <Text style={styles.sectionTitle}>Adicionar aluno</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do aluno"
            placeholderTextColor="#9CA3AF"
            value={nome}
            onChangeText={setNome}
          />

        <View style={styles.notasRow}>
          {notas.map((nota, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Nota ${index + 1}`}
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={nota}
              onChangeText={(texto) => {
                const novasNotas = [...notas];
                novasNotas[index] = texto;
                setNotas(novasNotas);
              }}
            />
          ))}
        </View>

          <TextInput
            style={styles.input}
            placeholder="Frequência (%)"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={frequencia}
            onChangeText={setFrequencia}
          />

          <TouchableOpacity style={styles.button} onPress={handleAdicionarAluno}>
  <Text style={styles.buttonText}>Adicionar aluno</Text>
</TouchableOpacity>

          {erroFormulario && (
  <Text style={styles.errorText}>{erroFormulario}</Text>
)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alunos cadastrados</Text>

          {alunos.length === 0 && (
            <Text style={styles.emptyText}>Nenhum aluno cadastrado ainda.</Text>
          )}

          {relatorio &&
            relatorio.alunosProcessados &&
            relatorio.alunosProcessados.map((aluno: any, index: number) => (
              <View key={index} style={styles.alunoCard}>
                <Text style={styles.alunoNome}>{aluno.nome}</Text>
                <Text>Média: {aluno.media}</Text>
                <Text>Frequência: {aluno.frequencia}%</Text>
                <Text
  style={aluno.acimaMediaTurma ? styles.textOk : styles.textAlerta}
>
  {aluno.acimaMediaTurma
    ? 'Acima da média da turma'
    : 'Abaixo da média da turma'}
</Text>

<Text
  style={aluno.frequenciaBaixa ? styles.textAlerta : styles.textOk}
>
  {aluno.frequenciaBaixa
    ? 'Frequência baixa (< 75%)'
    : 'Frequência ok'}
</Text>

              </View>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo da turma</Text>

          {carregandoRelatorio && <Text>Gerando relatório...</Text>}

          {erroRelatorio && <Text style={styles.errorText}>{erroRelatorio}</Text>}

          {relatorio && (
            <View style={styles.resumoContainer}>
              <Text>Média geral da turma: {relatorio.mediaGeralTurma.toFixed(2)}</Text>

              <Text style={styles.sectionSubtitle}>Médias por disciplina:</Text>
              {relatorio.mediasPorDisciplina &&
                relatorio.mediasPorDisciplina.map((media: number, index: number) => (
                  <Text key={index}>
                    Disciplina {index + 1}: {media.toFixed(2)}
                  </Text>
                ))}

              <Text style={styles.sectionSubtitle}>Alunos acima da média:</Text>
              {relatorio.alunosAcimaMedia &&
                relatorio.alunosAcimaMedia.map((aluno: any, index: number) => (
                  <Text key={index}>• {aluno.nome} ({aluno.media.toFixed(2)})</Text>
                ))}

              <Text style={styles.sectionSubtitle}>Frequência abaixo de 75%:</Text>
              {relatorio.alunosFrequenciaBaixa &&
                relatorio.alunosFrequenciaBaixa.map((aluno: any, index: number) => (
                  <Text key={index}>• {aluno.nome} ({aluno.frequencia}%)</Text>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
},
content: {
  padding: 16,        
  alignItems: 'center', 
},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
  width: '100%',
  maxWidth: 900,  
  marginBottom: 16,
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
},

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#666',
  },
  alunoCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  alunoNome: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  sectionSubtitle: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  resumoContainer: {
    marginTop: 12,
    gap: 4,
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#02053f', 
},
appTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 4,
  color: '#E5F4FF',
},
appSubtitle: {
  fontSize: 14,
  textAlign: 'center',
  marginBottom: 16,
  color: '#8FE9FF',
},
notasRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},
inputNota: {
  flexBasis: '48%', 
},
button: {
  backgroundColor: '#00C7FF',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 4,
},
buttonText: {
  color: '#02053F',
  fontWeight: 'bold',
  fontSize: 15,
},
textOk: {
    color: '#15803d',     
    fontSize: 13,
    fontWeight: '600',
  },
  textAlerta: {
    color: '#b91c1c',      
    fontSize: 13,
    fontWeight: '600',
  },
});
