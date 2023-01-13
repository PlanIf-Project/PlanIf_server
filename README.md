### Como baixar:

* No terminal, clone o projeto: ``` git clone https://github.com/PlanIf-Project/PlanIf_server.git```

### Como executar localmente:
* No terminal:
    * Entra dentro da pasta clonada anteriormente: ``` cd PlanIf_server```
    * Baixa os pacotes necessários: ``` npm i ```
    * Rode o projeto: ``` npm run dev ```

### Como executar no Docker local:
* No terminal:
    * Entra dentro da pasta clonada anteriormente: ``` cd PlanIf_server```
    * Construa a imagem: ``` docker build -f Dockerfile.dev -t planif-server . ```
    * Rode o container: ``` docker run -d --rm -p 4000:4000 --name planif-servidor planif-server ```

#### Obs.:
* O projeto ainda está sendo implementado, então atualmente só tem funcionalidades que dizem respeito ao perfil, as tarefas e as disciplinas.
