# Terminal Commands Cheat Sheet

## Navigation
```
pwd                      # show current folder path
ls                       # list files in current folder
ls -la                   # list all files including hidden ones
cd foldername            # go into a folder
cd ..                    # go up one level
cd ~                     # go to home directory
open .                   # open current folder in Finder
open foldername          # open specific folder in Finder
```

## Files & Folders
```
touch filename.txt       # create a new file
mkdir foldername         # create a new folder
cp file.txt copy.txt     # copy a file
mv file.txt newfolder/   # move a file
mv old.txt new.txt       # rename a file
rm file.txt              # delete a file
rm -rf foldername        # delete a folder and everything in it (careful!)
cat file.txt             # print file contents in terminal
```

## Git
```
git status               # see what files have changed
git add .                # stage all changes
git add filename         # stage a specific file
git commit -m "message"  # save changes with a message
git push                 # push to remote (GitHub)
git pull                 # pull latest changes from remote
git log                  # see commit history
git diff                 # see what changed since last commit
git checkout -b branch   # create and switch to a new branch
git checkout main        # switch back to main branch
git branch               # list all branches
```

## npm / Node
```
npm install              # install all dependencies
npm run dev              # start dev server
npm run build            # build for production
npm run lint             # run linter
npm install package      # install a specific package
npm uninstall package    # remove a package
```

## Misc
```
clear                    # clear the terminal screen
history                  # show command history
which node               # check where a program is installed
kill -9 PID              # force kill a process by its ID
lsof -i :3000            # see what's running on port 3000
```
