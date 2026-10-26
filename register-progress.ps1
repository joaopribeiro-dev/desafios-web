$ErrorActionPreference = "Stop"

try {
    # Localiza a raiz do repositório.
    $root = (git rev-parse --show-toplevel).Trim()

    if ($LASTEXITCODE -ne 0 -or -not $root) {
        throw "Não foi possível localizar o repositório Git."
    }

    $progressFile = Join-Path $root "progress.json"
    $homeFile = Join-Path $root "home.html"

    if (-not (Test-Path $progressFile)) {
        throw "O arquivo progress.json não foi encontrado."
    }

    if (-not (Test-Path $homeFile)) {
        throw "O arquivo home.html não foi encontrado."
    }

    # Lê os dados atuais.
    $data = Get-Content $progressFile -Raw | ConvertFrom-Json

    if ($null -eq $data.diaAtual -or $null -eq $data.datasContabilizadas) {
        throw "O formato de progress.json está incorreto."
    }

    # Usa a data local configurada no Windows.
    $today = Get-Date -Format "yyyy-MM-dd"

    # Se a data já foi registrada, não incrementa novamente.
    if (@($data.datasContabilizadas) -contains $today) {
        Write-Host "Data $today já registrada. Contador mantido no Dia $($data.diaAtual)."
        exit 0
    }

    # Lê o HTML e verifica a estrutura antes de alterar os dados.
    $html = Get-Content $homeFile -Raw

    $pattern = '(?s)(<div\s+class="progresso">.*?<p>\s*Dia\s+\d+\s*</p>.*?<p>\s*Dia\s+)\d+(\s*</p>)'

    $regex = [regex]::new($pattern)

    if (-not $regex.IsMatch($html)) {
        throw "Não encontrei a estrutura esperada da barra de progresso em home.html."
    }

    # Calcula o próximo dia.
    $novoDia = [int]$data.diaAtual + 1

    $evaluator = [System.Text.RegularExpressions.MatchEvaluator]{
        param($match)

        return $match.Groups[1].Value +
            $novoDia +
            $match.Groups[2].Value
    }

    $updatedHtml = $regex.Replace($html, $evaluator, 1)

    # Atualiza os dados de progresso.
    $data.diaAtual = $novoDia
    $data.datasContabilizadas = @($data.datasContabilizadas) + $today

    $json = $data | ConvertTo-Json -Depth 5

    # Salva os arquivos em UTF-8 sem BOM.
    $utf8 = New-Object System.Text.UTF8Encoding($false)

    [System.IO.File]::WriteAllText(
        $progressFile,
        $json + [Environment]::NewLine,
        $utf8
    )

    [System.IO.File]::WriteAllText(
        $homeFile,
        $updatedHtml,
        $utf8
    )

    Write-Host "Progresso atualizado: Dia $novoDia ($today)."
    exit 0
} catch {
    [Console]::Error.WriteLine("Erro ao atualizar o progresso: $_")
    exit 1
}