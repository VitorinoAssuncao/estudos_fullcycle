# Estratégia Utilizada
Para a redução do tamanho da imagem, foi utilizada a estratégia Multi-Stage para a criação da imagem final, permitindo assim que fosse gerado o arquivo build do golang (utilizando flags para reduzir o tamanho do binário), e então copiada esse objeto executável para uma nova imagem utilizando a imagem scratch do Docker.

# Link para a Imagem no Docker Hub
[vitorinomassuncao/fullcycle](https://hub.docker.com/layers/vitorinomassuncao/fullcycle/latest/images/sha256-719f36b4123b089432e0340f8da6450bd605a061be09ba8d0a8c1ffeee9c5439?context=repo)
