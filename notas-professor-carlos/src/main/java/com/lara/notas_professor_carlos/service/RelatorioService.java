package com.lara.notas_professor_carlos.service;
import java.util.ArrayList;
import java.util.List;
import com.lara.notas_professor_carlos.model.Aluno;
import com.lara.notas_professor_carlos.model.RelatorioResponse;
import com.lara.notas_professor_carlos.model.AlunoProcessado;
public class RelatorioService {
    public RelatorioResponse gerarRelatorio(List<Aluno> alunos) {
        RelatorioResponse response = new RelatorioResponse();
        List<AlunoProcessado> alunosProcessados = new ArrayList<>();
        double mediaGeralTurma = 0.0;
        List<Double> mediasPorDisciplina = new ArrayList<>();
        List<AlunoProcessado> alunosAcimaMedia = new ArrayList<>();
        List<AlunoProcessado> alunosAbaixoMedia = new ArrayList<>();
        List<AlunoProcessado> alunosFrequenciaBaixa = new ArrayList<>();
        List<AlunoProcessado> alunosFrequenciaAlta = new ArrayList<>();
        if (alunos == null || alunos.isEmpty()) {
            response.setAlunosProcessados(alunosProcessados);
            response.setMediaGeralTurma(mediaGeralTurma);
            response.setMediasPorDisciplina(mediasPorDisciplina);
            response.setAlunosAcimaMedia(alunosAcimaMedia);
            response.setAlunosAbaixoMedia(alunosAbaixoMedia);
            response.setAlunosFrequenciaBaixa(alunosFrequenciaBaixa);
            response.setAlunosFrequenciaAlta(alunosFrequenciaAlta);
            return response;
        }
        double somaMedias = 0.0;
        for (Aluno aluno : alunos) {
            double mediaAluno = calcularMediaAluno(aluno);
            somaMedias += mediaAluno;
        }
        mediaGeralTurma = somaMedias / alunos.size();
        int quantidadeDisciplinas = alunos.get(0).getNotas().size();
        for(int i = 0; i < quantidadeDisciplinas; i++) {
            double somaDisciplina = 0.0;
            for(Aluno aluno : alunos) {
                List<Double> notas = aluno.getNotas();
                if (notas != null && notas.size() > i) {
                    somaDisciplina += notas.get(i);
                }
            }
            double mediaDisciplina = somaDisciplina / alunos.size();
            mediasPorDisciplina.add(mediaDisciplina);
        }
        for (Aluno aluno : alunos) {
            double mediaAluno = calcularMediaAluno(aluno);
            AlunoProcessado alunoProcessado = new AlunoProcessado();
            alunoProcessado.setNome(aluno.getNome());
            alunoProcessado.setMedia(mediaAluno);
            Double freq = aluno.getFrequencia();
            alunoProcessado.setFrequencia(freq == null ? 0.0 : freq);
            if(alunoProcessado.getMedia() >= mediaGeralTurma) {
                alunoProcessado.setAcimaMediaTurma(true);
                alunosAcimaMedia.add(alunoProcessado);
            } 
            else {
                alunoProcessado.setAcimaMediaTurma(false);
                alunosAbaixoMedia.add(alunoProcessado);
            }
            if(alunoProcessado.getFrequencia() < 75.0) {
                alunoProcessado.setFrequenciaBaixa(true);
                alunosFrequenciaBaixa.add(alunoProcessado);
            } 
            else {
                alunoProcessado.setFrequenciaBaixa(false);
                alunosFrequenciaAlta.add(alunoProcessado);
            }
            alunosProcessados.add(alunoProcessado);
        }
        response.setAlunosProcessados(alunosProcessados);
        response.setMediaGeralTurma(mediaGeralTurma);
        response.setMediasPorDisciplina(mediasPorDisciplina);
        response.setAlunosAcimaMedia(alunosAcimaMedia);
        response.setAlunosAbaixoMedia(alunosAbaixoMedia);
        response.setAlunosFrequenciaBaixa(alunosFrequenciaBaixa);
        response.setAlunosFrequenciaAlta(alunosFrequenciaAlta);
        return response;
    }

   private double calcularMediaAluno(Aluno aluno) {
        List<Double> notas = aluno.getNotas();
        if (notas == null || notas.isEmpty()) {
            return 0.0;
        }
        double soma = 0.0;
        for (Double nota : notas) {
            soma += nota;
        }
        return soma / notas.size();
    } 
}
