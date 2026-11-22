find . -type f -size +20M | sed 's|^\./||' >> .gitignore
