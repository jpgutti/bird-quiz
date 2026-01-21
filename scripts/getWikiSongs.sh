#!/bin/bash

# Verifica se tem arquivo
if [ -z "$1" ]; then
    echo "Uso: $0 arquivo.json"
    exit 1
fi

# User-Agent normal
USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Arquivo para salvar os links
SAVE_FILE="aves_de_jacarei.json"

echo "" > "$SAVE_FILE"  # Limpa o arquivo se existir
count=0

# Pega cada URL do JSON
grep -o '"[^"]*"' "$1" | tr -d '"' | while read url; do
    [ -z "$url" ] && continue
    
    echo "Processando: $url"
    
    # Baixa a página
    html=$(curl -s -L --max-time 30 -H "User-Agent: $USER_AGENT" "$url" 2>/dev/null)
    
    # Procura pelo link do MP3
    mp3_link=$(echo "$html" | grep -oP '<audio[^>]*id="waplayerPrincipal"[^>]*>.*?<source[^>]*src="\K[^"]*' | head -1)

    titulo=$(echo "$html" | grep -oP '<h1.*class="sectionedit1".*?>\K[^<]*')
    
    nome_cientifico=$(echo "$html" | sed -n '/<table.*id="taxonomia"/,/<\/table>/!p' | grep -m1 '<i>' | sed 's/.*<i>//;s/<\/i>.*//')

    # Se não achou, tenta outro padrão
    if [ -z "$mp3_link" ]; then
        mp3_link=$(echo "$html" | grep -oP '<audio[^>]*>.*?<source[^>]*src="\K[^"]*' | head -1)
    fi
    
    # Se achou, salva
    # Formata como JSON
    if [ -n "$titulo" ] || [ -n "$nome_cientifico" ] || [ -n "$mp3_link" ]; then
        if [ "$first" = false ]; then
            echo "," >> "$SAVE_FILE"
        fi
        echo "  {" >> "$SAVE_FILE"
        echo "    \"titulo\": \"$titulo\"," >> "$SAVE_FILE"
        echo "    \"nome_cientifico\": \"$nome_cientifico\"," >> "$SAVE_FILE"
        echo "    \"audio\": \"$mp3_link\"" >> "$SAVE_FILE"
        echo "  }" >> "$SAVE_FILE"
        first=false
        
        echo "  ✅ Título: $titulo"
        echo "  ✅ Nome científico: $nome_cientifico"
        echo "  ✅ Áudio: $mp3_link"
    else
        echo "  ❌ Skippando: $titulo"
        exit 1
    fi
    
    delay=$((1 + RANDOM % 3))
    echo "   Aguardando ${delay}s..."
    sleep $delay
done

echo "----------------------------------------"
echo "Pronto! $count links salvos em: $SAVE_FILE"