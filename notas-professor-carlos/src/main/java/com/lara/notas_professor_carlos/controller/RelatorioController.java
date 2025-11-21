package com.lara.notas_professor_carlos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.lara.notas_professor_carlos.model.RelatorioRequest;
import com.lara.notas_professor_carlos.model.RelatorioResponse;
import com.lara.notas_professor_carlos.service.RelatorioService;

@CrossOrigin(origins = "*")
@RestController
public class RelatorioController {

    @GetMapping("/ping")
    public String ping() {
        return "ok";
    }

    @PostMapping("/relatorio")
    public RelatorioResponse gerarRelatorio(@RequestBody RelatorioRequest request) {

        RelatorioService service = new RelatorioService();

        if (request.getAlunos() == null || request.getAlunos().isEmpty()) {
            return service.gerarRelatorio(List.of());
        }

        return service.gerarRelatorio(request.getAlunos());
    }
}
