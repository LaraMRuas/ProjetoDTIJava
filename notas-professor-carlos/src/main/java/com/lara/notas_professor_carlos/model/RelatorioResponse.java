package com.lara.notas_professor_carlos.model;
import java.util.List;
public class RelatorioResponse {
    private List<AlunoProcessado> alunosProcessados;
    private double mediaGeralTurma;
    private List<Double> mediasPorDisciplina;
    private List<AlunoProcessado> alunosAcimaMedia;
    private List<AlunoProcessado> alunosAbaixoMedia;
    private List<AlunoProcessado> alunosFrequenciaBaixa;
    private List<AlunoProcessado> alunosFrequenciaAlta;
    public List<AlunoProcessado> getAlunosProcessados() {
        return alunosProcessados;
    }
    public void setAlunosProcessados(List<AlunoProcessado> alunosProcessados) {
        this.alunosProcessados = alunosProcessados;
    }
    public double getMediaGeralTurma() {
        return mediaGeralTurma;
    }
    public void setMediaGeralTurma(double mediaGeralTurma) {
        this.mediaGeralTurma = mediaGeralTurma;
    }
    public List<Double> getMediasPorDisciplina() {
        return mediasPorDisciplina;
    }
    public void setMediasPorDisciplina(List<Double> mediasPorDisciplina) {
        this.mediasPorDisciplina = mediasPorDisciplina;
    }
    public List<AlunoProcessado> getAlunosAcimaMedia() {
        return alunosAcimaMedia;
    }
    public void setAlunosAcimaMedia(List<AlunoProcessado> alunosAcimaMedia) {
        this.alunosAcimaMedia = alunosAcimaMedia;
    }
    public List<AlunoProcessado> getAlunosAbaixoMedia() {
        return alunosAbaixoMedia;
    }
    public void setAlunosAbaixoMedia(List<AlunoProcessado> alunosAbaixoMedia) {
        this.alunosAbaixoMedia = alunosAbaixoMedia;
    }
    public List<AlunoProcessado> getAlunosFrequenciaBaixa() {
        return alunosFrequenciaBaixa;
    }
    public void setAlunosFrequenciaBaixa(List<AlunoProcessado> alunosFrequenciaBaixa) {
        this.alunosFrequenciaBaixa = alunosFrequenciaBaixa;
    }
    public List<AlunoProcessado> getAlunosFrequenciaAlta() {
        return alunosFrequenciaAlta;
    }
    public void setAlunosFrequenciaAlta(List<AlunoProcessado> alunosFrequenciaAlta) {
        this.alunosFrequenciaAlta = alunosFrequenciaAlta;
    }
    
}
