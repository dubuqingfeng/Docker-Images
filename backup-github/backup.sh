#!/bin/bash
## 备份数据的脚本
## 声明目的目录
LOG_DIR=~/Downloads/backup.log
DEST_DIR=~/Downloads/backup
DEST_ZIP_OUTPUT_DIR=~/Downloads
# ACCESS_TOKEN=
if test -z "$DEST_CODE_DIR"
then
  export DEST_CODE_DIR=~/Downloads/backup_code
fi
if test -z "$ORG_NAME"
then
  export ORG_NAME=btccom
fi
# 公开
# $OUTPUT_GITHUB_CODE_DIR/$OUTPUT_GITHUB_PUBLIC_REPO_DIR
OUTPUT_GITHUB_CODE_DIR=github-code
OUTPUT_GITHUB_PUBLIC_REPO_DIR="tmp-github-public-backups"
GITHUB_PUBLIC_REPO_LIST="btccom/btcpool"

# https://gitee.com/oschina/bgit
ExportGithubCode() {
	# private 
	python3 bgit.py "$ORG_NAME" --private --fork --token $ACCESS_TOKEN --organization --output-directory "${DEST_CODE_DIR}"/"$OUTPUT_GITHUB_CODE_DIR" --repositories
}

ExportGithubCodeWindows() {
	# private 
	winpty python3 bgit.py "$ORG_NAME" --private --fork --token $ACCESS_TOKEN --organization --output-directory "${DEST_CODE_DIR}"/"$OUTPUT_GITHUB_CODE_DIR" --repositories
}

ExportGithubCodeAndIssueWiki() {
	python3 ./bgit.py "$ORG_NAME" --private --fork --all --token $ACCESS_TOKEN --organization --output-directory "$DEST_CODE_DIR"/"$OUTPUT_GITHUB_CODE_DIR" --repositories
}

ExportGithubCodeAndIssueWikiWindows() {
	winpty python3 ./bgit.py "$ORG_NAME" --private --fork --all --token $ACCESS_TOKEN --organization --output-directory "$DEST_CODE_DIR"/"$OUTPUT_GITHUB_CODE_DIR" --repositories
}

ExportSpecialGithubCodeAndIssueWiki() {
	REPO=
	python3 ./bgit.py "$ORG_NAME" --private --fork --all --token $ACCESS_TOKEN --organization --output-directory "$DEST_CODE_DIR"/"$OUTPUT_GITHUB_CODE_DIR" --repositories --repository $REPO
}

ExportAllCodeBranch() {
	REPOSITORIES_DIR="${DEST_CODE_DIR}"/"$OUTPUT_GITHUB_CODE_DIR"/repositories
	for file in "$REPOSITORIES_DIR"/*
	do
	    if test -d $file
	    then
	        echo 拉取 $file
	        cd $file/repository
	        # fetch all branch.
	        for branch in `git branch -a | grep remotes | grep -v HEAD | grep -v master`; do
			    git branch --track ${branch##*/} $branch
			done
			git fetch --all
			git pull --all
	    fi
	done
}

# gitbash 处理方法：
# https://sourceforge.net/projects/gnuwin32/files/
# 1: 到网站网站下载zip（zip-3.0-bin.zip）和bzip2（bzip2-1.0.5-bin.zip）两个文件
# 2：解压文件，zip解压目录的bin下，找到zip.exe，并复制到gitbash的安装目录的bin目录下；在bzip2解压目录下的bin下，找到bzip2.dll，复制到git/user/bin目录下
ZipAllGitHubCode() {
	time=$(date "+%Y%m%d")
	zip -r -o "${DEST_CODE_DIR}"/github-compress-code-"$time".zip "${DEST_CODE_DIR}"/github-code
}

# 备份公开仓库
# https://gist.github.com/mjgp2/b4e25ef4583226e7d1060f374489825a
function BackupGitHubPublicRepo {
	date=`date '+%Y%m%d'`
	repository=$1
	echo "Backing up $repository"
	git clone https://github.com/$repository "$DEST_CODE_DIR"/$OUTPUT_GITHUB_PUBLIC_REPO_DIR/$repository.$date
	if [ $? -ne 0 ]; then
	  echo "Error cloning $repository"
	  return 1
	fi

	tar cpzf "$DEST_CODE_DIR"/$OUTPUT_GITHUB_PUBLIC_REPO_DIR/$repository.$date.git.tar.gz "$DEST_CODE_DIR"/$OUTPUT_GITHUB_PUBLIC_REPO_DIR/$repository.$date
	if [ $? -ne 0 ]; then
	  echo "Error compressing $repository"
	  return 1
	fi
	echo "Succesfully backed up $repository"
	return 0
}

# 命令
command=''
if [ $# -eq 0 ]
then
    command="backup_github"
else
    command=$1
fi

if [ $command = "backup" ]
then
    echo 'backup'
elif [ $command = "backup_github_public_repo" ]
then
	echo 'backup_github_public_repo'
	echo `date +"%Y-%m-%d %H:%M:%S"` "日志: start" >> "$LOG_DIR"
	# Create the backup directory
	mkdir -p "$DEST_CODE_DIR"/$OUTPUT_GITHUB_PUBLIC_REPO_DIR
	# Setup repository to $1
    set -- $GITHUB_PUBLIC_REPO_LIST
    while [ -n "$1" ]; do
        echo $1
        BackupGitHubPublicRepo $1 || exit 1
        shift
    done
elif [ $command = "backup_github" ]
then
    echo 'production'
	echo `date +"%Y-%m-%d %H:%M:%S"` "日志: start backup_github" >> "$LOG_DIR"
    ExportGithubCode
	echo `date +"%Y-%m-%d %H:%M:%S"` "日志: end ExportGithubCode" >> "$LOG_DIR"
    ExportAllCodeBranch
	echo `date +"%Y-%m-%d %H:%M:%S"` "日志: end ExportAllCodeBranch" >> "$LOG_DIR"
    ZipAllGitHubCode
	echo `date +"%Y-%m-%d %H:%M:%S"` "日志: end backup_github" >> "$LOG_DIR"
elif [ $command = "backup_github_windows" ]
then
    echo 'production'
    ExportGithubCodeAndIssueWikiWindows
    ExportAllCodeBranch
    # ZipAllGitHubCode
elif [ $command = "backup_github_code" ]
then
    echo 'production'
    ExportGithubCode
elif [ $command = "backup_github_all" ]
then
    echo 'production'
    ExportGithubCodeAndIssueWiki
elif [ $command = "backup_github_code_windows" ]
then
    echo 'production'
    ExportGithubCodeWindows
elif [ $command = "backup_github_code_branch" ]
then
    echo 'production'
    ExportAllCodeBranch
elif [ $command = "local" ]
then
	echo 'local'
fi