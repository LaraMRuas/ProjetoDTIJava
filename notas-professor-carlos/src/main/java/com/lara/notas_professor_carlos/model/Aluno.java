package com.lara.notas_professor_carlos.model;
import java.util.List;
public class Aluno {
     private String nome;
    private List<Double> notas;
    private Double frequencia;
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public List<Double> getNotas() {
        return notas;
    }
    public void setNotas(List<Double> notas) {
        this.notas = notas;
    }
    public Double getFrequencia() {
        return frequencia;
    }
    public void setFrequencia(Double frequencia) {
        this.frequencia = frequencia;
    }
}
