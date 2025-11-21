package com.lara.notas_professor_carlos.model;
import java.util.List;
import com.lara.notas_professor_carlos.model.Aluno;
public class RelatorioRequest {
    private List <Aluno> alunos;
    public List<Aluno> getAlunos() {
    return alunos;
}
public void setAlunos(List<Aluno> alunos) {
    this.alunos = alunos;
}
}
