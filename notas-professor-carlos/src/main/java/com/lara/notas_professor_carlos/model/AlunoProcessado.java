package com.lara.notas_professor_carlos.model;
import java.util.List;
public class AlunoProcessado {
     private String nome;
    private double media;
    private double frequencia;
    private boolean acimaMediaTurma;
    private boolean frequenciaBaixa;
     public AlunoProcessado() {
    }
    public AlunoProcessado(String nome, double media, double frequencia, boolean acimaMediaTurma, boolean frequenciaBaixa) {
        this.nome = nome;
        this.media = media;
        this.frequencia = frequencia;
        this.acimaMediaTurma = acimaMediaTurma;
        this.frequenciaBaixa = frequenciaBaixa;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public double getMedia() {
        return media;
    }
    public void setMedia(double media) {
        this.media = media;
    }
    public double getFrequencia() {
        return frequencia;
    }
    public void setFrequencia(double frequencia) {
        this.frequencia = frequencia;
    }
    public boolean isAcimaMediaTurma() {
        return acimaMediaTurma;
    }
    public void setAcimaMediaTurma(boolean acimaMediaTurma) {
        this.acimaMediaTurma = acimaMediaTurma;
    }
    public boolean isFrequenciaBaixa() {
        return frequenciaBaixa;
    }
    public void setFrequenciaBaixa(boolean frequenciaBaixa) {
        this.frequenciaBaixa = frequenciaBaixa;
    }
}
