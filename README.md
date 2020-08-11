## Back-end Windows Explorer Express/NodeApp
The objective of this app is to build REST API with several end points exposing local file system which is accessible by a front-end client

###  Framework and Technologies Used
- The API is built in JavaScript environment with Node JS as a library, and Express framework as Middleware to use adanced features such as Express Router. The app uses several modules provided by node file-system module in short 'fs' to work with file system.
- The files and directories are hosted on a folder named as 'db' which serve as a root to local file system. This is the file system that client access to and can add, upload, browse file over it. 
### Prerequisites to run the server
- To build the dependencies in the package.json file, do a fresh "npm install" in your project directory. 
- To run the server, do "npm start"
- The app will by default open up on [http://localhost:5000/]. The port of the app is set to 5000, to avoid conflict of port 3000 with frontend app.

### Brief overview about the end points
- /browse => It takes a path and utilizes fs.readdir method of fs system, and scans through the root,and returns a array that has name of files and directories in root, and now to determine whether they are file or a directory, we use IsDirectory() method, and loop through the array, check the type and add type to the object with the help of spread operator that returns a new array with objects having type and name of the file/directory
- /browse/* => This endpoint is used to browse a level in to directory, or to browse the given path. Here we use 'readdir' method to read directory using the absolute path of the 'db' directory adding to it the path in the param 
-/download/* => We follow the similar approach as above in the browse to have the file path. To determine the type of file we use additional module "mime-types" that looks up the file and determine the type 
- /upload/* => We use express module, express-file module, to use the functions provided by this module in our end points. When the reques is made, we have to destructurize file from the file meta data i array.The file is moved to the upload path by combining the name of the file by joining with the path
- /remove/* => It takes the given path and adds the path to the params. fs provides 'unlink' method which takes file path, and a call back as an argument

****CORS are enabled to allow the request from the remote, not only by same origin policy, so we allow access on "http://localhost:3000" which is where the client calls api from ***

All of the above routes are used in express app => app.js as modules exported by express router. Express router helps in organization of routes, providing modularity, building router specific middleware  

 