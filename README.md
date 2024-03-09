Download zip file

go to both client and server folder and run "npm install" command on terminal of both the folders to got the node_modules folders of both client and server

go to .env file of server and change the DB link "MONGODB_URI"

and replace the <username> with username of DB and <password> with DB password

after that 

run server by going to server folder by "cd server"
   -> and then run "node server.js" or "nodemon server.js"
   when it show connected to DB , you are good to go.

run client by without intrupting server , in new terminal and going to client folder by "cd client" 
  -> and then run command "npm run dev"
when it starts go to the crome and open it by clicking it with control
