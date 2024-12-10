#!/bin/bash

# Ensure pandoc is installed
if command -v pandoc > /dev/null 2>&1; then
    echo "Pandoc is installed."
    echo "Version: $(pandoc --version | head -n 1)"
else
    echo "Pandoc is not installed."
    echo "Installing ..."
    sudo apt-get update
    sudo apt-get -y install pandoc
    pandoc --version
fi

# Convert RSS
pandoc feed.yml --template .common/template.rss >> feed.rss

# Convert markdown files to html
find . -name "*index.md" | \
while read i; do
    pandoc -f markdown -t html --template=.common/template.html \
    --toc --no-highlight --mathjax "${i}" >> "${i%.md}.html";
done
