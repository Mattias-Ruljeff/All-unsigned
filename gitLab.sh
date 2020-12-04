#!/bin/bash
# Bash command -> "./gitLab.sh"
git add .;
echo "=========-Please add commit message-=========";
read message;
git commit -m "$message";
git push;