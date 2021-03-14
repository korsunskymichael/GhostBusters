# Welcome to our new TO-DO app!

Did you look for an easy app for your daily tasks?
So, now you are in the right place!
Here we can do server of things:
* **Add** tasks to our list
* **delete** tasks from the list
* **update** tasks from the list

## Setup you sould have
This is what you have to install for this APP:
* Node JS
* body-parser": "^1.19.0
* ejs": "^3.1.6
* express": "^4.17.1
* express-layout": "^0.1.0
* mysql": "^2.18.1
* nodemon": "^2.0.7
* path": "^0.12.7
* router": "^1.3.5

### possible errors
* "MySQL Error: : 'Access denied for user 'root'@'localhost'"
In case of earor like that you should follow the next steps:
- Enter your MYSQL
- open new script
- copy the next line and run it: 
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword'; (Where it say "NewPassword" write your  wanted password)
- After you did it run the next line in your script:
flush privileges;

After this, try to run the app one more time.
If this doesn't work, contact us :)

# How its look like
|**ID**|**Assignee**|**Description**|**Finish Date**|**Completed?**|
|:-----:|----------:|---------------:|-------------:|-------------:|
1 |Peter Venkman|Fight Gozer The Gozerian|2020-05-04 | False
2 |Raymond Stantz|Buy a pizza|2020-03-24 | False


 


#### Author
🐧 **Michael Korsunsky**, **Matan Levi**