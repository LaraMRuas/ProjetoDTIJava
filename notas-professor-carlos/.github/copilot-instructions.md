Project snapshot
---------------

This is a small Spring Boot web application. Key facts an AI coding agent should know to be immediately productive:

- **Language & Framework:** Java 21, Spring Boot (parent: 3.5.7) — check `pom.xml` for versions.
- **Entrypoint:** `src/main/java/com/lara/notas_professor_carlos/NotasProfessorCarlosApplication.java` (standard `@SpringBootApplication`).
- **Code layout:** main sources under `src/main/java/com/lara/notas_professor_carlos/`.
- **Resources:** `src/main/resources/application.properties`, plus `static/` and `templates/` folders for web assets.

Build / run / test
------------------

- Prefer the project's Maven wrapper to ensure environment parity.
- On Windows (PowerShell) use:

```
.\mvnw.cmd spring-boot:run    # run app
.\mvnw.cmd test               # run tests
.\mvnw.cmd package            # build artifact
```

- A system JDK 21 is required (see `<java.version>` in `pom.xml`).

Project-specific conventions & gotchas
-------------------------------------

- Package name mismatch: the original hyphenated package name was changed — the project uses `com.lara.notas_professor_carlos` (underscore). See `HELP.md` for context. Be consistent with that package when creating new files.
- Lombok is present as an optional dependency. Ensure annotation processing is enabled in the IDE or build environment so generated constructors/getters/setters compile.
- There is an unusual file in the source tree: `src/main/java/com/lara/notas_professor_carlos/model` contains Java source text but is named `model` (no `.java` extension). This can confuse tooling and editors. When adding or modifying model classes, prefer proper Java filenames (e.g., `Aluno.java`) and place them under the same package directory.

Where to add new code
---------------------

- Controllers / REST endpoints: `src/main/java/com/lara/notas_professor_carlos/` — follow package `com.lara.notas_professor_carlos`.
- Domain / DTOs: the current model(s) are placed in the same package directory; follow the existing `model` grouping but use correct filenames.
- Resources and UI: `src/main/resources/static` and `src/main/resources/templates` are the places for front-end assets and templates.

Integration points and dependencies
----------------------------------

- External integration: there are no explicit external systems configured in `application.properties`. If you add DB, messaging, or external API clients, register configuration in `application.properties` and follow Spring's `@Configuration` properties binding patterns.
- Dependencies: minimal — `spring-boot-starter-web`, `lombok`, and `spring-boot-starter-test`.

Quick patterns & examples
-------------------------

- To start the app from the project root (Windows PowerShell):

```
.\mvnw.cmd -DskipTests spring-boot:run
```

- To add a REST controller follow Spring conventions and package under `com.lara.notas_professor_carlos`, e.g.:

```
package com.lara.notas_professor_carlos;

@RestController
public class ExemploController { ... }
```

Files to reference when editing or extending
-------------------------------------------

- `pom.xml` — Java version, parent Spring Boot version, plugins (maven-compiler-plugin, spring-boot-maven-plugin).
- `HELP.md` — project-specific notes (package name behavior and other discovery notes).
- `src/main/java/com/lara/notas_professor_carlos/NotasProfessorCarlosApplication.java` — app entrypoint.
- `src/main/resources/application.properties` — runtime settings.

Notes for AI agents
-------------------

- Prefer minimal, focused changes. Preserve package naming with underscores used in the tree.
- When creating or renaming Java sources, ensure filenames match public class names and end with `.java`.
- If you detect the `model` file (no extension) while making edits, flag it for human review or rename it to a proper `Aluno.java` (or equivalent) to avoid build/tooling issues.

If anything here is unclear or you want the file to include additional examples (controllers, tests, CI commands), tell me which area to expand and I'll iterate.
