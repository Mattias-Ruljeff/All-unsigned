#!/bin/bash
# Bash command -> "./gitCommit.sh"
git add .;
echo "=========-Please add commit message-=========";
read message;
git commit -m "$message";
git push;
git push heroku master;